import * as net from 'net';
import * as fs from 'fs';
import { EnqueuerMessageReceiver } from './enqueuer-message-receiver';

export class EnqueuerMessageReceiverUds implements EnqueuerMessageReceiver {
    public static readonly path: string = '/tmp/out.sock';
    private server: any;

    public receiveMessage(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.server.on('connection', (stream: any) => {
                stream.on('end', () => {
                    stream.end();
                    reject();
                });

                stream.on('data', (msg: any) => {
                    msg = msg.toString();
                    resolve(msg);
                    stream.end();
                });

            });
        });
    }

    public connect(): Promise<void> {
        return new Promise((resolve) => {
            try {
                fs.unlink(EnqueuerMessageReceiverUds.path, () => {
                    this.server = net.createServer()
                        .listen(EnqueuerMessageReceiverUds.path, () => resolve());
                });
            } catch (err) {
                return Promise.reject(err);
            }
        });
    }

    public unsubscribe(): void {
        this.server.close();
    }

}