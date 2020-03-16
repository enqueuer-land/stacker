import * as os from 'os';
import * as fs from 'fs';
import {ipcMain} from 'electron';
import {ChildProcess, exec, spawn} from 'child_process';
import {InputRequisitionModel, OutputRequisitionModel} from 'enqueuer';

type ResponseMap = {
    [id: string]: {
        promisesResolver: Function;
        responses: OutputRequisitionModel[];
    };
};

//TODO test it
export default class EnqueuerRunner {
    private readonly window?: Electron.BrowserWindow;

    constructor(window?: Electron.BrowserWindow) {
        this.window = window;
    }

    private enqueuerProcess?: ChildProcess | any;
    private responsesMap: ResponseMap = {};
    private enqueuerStore: any = {};

    private readonly logBuffer: string[] = [];
    private readonly maxBufferSize = 800;
    private readonly logSendInterval = 100;
    private readonly logsPerMessage = 50;

    public async run(): Promise<void> {
        this.createNqrFolder();
        await this.installEnqueuerIfNeeded();
        this.executeEnqueuerAsChild();
        this.sendLogToStacker(`Enqueuer pid: ${this.enqueuerProcess.pid}`, 'DEBUG');
        this.registerChildListeners();
        this.registerEnqueuerLogsSender();
        this.registerRendererProcessListener();
    }

    private registerRendererProcessListener() {
        ipcMain.on('setEnqueuerStore', (_, data: any) => this.enqueuerStore = data);
        ipcMain.on('runEnqueuer', async (_, requisition: InputRequisitionModel) => {
            const reply = await this.sendRequisition(requisition);
            this.window!.webContents.send('runEnqueuerReply', reply);
        });
    }

    private registerEnqueuerLogsSender() {
        setInterval(() => {
            if (this.logBuffer.length > 0) {
                const logs = this.logBuffer.filter((_, index) => index < this.logsPerMessage).join('\n');
                this.window!.webContents.send('enqueuerLog', logs);

                this.logBuffer.splice(0, this.logsPerMessage);
            }
        }, this.logSendInterval);
    }

    private executeEnqueuerAsChild() {
        this.enqueuerProcess = spawn('enqueuer', ['-b', 'debug'], {
            stdio: ['pipe', 'pipe', 'pipe', 'ipc']
        });
    }

    private createNqrFolder() {
        fs.mkdir(os.homedir() + '/.nqr', {recursive: true}, (err) => {
            if (err) {
                this.sendLogToStacker(`Error creating .nqr folder: ${err}`, 'ERROR');
            }
        });
    }

    private registerChildListeners(): void {
        this.enqueuerProcess.stdout.on('data', (data: Buffer) => {
            this.logBuffer.push(data.toString());
            const overLimitLogs = this.logBuffer.length - this.maxBufferSize;
            if (overLimitLogs > 0) {
                this.logBuffer.splice(0, overLimitLogs);
            }
        });
        const enqueuerEventsListener = (eventName: string) => (data: any) => {
            this.sendLogToStacker(`Child enqueuer '${eventName}': ${data}`, 'ERROR');
        };
        this.enqueuerProcess.on('exit', enqueuerEventsListener('exit'));
        this.enqueuerProcess.on('error', enqueuerEventsListener('error'));
        this.enqueuerProcess.on('close', enqueuerEventsListener('close'));
        this.enqueuerProcess.on('disconnect', enqueuerEventsListener('disconnect'));
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

    private async installEnqueuerIfNeeded() {
        return new Promise(resolve => {
            exec(`type -P "enqueuer" &> /dev/null`, error => {
                if (error) {
                    this.sendLogToStacker(`Enqueuer not detected. Installing it`, 'INFO');
                    exec(`npm install -g enqueuer`, (error, stdout, stderr) => {
                        if (error) {
                            this.sendLogToStacker(`Enqueuer fail to install ${stderr}`, 'ERROR');
                        } else {
                            this.sendLogToStacker(`Enqueuer installed successfully: ${stdout}`, 'INFO');
                        }
                        resolve();
                    });

                } else {
                    resolve();
                }
            });
        });
    }

    private sendLogToStacker(message: string, level: string) {
        if (this.window) {
            this.window.webContents.send('addLog', {message, level});
        }
    }
}
