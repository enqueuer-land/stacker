import { EventEmitter } from 'events';
import { RunnableModel } from './models/inputs/runnable-model';
import { ResultModel } from './models/outputs/result-model';
import { EnqueuerRunner } from './enqueuer-runner';
import { EnqueuerMessageSender } from './enqueuer-message-sender';
import { EnqueuerMessageReceiver } from './enqueuer-message-receiver';
import { EnqueuerRunnerSpawn } from './enqueuer-runner-spawn';
import { EnqueuerMessageSenderUds } from './enqueuer-message-sender-uds';
import { EnqueuerMessageReceiverUds } from './enqueuer-message-receiver-uds';
import { EnqueuerRunnerMock } from './enqueuer-runner-mock';
import { EnqueuerMessageSenderMock } from './enqueuer-message-sender-mock';
import { EnqueuerMessageReceiverMock } from './enqueuer-message-receiver-mock';

export class EnqueuerClient extends EventEmitter {

    private runnableModel: RunnableModel;
    private runner: EnqueuerRunner;
    private sender: EnqueuerMessageSender;
    private receiver: EnqueuerMessageReceiver;

    public constructor(runnableModel: RunnableModel) {
        super();

        this.runnableModel = runnableModel;

        this.runner = new EnqueuerRunnerSpawn();
        this.receiver = new EnqueuerMessageReceiverUds();
        this.sender = new EnqueuerMessageSenderUds();

        // this.runner = new EnqueuerRunnerMock();
        // this.receiver = new EnqueuerMessageReceiverMock();
        // this.sender = new EnqueuerMessageSenderMock();

        this.runner.start()
            .then(() => this.registerEventListeners())
            .catch((err) => {/*console.error(err)*/ });
    }

    public async send(): Promise<boolean | void> {
        return await this.receiver.connect()
            .then(() => this.sender.publish(this.runnableModel))
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