import * as os from 'os';
import {ChildProcess, spawn, exec} from 'child_process';
import {InputRequisitionModel, OutputRequisitionModel} from 'enqueuer';

type ResponseMap = {
    [id: string]: {
        promisesResolver: Function;
        responses: OutputRequisitionModel[];
    };
};

export default class EnqueuerRunner {
    private readonly window?: Electron.BrowserWindow;

    constructor(window?: Electron.BrowserWindow) {
        this.window = window;
    }

    private enqueuerProcess?: ChildProcess | any;
    private responsesMap: ResponseMap = {};
    private enqueuerStore: any = {};

    private logBuffer: string[] = [];
    private readonly maxBufferSize = 100;
    private readonly logSendInterval = 100;
    private readonly logsPerMessage = 30;

    public run(): void {
        try {
            spawn('mkdir', [os.homedir() + '/.nqr']);
            this.enqueuerProcess = spawn('enqueuer', ['-b', 'debug'], {
                stdio: ['pipe', 'pipe', 'pipe', 'ipc']
            });
            this.window!.webContents.send('addLog', {
                message: `Enqueuer pid: ${this.enqueuerProcess.pid}`,
                level: 'DEBUG'
            });

            //Handshake purposes
            this.enqueuerProcess.send({event: 'GET_PROTOCOLS'});

            this.registerChildListeners();

            if (this.window) {
                setInterval(() => {
                    if (this.logBuffer.length > 0) {
                        // @ts-ignore
                        const logs = this.logBuffer.filter((_, index) => index < this.logsPerMessage).join('\n');
                        this.window!.webContents.send('enqueuerLog', logs);

                        this.logBuffer = this.logBuffer.filter((_, index) => index >= this.logsPerMessage);
                    }
                }, this.logSendInterval);
            }

            // @ts-ignore
            global.eventEmitter.on('setEnqueuerStore', (data: any) => this.enqueuerStore = data);
            // @ts-ignore
            global.eventEmitter.on('runEnqueuer', async (requisition: InputRequisitionModel) => {
                const reply = await this.sendRequisition(requisition);
                this.window!.webContents.send('runEnqueuerReply', reply);
            });
        } catch (e) {
            this.window!.webContents.send('addLog', {
                message: `Error running enqueuer sub process: ${e}`,
                level: 'ERROR'
            });
            throw e;
        }
    }

    private registerChildListeners(): void {
        // @ts-ignore
        this.enqueuerProcess.stdout.on('data', (data: Buffer) => {
            this.logBuffer.push(data.toString());
            this.logBuffer = this.logBuffer.filter((_, index) => index >= this.logBuffer.length - this.maxBufferSize);
        });
        this.enqueuerProcess.on('disconnect', (error: any) => console.log(`disconnect: ${error}`));
        this.enqueuerProcess.on('error', (error: any) => this.window!.webContents.send('addLog', {
            message: `Child enqueuer errored: ${error}`,
            level: 'ERROR'
        }));
        this.enqueuerProcess.on("close", (code: number) => {
            this.window!.webContents.send('addLog', {message: `Child enqueuer closed: ${code}`, level: 'ERROR'});
            exec('type enqueuer', ((error, stdout) => {
                if (error) {
                    this.window!.webContents.send('addLog', {
                        message: `Type 'enqueuer' error: ${error}`,
                        level: 'ERROR'
                    });
                } else {
                    this.window!.webContents.send('addLog', {
                        message: `Type 'enqueuer' error: ${stdout}`,
                        level: 'DEBUG'
                    });
                }
            }));
        });
        this.enqueuerProcess.on('message', (data: any) => this.onMessageReceived(data));
    }

    private sendRequisition(requisitionInput: InputRequisitionModel): Promise<OutputRequisitionModel[]> {
        this.enqueuerProcess.send({event: 'CLEAN_STORE'});
        this.enqueuerProcess.send({event: 'SET_STORE', value: this.enqueuerStore});
        this.enqueuerProcess.send({event: 'RUN_REQUISITION', value: requisitionInput});
        return new Promise(resolve => {
            this.responsesMap[requisitionInput.id.toString()] = {
                promisesResolver: resolve,
                responses: []
            };
        });
    }

    private onMessageReceived(message: any): void {
        if (message.event === 'REQUISITION_FINISHED' && message.value.requisition) {
            const requisitionOutput: OutputRequisitionModel = message.value.requisition;
            const responsesMap = this.responsesMap[requisitionOutput.id.toString()];
            if (responsesMap) {
                responsesMap.responses.push(requisitionOutput);
                if (requisitionOutput.totalIterations === undefined ||
                    responsesMap.responses.length == requisitionOutput.totalIterations) {
                    responsesMap.promisesResolver(responsesMap.responses);
                    delete this.responsesMap[requisitionOutput.id.toString()];
                }
            }
        }
    }
}
