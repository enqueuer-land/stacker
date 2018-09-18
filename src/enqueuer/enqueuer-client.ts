import { EventEmitter } from 'events';
import { EnqueuerRunner } from './runner/enqueuer-runner';
import { EnqueuerMessageCommunicator } from './communicator/enqueuer-message-communicator';
import { EnqueuerRunnerSpawn } from './runner/enqueuer-runner-spawn';
import { EnqueuerMessageCommunicatorUds } from './communicator/enqueuer-message-communicator-uds';
import { EnqueuerRunnerMock } from './runner/enqueuer-runner-mock';
import { EnqueuerMessageCommunicatorMock } from './communicator/enqueuer-message-communicator-mock';
import * as input from "./models/inputs/requisition-model";
import * as output from "./models/outputs/requisition-model";
import {EnqueuerMessageCommunicatorHttp} from "./communicator/enqueuer-message-communicator-http";
import {EnqueuerMessageCommunicatorSingleRun} from "./communicator/enqueuer-message-communicator-single-run";

export class EnqueuerClient extends EventEmitter {

    private requisition: input.RequisitionModel;
    private runner: EnqueuerRunner;
    private sender: EnqueuerMessageCommunicator;

    public constructor(requisition: input.RequisitionModel) {
        super();

        this.requisition = requisition;

        // this.runner = new EnqueuerRunnerSpawn();
        // this.sender = new EnqueuerMessageCommunicatorHttp();
        // this.sender = new EnqueuerMessageCommunicatorUds();
        this.sender = new EnqueuerMessageCommunicatorSingleRun();
        // this.registerEventListeners();

        // this.runner = new EnqueuerRunnerMock();
        // this.sender = new EnqueuerMessageCommunicatorMock();
        // this.runner.start().then(() => this.registerEventListeners())
    }

    public send(): Promise<boolean | void> {
        return this.sender.publish(this.requisition)
            .then((data: output.RequisitionModel) => {
                console.log(`Enqueuer client got data`);
                this.emit('response', data)
            })
            .catch(err => {
                const errorMessage = `Error sending/receiving message to/from enqueuer: ${err}`;
                // console.error(errorMessage)
                this.emit('error', err);
            });
    }

    private addErrorEventListener = () => {
        this.runner.on('error', (error: Error) => this.emit('error', error))
    }

    private addExitEventListener = () => {
        this.runner.on('exit', (statusCode: number) => this.emit('exit', statusCode));
    }

    private addLogEventListener = () => {
        this.runner.on('log', (data: string) => this.emit('log', data));
    }

    private registerEventListeners() {
        this.addExitEventListener();
        this.addErrorEventListener();
        this.addLogEventListener();
    }
}