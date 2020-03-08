import * as os from 'os';
import {ChildProcess, spawn} from 'child_process';
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

    public run(): void {
        try {
            spawn('mkdir', [os.homedir() + '/.nqr']);
            this.enqueuerProcess = spawn('enqueuer', ['-b', 'info'], {stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
            this.registerChildListeners();
            // @ts-ignore
            global.eventEmitter.on('resetEnqueuer', () => console.log('restart enqueuer'));
            // @ts-ignore
            global.eventEmitter.on('runEnqueuer', async (requisition: InputRequisitionModel) => {
                const reply = await this.sendRequisition(requisition);
                // @ts-ignore
                global.eventEmitter.emit('runEnqueuerReply', reply);
            });
        } catch (e) {
            console.error(`Error running enqueuer sub process`);
            throw e;
        }
    }

    private registerChildListeners(): void {
        // @ts-ignore
        this.enqueuerProcess.stdout.on('data', (data: Buffer) => global.eventEmitter.emit('enqueuerLog', data.toString()));
        // @ts-ignore
        this.enqueuerProcess.stderr.on('data', (data: Buffer) => global.eventEmitter.emit('enqueuerError', data.toString()));
        this.enqueuerProcess.on('disconnect', (error: any) => console.log(`disconnect: ${error}`));
        this.enqueuerProcess.on('error', (error: any) => console.log(`error: ${error.message}`));
        this.enqueuerProcess.on("close", (code: number) => console.log(`Enqueuer sub process exited with code: ${code}`));
        this.enqueuerProcess.on('message', (data: any) => this.onMessageReceived(data));
    }

    private sendRequisition(requisitionInput: InputRequisitionModel): Promise<OutputRequisitionModel[]> {
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
