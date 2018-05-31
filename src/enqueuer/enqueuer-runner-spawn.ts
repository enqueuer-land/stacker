import { spawn, ChildProcess } from 'child_process';
import { EnqueuerRunner } from './enqueuer-runner';

export class EnqueuerRunnerSpawn extends EnqueuerRunner {
    private enqueuer: ChildProcess;

    public async start(): Promise<void> {
        console.log('Starting enqueuer');
        this.enqueuer = spawn('node', ['node_modules/enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
        // this.enqueuer = spawn('node', ['../enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);

        this.addExitEventListener();
        this.addErrorEventListener();
        this.addLogEventListener();
    }

    private addErrorEventListener = (): void => {
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