import * as os from 'os';
import * as fs from 'fs';
// benchmark with https://www.npmjs.com/package/lzutf8
import LZString from 'lz-string';
import {ChildProcess, exec, spawn} from 'child_process';
import {InputRequisitionModel, OutputRequisitionModel} from 'enqueuer';
import {EnqueuerLogExtractor} from '@/main-process/enqueuer-log-extractor';
import {MainMessageCommunicator} from '@/main-process/main-message-communicator';

type ResponseMap = {
    [id: string]: {
        promisesResolver: Function;
        responses: OutputRequisitionModel[];
    };
};

//TODO test it
export default class EnqueuerRunner {
    private readonly mainMessageCommunicator: MainMessageCommunicator;
    private readonly enqueuerLogExtractor: EnqueuerLogExtractor;
    private readonly responsesMap: ResponseMap = {};

    private enqueuerProcess: ChildProcess | any;
    private enqueuerStore: any = {};

    constructor(window?: Electron.BrowserWindow) {
        this.mainMessageCommunicator = new MainMessageCommunicator(window!);
        this.enqueuerLogExtractor = new EnqueuerLogExtractor(this.mainMessageCommunicator);
    }

    public async run(): Promise<void> {
        this.createNqrFolder();
        await this.installEnqueuerIfNeeded();
        this.enqueuerLogExtractor.start();
        this.executeEnqueuerAsChild();
        this.registerRendererProcessListener();
    }

    private registerRendererProcessListener() {
        this.mainMessageCommunicator.on('restartEnqueuer', () => this.executeEnqueuerAsChild());
        this.mainMessageCommunicator.on('setEnqueuerStore', (data: any) => this.enqueuerStore = data);
        this.mainMessageCommunicator.on('runEnqueuer', async (requisition: InputRequisitionModel) => {
            const reply = await this.sendRequisition(requisition);
            const compressed = LZString.compressToUTF16(JSON.stringify(reply));
            this.mainMessageCommunicator.send('runEnqueuerReply', compressed);
        });
    }

    private executeEnqueuerAsChild() {
        this.mainMessageCommunicator.addLog('Starting enqueuer', 'INFO');
        this.enqueuerProcess = spawn('enqueuer', ['-b', 'debug'], {
            stdio: ['pipe', 'pipe', 'pipe', 'ipc']
        });
        this.registerChildListeners();
    }

    private createNqrFolder() {
        fs.mkdir(os.homedir() + '/.nqr', {recursive: true}, (err) => {
            if (err) {
                this.mainMessageCommunicator.addLog(`Error creating .nqr folder: ${err}`, 'ERROR');
            }
        });
    }

    private registerChildListeners(): void {
        this.enqueuerProcess.removeAllListeners();
        this.enqueuerProcess.stdout.on('data', (data: Buffer) => this.enqueuerLogExtractor.addLog(data.toString()));
        const enqueuerEventsListener = (eventName: string) => (data: any) => {
            this.mainMessageCommunicator.addLog(`Child enqueuer '${eventName}': ${data}`, 'ERROR');
        };
        this.enqueuerProcess.on('exit', () => {
            enqueuerEventsListener('exit');
            this.executeEnqueuerAsChild();
        });
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
                    this.mainMessageCommunicator.addLog(`Error running: ${error}`, 'ERROR');
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
                    this.mainMessageCommunicator.addLog(`Enqueuer not detected. Installing it`, 'INFO');
                    exec(`npm install -g enqueuer`, (error, stdout, stderr) => {
                        if (error) {
                            this.mainMessageCommunicator.addLog(`Enqueuer fail to install ${stderr}`, 'ERROR');
                        } else {
                            this.mainMessageCommunicator.addLog(`Enqueuer installed successfully: ${stdout}`, 'INFO');
                        }
                        resolve();
                    });

                } else {
                    resolve();
                }
            });
        });
    }
}
