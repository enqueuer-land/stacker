import { spawn, ChildProcess } from 'child_process';
import { EnqueuerMessageSender } from './enqueuer-message-sender';
import { RunnableModel } from './models/inputs/runnable-model';

export class EnqueuerMessageSenderStandardInput extends EnqueuerMessageSender {

    private enqueuer: ChildProcess;

    public constructor() {
        super();
        this.startEnqueuer();
        this.addExitEventListener();
        this.addErrorEventListener();
        this.addLogEventListener();
    }

    public async publish(runnableModel: RunnableModel): Promise<void> {
        this.enqueuer.stdin.write(JSON.stringify(runnableModel) + '\r\n');
        this.enqueuer.stdin.end();
    }

    private startEnqueuer = () => {
        console.log('Starting enqueuer');
        this.enqueuer = spawn('node', ['node_modules/enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
        // this.enqueuer = spawn('node', ['../enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
    }

    private addErrorEventListener = () => {
        const errorFunction = (error: Error) => this.emit('error', error);
        this.enqueuer.on('error', errorFunction);
        this.enqueuer.stderr.on('data', errorFunction);
    }

    private addExitEventListener = () => {
        this.enqueuer.on('exit', (statusCode: number) => this.emit('exit', statusCode));
    }

    private addLogEventListener = () => {
        this.enqueuer.stdout.on('log', (data: string) => this.emit('log', data));
    }

}