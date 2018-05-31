import { EventEmitter } from 'events';
import { RunnableModel } from './models/inputs/runnable-model';
import { ResultModel } from './models/outputs/result-model';
import { EnqueuerMessageSender } from './enqueuer-message-sender';
import { EnqueuerMessageSenderStandardInput } from './enqueuer-message-sender-standard-input';
import { EnqueuerMessageSenderMock } from './enqueuer-message-sender-mock';
import { EnqueuerMessageReceiver } from './enqueuer-message-receiver';
import { EnqueuerMessageReceiverUds } from './enqueuer-message-receiver-uds';
import { EnqueuerMessageReceiverMock } from './enqueuer-message-receiver-mock';

export class EnqueuerClient extends EventEmitter {

    private runnableModel: RunnableModel;
    private messageSender: EnqueuerMessageSender;
    private responseServer: EnqueuerMessageReceiver;

    public constructor(runnableModel: RunnableModel) {
        super();
        this.runnableModel = runnableModel;
        // this.responseServer = new EnqueuerMessageReceiverMock();
        this.responseServer = new EnqueuerMessageReceiverUds();
        this.messageSender = new EnqueuerMessageSenderMock();
        this.messageSender = new EnqueuerMessageSenderStandardInput();

        this.registerEventListeners();
    }

    public async send(): Promise<boolean | void> {
        return await this.responseServer.connect()
            .then(() => this.messageSender.publish(this.runnableModel))
            .then(() => this.responseServer.receiveMessage())
            .then((data: string) => this.emit('response', JSON.parse(data) as ResultModel))
            .catch(err => {
                const errorMessage = `Error sending/receiving message to/from enqueuer: ${err}`;
                // console.error(errorMessage)
                this.emit('error', err);
            });
    }

    private addErrorEventListener = () => {
        this.messageSender.on('error', (error: Error) => this.emit('error', error));
    }

    private addExitEventListener = () => {
        this.messageSender.on('exit', (statusCode: number) => this.emit('exit', statusCode));
    }

    private addLogEventListener = () => {
        this.messageSender.on('log', (data: string) => this.emit('log', data));
    }

    private registerEventListeners() {
        this.addExitEventListener();
        this.addErrorEventListener();
        this.addLogEventListener();
    }
}