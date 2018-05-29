import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import { RunnableModel } from './models/inputs/runnable-model';
import { ResultModel } from './models/outputs/result-model';
import { EnqueuerResponserServerUds } from './enqueuer-response-server-uds';
import { EnqueuerResponseServer } from './enqueuer-responser-server';

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
  private responseServer: EnqueuerResponseServer;

  public constructor(runnable: RunnableModel) {
    super();
    this.runnable = runnable;
    this.responseServer = new EnqueuerResponserServerUds();
    this.startEnqueuer();
  }

  private startEnqueuer = () => {
    console.log('Starting enqueuer');
    // this.enqueuer = spawn('node', ['node_modules/enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
    // this.enqueuer = spawn('node', ['../enqueuer/js/index.js', '--config-file', 'conf/enqueuer.yml']);
    // this.addExitEventListener();
    // this.addErrorEventListener();
    // this.addLogEventListener();
  }

  public send = (): void => {
    //TODO: enqueue a message
    console.log('Writing message to enqueuer');
    // this.responseServer.connect()
    //   .then(() => {
    //     this.enqueuer.stdin.write(JSON.stringify(this.runnable) + '\r\n');
    //     this.enqueuer.stdin.end();
    //     return this.responseServer.receiveMessage()
    //   })
    //   .then((data: string) => this.emit('response', JSON.parse(data) as ResultModel))
    //   .catch(err => console.error(`Error sending/receiving message to/from enqueuer: ${err}`));
      this.emit('response', result);
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