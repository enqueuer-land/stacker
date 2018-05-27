// import {Logger} from 'log4js';
import {spawn, ChildProcess} from 'child_process';

const runnable = {
    'runnableVersion': '01.00.00',
    'name': 'runnableHttp',
    'id': 'randomIdFixedInRunnable',
    'initialDelay': 0,
    'runnables': [
        {
            'timeout': 30000,
            'name': 'HttpTitle',
            'subscriptions': [
                {
                    'type': 'http-server',
                    'name': 'HttpSubscriptionTitle',
                    'endpoint': '/enqueuer',
                    'port': 23075,
                    'method': 'POST',
                    'response': {
                        'status': 200
                    },
                    'timeout': 10000
                }
            ],
            'startEvent': {
                'publisher': {
                    'type': 'http-client',
                    'name': 'HttpPublisherClientTitle',
                    'url': 'http://localhost:23075/enqueuer',
                    'method': 'POST',
                    'payload': {
                        'enqueuer': 'virgs'
                    },
                    'headers': {
                        'content-type': 'application/json'
                    }
                }
            }
        }
    ]
};

export type EnqueuerResponseCallback = (response: string) => void;

export class EnqueuerClient {
    private enqueuer: ChildProcess;
    private static singleton = new EnqueuerClient();
    private onEnqueuerResponse: EnqueuerResponseCallback;
    private constructor() {
        this.onEnqueuerResponse = () => {/*do nothing*/};
        this.startEnqueuer();
        this.enqueuer.on('exit', (/*statusCode: number*/) => {
            // Logger.info(`Enqueuer has exited with status: ${statusCode}`);
            console.log('enqueuer exit');
            this.startEnqueuer();
        });
    }

    public setOnEnqueuerResponse(onEnqueuerResponse: EnqueuerResponseCallback): EnqueuerClient {
        this.onEnqueuerResponse = onEnqueuerResponse;
        return this;
    }

    private startEnqueuer() {
        // Logger.info(`Starting enqueuer`);
        this.enqueuer = spawn('node', ['node_modules/enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
        console.log('Starting enqueuer');
        this.enqueuer.stdout.on('data', (data: string) => {
            console.log('Got enqueuers response');
            this.onEnqueuerResponse(data);
            // this.enqueuer.kill('SIGINT');
        });
    }

    public static getInstance = () => EnqueuerClient.singleton;

    public run(): void {
        //TODO: enqueue a message
        // Logger.debug(`Sending to enqueuer: ${runnable}`
        //     .substr(0, 100).concat('...'));
        console.log('Writing message to enqueuer');
        this.enqueuer.stdin.write(JSON.stringify(runnable) + '\r\n');
        this.enqueuer.stdin.end();
        // this.enqueuer.stdin.resume();
    }

}