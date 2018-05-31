import { EnqueuerMessageSender } from './enqueuer-message-sender';
import * as net from 'net';
import { RunnableModel } from '../models/inputs/runnable-model';

export class EnqueuerMessageSenderUds implements EnqueuerMessageSender {

    public static readonly path: string = 'enqueuer-message-sender';

    public publish(runnableModel: RunnableModel): Promise<void> {
        return new Promise((resolve, reject) => {
            const client = net.createConnection(EnqueuerMessageSenderUds.path)
                .on('connect', () => {
                    if (client.write(JSON.stringify(runnableModel)))
                        resolve();
                    else
                        reject("Error publishing message to uds server");
                })
                .on('error', (data: any) => {
                    reject(data);
                });
        });
    }

}