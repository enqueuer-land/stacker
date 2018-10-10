import {EventEmitter} from 'events';
import {EnqueuerRunnerSpawn} from './runner/enqueuer-runner-spawn';
import {EnqueuerMessageCommunicatorHttp} from './communicator/enqueuer-message-communicator-http';

export class EnqueuerClient extends EventEmitter {

    private requisition: any;
    private sender: EnqueuerMessageCommunicatorHttp;

    public constructor(requisition: any) {
        super();

        this.requisition = requisition;

        EnqueuerRunnerSpawn.start();
        this.sender = new EnqueuerMessageCommunicatorHttp();
        this.registerEventListeners();
    }

    public send(): Promise<boolean> {
        return this.sender.publish(this.requisition)
            .then((data: any) => {
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
