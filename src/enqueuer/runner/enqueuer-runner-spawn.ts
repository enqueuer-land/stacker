import { ipcRenderer } from 'electron';
import { spawn, ChildProcess, spawnSync } from 'child_process';
import { EnqueuerRunner } from './enqueuer-runner';
import { isNullOrUndefined } from 'util';

export class EnqueuerRunnerSpawn extends EnqueuerRunner {

    private static enqueuer?: ChildProcess = EnqueuerRunnerSpawn.startSingleRunner();

    public constructor() {
        super();
        this.start();
    }

    public async start(): Promise<void> {
        if (!isNullOrUndefined(EnqueuerRunnerSpawn.enqueuer)) {
            this.addErrorEventListener();
            this.addExitEventListener();
            this.addLogEventListener();
            console.log('It\'s already started');
        }
    }

    private addErrorEventListener = (): void => {
        const errorFunction = (error: Error) => this.emit('error', error);
        EnqueuerRunnerSpawn.enqueuer.on('error', errorFunction);
        EnqueuerRunnerSpawn.enqueuer.stderr.on('data', errorFunction);
    }

    private addExitEventListener = () => {
        EnqueuerRunnerSpawn.enqueuer.on('exit', (statusCode: number) => {
            this.emit('exit', statusCode)
        });
    }

    private addLogEventListener = () => {
        EnqueuerRunnerSpawn.enqueuer.stdout.on('data', (data: string) => this.emit('log', data));
    }


    private static startSingleRunner(): ChildProcess {
        const enqueuer = spawn('node', ['node_modules/enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
        // EnqueuerRunnerSpawn.enqueuer = await spawn('node', ['../enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
        console.log(`Starting enqueuer ${enqueuer.pid}`);
        ipcRenderer.send('enqueuerChild', enqueuer);
        console.log(`Enqueuer started`);

        enqueuer.on('exit', (statusCode: number) => {
            console.log(`Enqueuer ${enqueuer.pid} died`);
            console.log(`Restarting`);
            EnqueuerRunnerSpawn.startSingleRunner();
        });

        EnqueuerRunnerSpawn.enqueuer = enqueuer;
        return enqueuer;
    }

}