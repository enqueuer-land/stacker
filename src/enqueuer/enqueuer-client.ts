import { EventEmitter } from 'events';
import { RunnableModel } from './models/inputs/runnable-model';
import { ResultModel } from './models/outputs/result-model';
import { EnqueuerRunner } from './runner/enqueuer-runner';
import { EnqueuerMessageSender } from './sender/enqueuer-message-sender';
import { EnqueuerMessageReceiver } from './receiver/enqueuer-message-receiver';
import { EnqueuerRunnerSpawn } from './runner/enqueuer-runner-spawn';
import { EnqueuerMessageSenderUds } from './sender/enqueuer-message-sender-uds';
import { EnqueuerMessageReceiverUds } from './receiver/enqueuer-message-receiver-uds';
import { EnqueuerRunnerMock } from './runner/enqueuer-runner-mock';
import { EnqueuerMessageSenderMock } from './sender/enqueuer-message-sender-mock';
import { EnqueuerMessageReceiverMock } from './receiver/enqueuer-message-receiver-mock';

export class EnqueuerClient extends EventEmitter {

    private runnableModel: RunnableModel;
    private runner: EnqueuerRunner;
    private sender: EnqueuerMessageSender;
    private receiver: EnqueuerMessageReceiver;

    public constructor(runnableModel: RunnableModel) {
        super();

        this.runnableModel = runnableModel;

        this.runner = new EnqueuerRunnerSpawn();
        this.sender = new EnqueuerMessageSenderUds();
        this.receiver = new EnqueuerMessageReceiverUds();

        // this.runner = new EnqueuerRunnerMock();
        // this.sender = new EnqueuerMessageSenderMock();
        // this.receiver = new EnqueuerMessageReceiverMock();
        this.runner.start().then(() => this.registerEventListeners())
    }

    public send(): Promise<boolean | void> {
        return this.receiver.connect()
            .then(() => this.sender.publish(this.runnableModel))
            .then(() => console.log('published'))
            .then(() => this.receiver.receiveMessage())
            .then((data: string) => this.emit('response', JSON.parse(data) as ResultModel))
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