import {ipcRenderer} from 'electron';
import {ChildProcess, spawn} from 'child_process';
import {EventEmitter} from 'events';

const isJest = process.argv[1].match(/[\\/]jest/) != null;

export class EnqueuerRunnerSpawn extends EventEmitter {
    private static enqueuer: ChildProcess = EnqueuerRunnerSpawn.startSingleRunner();

    public static start(): ChildProcess {
        if (EnqueuerRunnerSpawn.enqueuer) {
            console.log('It\'s started');
        } else {
            // return EnqueuerRunnerSpawn.startSingleRunner();
        }
        return EnqueuerRunnerSpawn.enqueuer;
    }

    public static addErrorEventListener(cb: any): void {
        // const errorFunction = (error: Error) => self.emit('error', error);
        EnqueuerRunnerSpawn.enqueuer.on('error', cb);
        EnqueuerRunnerSpawn.enqueuer.stderr.on('data', (error: Error) => cb(error));
    }

    public static addExitEventListener(cb: any): void {
        EnqueuerRunnerSpawn.enqueuer.once('exit', (statusCode: number) => cb(statusCode));
    }

    public static addLogEventListener(cb: any): void {
        EnqueuerRunnerSpawn.enqueuer.stdout.on('data', (data: string) => cb(data));
        EnqueuerRunnerSpawn.enqueuer.stdout.on('data', (data: string) => console.log(data));
    }

    private static startSingleRunner() {
        if (isJest) {
            EnqueuerRunnerSpawn.enqueuer = spawn('ls');
        } else {
            EnqueuerRunnerSpawn.enqueuer = spawn('node', ['node_modules/enqueuer/js/index.js', 'conf/daemon.yml']);
        }
        this.tellStartToElectron(EnqueuerRunnerSpawn.enqueuer);

        console.log(`Enqueuer ${EnqueuerRunnerSpawn.enqueuer.pid} started`);
        EnqueuerRunnerSpawn.enqueuer.once('exit', (statusCode: number) => EnqueuerRunnerSpawn.restartEnqueuer(statusCode));
        return EnqueuerRunnerSpawn.enqueuer;
    }

    private static tellStartToElectron(enqueuer: ChildProcess) {
        if (ipcRenderer) {
            ipcRenderer.send('enqueuerChild', enqueuer);
        } else {
            console.error('Error emitting enqueuerChild to electron window');
        }
    }

    private static restartEnqueuer(statusCode: number): void {
        console.log(`Enqueuer ${EnqueuerRunnerSpawn.enqueuer.pid} died: ${statusCode}`);
        delete EnqueuerRunnerSpawn.enqueuer;
        if (!statusCode) {
            console.log(`Restarting enqueuer`);
            EnqueuerRunnerSpawn.startSingleRunner();
        } else {
            console.log(`No restarting enqueuer`);
        }
    }

}