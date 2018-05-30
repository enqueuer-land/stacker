import { EventEmitter } from 'events';
import { RunnableModel } from './models/inputs/runnable-model';
import { ResultModel } from './models/outputs/result-model';
import { EnqueuerResponserServerUds } from './enqueuer-response-server-uds';
import { EnqueuerResponseServer } from './enqueuer-responser-server';
import { EnqueuerResponserServerMock } from './enqueuer-response-server-mock';
import { EnqueuerMessageSender } from './enqueuer-message-sender';
import { EnqueuerMessageSenderStandardInput } from './enqueuer-message-sender-standard-input';
import { EnqueuerMessageSenderMock } from './enqueuer-message-sender-mock';

export class EnqueuerClient extends EventEmitter {

    private runnableModel: RunnableModel;
    private messageSender: EnqueuerMessageSender;
    private responseServer: EnqueuerResponseServer;

    public constructor(runnableModel: RunnableModel) {
        super();
        this.runnableModel = runnableModel;
        this.responseServer = new EnqueuerResponserServerMock();
        // this.responseServer = new EnqueuerResponserServerUds();
        this.messageSender = new EnqueuerMessageSenderMock();
        // this.messageSender = new EnqueuerMessageSenderStandardInput();

        this.registerEventListeners();
    }

    public send = (): void => {
        console.log('Writing message to enqueuer');
        this.responseServer.connect()
            .then(() => this.messageSender.publish(this.runnableModel))
            .then(() => this.responseServer.receiveMessage())
            .then((data: string) => this.emit('response', JSON.parse(data) as ResultModel))
            .catch(err => console.error(`Error sending/receiving message to/from enqueuer: ${err}`));
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