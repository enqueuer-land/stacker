import {spawn, ChildProcess} from 'child_process';
import { EventEmitter } from 'events';
import { RunnableModel } from '../models/runnable-model';
export type EnqueuerResponseCallback = (response: string) => void;

export class EnqueuerClient extends EventEmitter {
    private enqueuer: ChildProcess;
    public constructor() {
        super();
        this.startEnqueuer();
    }

    private startEnqueuer() {
        console.log('Starting enqueuer');
        this.enqueuer = spawn('node', ['node_modules/enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
        this.addExitEventListener();
        this.addErrorEventListener();
        this.addDataEventListener();
    }

    public sendMessage(runnable: RunnableModel): void {
        //TODO: enqueue a message
        console.log('Writing message to enqueuer');
        this.enqueuer.stdin.write(JSON.stringify(runnable) + '\r\n');
        this.enqueuer.stdin.end();
    }

    private addDataEventListener() {
        this.enqueuer.stdout.on('data', (data: string) => {
            console.log('Got enqueuers response');
            this.emit('response', data);
        });
    }

    private addErrorEventListener() {
        this.enqueuer.on('error', (error: Error) => {
            console.log(`Enqueuer has errored: ${error}`);
            this.emit('error', error);
        });
    }

    private addExitEventListener() {
        this.enqueuer.on('exit', (statusCode: number) => {
            console.log(`Enqueuer has exited with status: ${statusCode}`);
            this.emit('exit', statusCode);
        });
    }

}