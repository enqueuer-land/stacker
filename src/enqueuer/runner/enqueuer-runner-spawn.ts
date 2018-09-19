import {ipcRenderer} from 'electron';
import {ChildProcess, spawn} from 'child_process';
import {EventEmitter} from 'events';

export class EnqueuerRunnerSpawn extends EventEmitter {

    private static enqueuer?: ChildProcess;//EnqueuerRunnerSpawn.startSingleRunner();

    public static start(): any {
        if (EnqueuerRunnerSpawn.enqueuer) {
            console.log('It\'s started');
            return EnqueuerRunnerSpawn.enqueuer;
        } else {
            return EnqueuerRunnerSpawn.startSingleRunner();
        }
    }

    private static addErrorEventListener = (self: ChildProcess): void => {
        const errorFunction = (error: Error) => self.emit('error', error);
        self.on('error', errorFunction);
        self.stderr.on('data', errorFunction);
    }

    private static addExitEventListener = (self: ChildProcess) => {
        self.on('exit', (statusCode: number) => {
            self.emit('exit', statusCode)
        });
    }

    private static addLogEventListener = (self: ChildProcess) => {
        self.stdout.on('data', (data: string) => self.emit('log', data));
    }

    private static startSingleRunner() {
        const isJest = process.argv[1].match(/[\\/]jest/) != null;
        const enqueuer = isJest ?
            spawn('ls')
            :
            spawn('node', ['node_modules/enqueuer/js/index.js', 'conf/daemon.yml']);
        console.log(`Starting enqueuer ${enqueuer.pid}`);
        if (ipcRenderer) {
            ipcRenderer.send('enqueuerChild', enqueuer);
        } else {
            console.error("Error emitting enqueuerChild pid");
        }

        let sleep = (millisecondsToWait: number): void => {
            const waitTill = new Date(new Date().getTime() + millisecondsToWait);
            while (waitTill > new Date()) {
                //wait
            }
        };
        sleep(1000);

        console.log(`Enqueuer started`);
        EnqueuerRunnerSpawn.addExitEventListener(enqueuer);
        EnqueuerRunnerSpawn.addLogEventListener(enqueuer);
        EnqueuerRunnerSpawn.addErrorEventListener(enqueuer);

        enqueuer.on('exit', (statusCode: number) => {
            console.log(`Enqueuer ${enqueuer.pid} died: ${statusCode}`);
            // console.log(`Restarting`);
            delete EnqueuerRunnerSpawn.enqueuer;
            // EnqueuerRunnerSpawn.startSingleRunner();
        });

        EnqueuerRunnerSpawn.enqueuer = enqueuer;
        return enqueuer;
    }

}