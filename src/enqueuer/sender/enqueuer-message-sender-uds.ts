import { EnqueuerMessageSender } from './enqueuer-message-sender';
import * as net from 'net';
import { RunnableModel } from '../models/inputs/runnable-model';

export class EnqueuerMessageSenderUds implements EnqueuerMessageSender {

    private readonly path: string = 'enqueuer-message-sender';

    public publish(runnableModel: RunnableModel): Promise<void> {
        return new Promise((resolve, reject) => {
            const client = net.createConnection(this.path)
                .on('connect', () => {
                    client.write(JSON.stringify(runnableModel));
                    resolve()
                })
                .on('error', function (data: any) {
                    reject(data);
                })
        });
    }

}