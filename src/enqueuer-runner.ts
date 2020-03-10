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
    private enqueuerProcess?: ChildProcess | any;
    private responsesMap: ResponseMap = {};
    private enqueuerStore: any = {};
    private logBuffer: string[] = [];

    public run(): void {
        try {
            spawn('mkdir', [os.homedir() + '/.nqr']);
            this.enqueuerProcess = spawn('enqueuer', ['-b', 'debug'], {
                stdio: ['pipe', 'pipe', 'pipe', 'ipc']
            });
            // @ts-ignore
            global.eventEmitter.emit('addLog', {message: `Enqueuer pid: ${this.enqueuerProcess.pid}`, level: 'DEBUG'});

            //Handshake purposes
            this.enqueuerProcess.send({event: 'GET_PROTOCOLS'});

            this.registerChildListeners();

            setInterval(() => {
                if (this.logBuffer.length > 0) {
                    // @ts-ignore
                    global.eventEmitter.emit('enqueuerLog', this.logBuffer.join('\n'));
                    this.logBuffer.splice(0, this.logBuffer.length);
                }
            }, 1500);

            // @ts-ignore
            global.eventEmitter.on('setEnqueuerStore', (data: any) => this.enqueuerStore = data);
            // @ts-ignore
            global.eventEmitter.on('runEnqueuer', async (requisition: InputRequisitionModel) => {
                const reply = await this.sendRequisition(requisition);
                // @ts-ignore
                global.eventEmitter.emit('runEnqueuerReply', reply);
            });
        } catch (e) {
            // @ts-ignore
            global.eventEmitter.emit('addLog', {message: `Error running enqueuer sub process: ${e}`, level: 'ERROR'});
            throw e;
        }
    }

    private registerChildListeners(): void {
        // @ts-ignore
        this.enqueuerProcess.stdout.on('data', (data: Buffer) => this.logBuffer.push(data.toString()));
        // @ts-ignore
        // this.enqueuerProcess.stderr.on('data', (data: Buffer) => global.eventEmitter.emit('enqueuerError', data.toString()));
        this.enqueuerProcess.on('disconnect', (error: any) => console.log(`disconnect: ${error}`));
        this.enqueuerProcess.on('error', (error: any) => {
            // @ts-ignore
            global.eventEmitter.emit('addLog', {message: `Child enqueuer errored: ${error}`, level: 'ERROR'});
        });
        this.enqueuerProcess.on("close", (code: number) => {
            // @ts-ignore
            global.eventEmitter.emit('addLog', {message: `Child enqueuer closed: ${code}`, level: 'ERROR'});
            exec('type enqueuer', ((error, stdout) => {
                if (error) {
                    // @ts-ignore
                    global.eventEmitter.emit('addLog', {message: `Type 'enqueuer' error: ${error}`, level: 'ERROR'});
                } else {
                    // @ts-ignore
                    global.eventEmitter.emit('addLog', {message: `Type 'enqueuer': ${stdout}`, level: 'DEBUG'});
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
        // @ts-ignore
        global.eventEmitter.emit('messageReceivedFromEnqueuer', message);

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
