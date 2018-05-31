import { EnqueuerClient } from './enqueuer-client';
import { RunnableModel } from './models/inputs/runnable-model';
import { ResultModel } from './models/outputs/result-model';
import { EnqueuerRunnerSpawn } from './runner/enqueuer-runner-spawn';
import { EnqueuerMessageReceiverUds } from './receiver/enqueuer-message-receiver-uds';
import { EnqueuerMessageSenderUds } from './sender/enqueuer-message-sender-uds';

jest.mock('./runner/enqueuer-runner-spawn');
jest.mock('./receiver/enqueuer-message-receiver-uds');
jest.mock('./sender/enqueuer-message-sender-uds');

let runnableModel: RunnableModel = {
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
                    'port': null,
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

EnqueuerRunnerSpawn.mockImplementation(() => {
    return {
        start: () => {
            return Promise.resolve();
        }
    };
});

describe('EnqueuerClient', () => {
    it('Should send "error" event when fails to connect', done => {

        EnqueuerMessageReceiverUds.mockImplementation(() => {
            return {
                connect: () => {
                    return Promise.reject('Connection Error Message');
                }
            };
        });
        EnqueuerMessageSenderUds.mockImplementation(() => {
            return { on: (eventName: string, callback: any) => { } };
        });

        const enqueuer = new EnqueuerClient(runnableModel);
        enqueuer.send();
        enqueuer.on('error', (err) => done());
    });

    it('Should send "error" event when fails to publish', done => {

        EnqueuerMessageReceiverUds.mockImplementation(() => {
            return { connect: () => { return Promise.resolve(); } };
        });

        EnqueuerMessageSenderUds.mockImplementation(() => {
            return {
                publish: (RunnableModel: RunnableModel) => {
                    return Promise.reject('Publish Error Message');
                },
                on: (eventName: string, callback: any) => { }
            };
        });

        const enqueuer = new EnqueuerClient(runnableModel);
        enqueuer.send();
        enqueuer.on('error', (err) => done());
    });

    it('Should send "error" event when fails to receive message', done => {

        EnqueuerMessageReceiverUds.mockImplementation(() => {
            return {
                connect: () => { return Promise.resolve(); },
                receiveMessage: () => { return Promise.reject("Receive Message Error Message"); }
            };
        });

        EnqueuerMessageSenderUds.mockImplementation(() => {
            return {
                publish: (RunnableModel: RunnableModel) => {
                    return Promise.resolve();
                },
                on: (eventName: string, callback: any) => { }
            };
        });

        const enqueuer = new EnqueuerClient(runnableModel);
        enqueuer.send();
        enqueuer.on('error', (err) => done());
    });

    it('Should send "response" event when everything goes OK', done => {
        const resultModel: ResultModel = {
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

        EnqueuerMessageReceiverUds.mockImplementation(() => {
            return {
                connect: () => { return Promise.resolve(); },
                receiveMessage: () => {
                    return Promise.resolve(JSON.stringify(resultModel));
                }
            };
        });

        EnqueuerMessageSenderUds.mockImplementation(() => {
            return {
                publish: (RunnableModel: RunnableModel) => {
                    return Promise.resolve();
                },
                on: (eventName: string, callback: any) => { }
            };
        });

        const enqueuer = new EnqueuerClient(runnableModel);
        enqueuer.send();
        enqueuer.on('response', (response) => {
            expect(response).toEqual(resultModel);
            done();
        });
    });

});