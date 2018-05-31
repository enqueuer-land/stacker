import * as net from 'net';
import * as fs from 'fs';
import { EnqueuerMessageReceiver } from './enqueuer-message-receiver';

export class EnqueuerMessageReceiverUds implements EnqueuerMessageReceiver {
    private server: any;
    private path: string;

    constructor() {
        this.path = 'enqueuer-message-receiver';
    }

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
            fs.unlink(this.path, () => {
                this.server = net.createServer()
                    .listen(this.path, () => {
                        resolve();
                    });
            });
        });
    }

    public unsubscribe(): void {
        this.server.close();
    }

}