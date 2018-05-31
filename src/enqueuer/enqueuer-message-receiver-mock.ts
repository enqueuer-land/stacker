import { ResultModel } from './models/outputs/result-model';
import { EnqueuerMessageReceiver } from './enqueuer-message-receiver';

export class EnqueuerMessageReceiverMock implements EnqueuerMessageReceiver {

    private result: ResultModel = {
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
                    'timeout': 3000
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

    public async receiveMessage(): Promise<string> {
        return JSON.stringify(this.result);
    }

    public connect(): Promise<void> {
        return Promise.resolve();
    }

    public unsubscribe(): void {
        return;
    }

}