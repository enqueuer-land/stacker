import {spawn, ChildProcess} from 'child_process';
import { EventEmitter } from 'events';
import { RunnableModel } from '../models/runnables/runnable-model';
import { ResultModel } from '../models/results/result-model';

const result: ResultModel = {
    valid: true,
    name: 'runnableAmqp',
    type: 'runnable',
    id: 'runnableAmqpId',
    runnables: [
        {
            name: 'amqpRequisition',
            type: 'requisition',
            valid: true,
            tests: {
                'No time out': true
            },
            startEvent: {
                publisher: {
                    name: 'amqpPublisher',
                    valid: true,
                    publishTime: '2018-05-17T01:40:58.996Z',
                    type: 'amqp'
                }
            },
            subscriptions: [
                {
                    name: 'AmqpSubs',
                    valid: true,
                    tests: {
                        'works': true,
                        'Message received': true,
                        'No time out': true
                    },
                    connectionTime: '2018-05-17T01:40:58.988Z',
                    messageReceivedTime: '2018-05-17T01:40:58.996Z',
                    type: 'amqp',
                }
            ],
            time: {
              totalTime: 25,
              startTime: '2018-05-17T01:40:58.972Z',
              endTime: '2018-05-17T01:40:58.997Z',
              timeout: 3000,
            }
        }
    ]
};

export class EnqueuerClient extends EventEmitter {

    private runnable: RunnableModel;
    private enqueuer: ChildProcess;

    public constructor(runnable: RunnableModel) {
        super();
        this.runnable = runnable;
        this.startEnqueuer();
    }

    private startEnqueuer() {
        console.log('Starting enqueuer');
        // this.enqueuer = spawn('node', ['node_modules/enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
        this.enqueuer = spawn('node', ['../enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
        this.addExitEventListener();
        this.addErrorEventListener();
        // this.addDataEventListener();
    }

    public send(): void {
        //TODO: enqueue a message
        console.log('Writing message to enqueuer');
        this.emit('response', result);
        // this.enqueuer.stdin.write(JSON.stringify(this.runnable) + '\r\n');
        // this.enqueuer.stdin.end();
    }

    private addDataEventListener() {
        //TODO: handle exception
        this.enqueuer.stdout.on('data', (data: string) => {
            const result: ResultModel = JSON.parse(data) as ResultModel;
            this.emit('response', result);
        });
    }

    private addErrorEventListener() {
        const errorFunction = (error: Error) => this.emit('error', error);
        this.enqueuer.on('error', errorFunction);
        this.enqueuer.stderr.on('data', errorFunction);
    }

    private addExitEventListener() {
        this.enqueuer.on('exit', (statusCode: number) => this.emit('exit', statusCode));
    }

}