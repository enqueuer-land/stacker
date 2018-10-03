import {EventEmitter} from 'events';
import {EnqueuerMessageCommunicator} from './communicator/enqueuer-message-communicator';
import {EnqueuerRunnerSpawn} from './runner/enqueuer-runner-spawn';
import * as input from './models/inputs/requisition-model';
import * as output from './models/outputs/requisition-model';
import {EnqueuerMessageCommunicatorHttp} from './communicator/enqueuer-message-communicator-http';

export class EnqueuerClient extends EventEmitter {

    private requisition: input.RequisitionModel;
    private sender: EnqueuerMessageCommunicator;

    public constructor(requisition: input.RequisitionModel) {
        super();

        this.requisition = requisition;

        EnqueuerRunnerSpawn.start();
        this.sender = new EnqueuerMessageCommunicatorHttp();
        this.registerEventListeners();
    }

    public send(): Promise<boolean> {
        return this.sender.publish(this.requisition)
            .then((data: output.RequisitionModel) => {
                console.log(`Enqueuer client got data: ${Object.keys(data)}`);
                this.emit('response', data);
                return true;
            })
            .catch(err => {
                const errorMessage = `Error sending/receiving message to/from enqueuer: ${err}`;
                this.emit('error', errorMessage);
                return false;
            });
    }

    private addErrorEventListener() {
        EnqueuerRunnerSpawn.addErrorEventListener((error: any) => this.emit('error', error));
    }

    private addExitEventListener() {
        EnqueuerRunnerSpawn.addExitEventListener(() => this.emit('exit'));
    }

    private addLogEventListener() {
        EnqueuerRunnerSpawn.addLogEventListener((data: any) => this.emit('log', data));
    }

    private registerEventListeners() {
        this.addExitEventListener();
        this.addErrorEventListener();
        this.addLogEventListener();
    }
}