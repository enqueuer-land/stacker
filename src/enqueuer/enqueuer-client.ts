import {EventEmitter} from 'events';
import {EnqueuerMessageCommunicator} from './communicator/enqueuer-message-communicator';
import {EnqueuerRunnerSpawn} from './runner/enqueuer-runner-spawn';
import * as input from "./models/inputs/requisition-model";
import * as output from "./models/outputs/requisition-model";
import {EnqueuerMessageCommunicatorHttp} from "./communicator/enqueuer-message-communicator-http";

export class EnqueuerClient extends EventEmitter {

    private requisition: input.RequisitionModel;
    private sender: EnqueuerMessageCommunicator;
    private eventEmitter: any;

    public constructor(requisition: input.RequisitionModel) {
        super();

        this.requisition = requisition;

        this.eventEmitter = EnqueuerRunnerSpawn.start()
        this.sender = new EnqueuerMessageCommunicatorHttp();
        // this.sender = new EnqueuerMessageCommunicatorUds();
        // this.sender = new EnqueuerMessageCommunicatorSingleRun();
        this.registerEventListeners();

        // this.eventEmitter = new EnqueuerRunnerMock();
        // this.sender = new EnqueuerMessageCommunicatorMock();
        // this.eventEmitter.start().then(() => this.registerEventListeners())
    }

    public send(): Promise<boolean | void> {
        return this.sender.publish(this.requisition)
            .then((data: output.RequisitionModel) => {
                console.log(`Enqueuer client got data: ${Object.keys(data)}`);
                this.emit('response', data)
            })
            .catch(err => {
                const errorMessage = `Error sending/receiving message to/from enqueuer: ${err}`;
                this.emit('error', errorMessage);
            });
    }

    private addErrorEventListener = () => {
        this.eventEmitter.on('error', (error: Error) => this.emit('error', error))
    }

    private addExitEventListener = () => {
        this.eventEmitter.on('exit', (statusCode: number) => this.emit('exit', statusCode));
    }

    private addLogEventListener = () => {
        this.eventEmitter.on('log', (data: string) => this.emit('log', data));
    }

    private registerEventListeners() {
        this.addExitEventListener();
        this.addErrorEventListener();
        this.addLogEventListener();
    }
}