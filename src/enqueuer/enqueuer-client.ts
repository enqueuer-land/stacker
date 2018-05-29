import {spawn, ChildProcess} from 'child_process';
import { EventEmitter } from 'events';
import { RunnableModel } from './models/inputs/runnable-model';
import { ResultModel } from './models/outputs/result-model';

const result: ResultModel = {
'type': 'runnable',
    'valid': true,
    'name': 'runnableAmqp',
    'id': 'runnableAmqpId',
    'runnables': [
      {
        'type': 'requisition',
        'valid': true,
        'tests': {
          'No time out': true
        },
        'name': 'AmqpReq',
        'time': {
          'totalTime': 25,
          'startTime': '2018-05-28T23:00:07.485Z',
          'endTime': '2018-05-28T23:00:07.510Z',
          'timeout': 3000,
          'hasTimedOut': false
        },
        'subscriptions': [
          {
            'name': 'AmqpSubs',
            'type': 'amqp',
            'tests': {
              'Able to connect': true,
              'works': true,
              'Message received': true,
              'No time out': true
            },
            'valid': true,
            'connectionTime': '2018-05-28T23:00:07.494Z',
            'messageReceivedTime': '2018-05-28T23:00:07.510Z'
          }
        ],
        'startEvent': {
          'publisher': {
            'name': 'AmqpPub',
            'valid': true,
            'type': 'amqp',
            'tests': {},
            'publishTime': '2018-05-28T23:00:07.496Z'
          }
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