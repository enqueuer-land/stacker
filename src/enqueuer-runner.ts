import * as os from 'os';
import * as fs from 'fs';
import {ipcMain} from 'electron';
import {ChildProcess, spawn} from 'child_process';
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
            this.createNqrFolder();
            this.enqueuerProcess = spawn('enqueuer', ['-b', 'debug'], {
                stdio: ['pipe', 'pipe', 'pipe', 'ipc']
            });
            this.sendLogToStacker(`Enqueuer pid: ${this.enqueuerProcess.pid}`, 'DEBUG');

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

            ipcMain.on('setEnqueuerStore', (_, data: any) => this.enqueuerStore = data);
            ipcMain.on('runEnqueuer', async (_, requisition: InputRequisitionModel) => {
                const reply = await this.sendRequisition(requisition);
                this.window!.webContents.send('runEnqueuerReply', reply);
            });
        } catch (e) {
            this.sendLogToStacker(`Error running enqueuer sub process: ${e}`, 'ERROR');
            throw e;
        }
    }

    private createNqrFolder() {
        fs.mkdir(os.homedir() + '/.nqr', {recursive: true}, (err) => {
            if (err) {
                this.sendLogToStacker(`Error creating .nqr folder: ${err}`, 'ERROR');
            }
        });
    }

    private registerChildListeners(): void {
        // @ts-ignore
        this.enqueuerProcess.stdout.on('data', (data: Buffer) => {
            this.logBuffer.push(data.toString());
            this.logBuffer = this.logBuffer.filter((_, index) => index >= this.logBuffer.length - this.maxBufferSize);
        });
        this.enqueuerProcess.on('disconnect', (error: any) => console.log(`disconnect: ${error}`));
        this.enqueuerProcess.on('error', (error: any) => this.sendLogToStacker(`Child enqueuer errored: ${error}`, 'ERROR'));
        this.enqueuerProcess.on("close", (code: number) => this.sendLogToStacker(`Child enqueuer closed: ${code}`, 'ERROR'));
        this.enqueuerProcess.on('message', (data: any) => this.onMessageReceived(data));
    }

    private sendRequisition(requisitionInput: InputRequisitionModel): Promise<OutputRequisitionModel[]> {
        return new Promise((resolve, reject) => {
            this.enqueuerProcess.send({event: 'CLEAN_STORE'});
            this.enqueuerProcess.send({event: 'SET_STORE', value: this.enqueuerStore}, (error: Error | null) => {
                if (error) {
                    this.sendLogToStacker(`Error running: ${error}`, 'ERROR');
                    reject(error);
                } else {
                    this.enqueuerProcess.send({event: 'RUN_REQUISITION', value: requisitionInput});
                }
            });
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

    private sendLogToStacker(message: string, level: string) {
        this.window!.webContents.send('addLog', {message, level});
    }
}
