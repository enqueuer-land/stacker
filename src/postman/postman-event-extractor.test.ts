import {PostmanEventExtractor} from './postman-event-extractor';

describe('PostmanEventExtractor', () => {
    it('should extract onInitEvent', () => {
        const event = {
            event: [
                {
                    listen: 'prerequest',
                    script: {
                        id: '7955eff0-4714-49cf-a324-c51497cadc85',
                        'type': 'text/javascript',
                        'exec': [
                            'let onInit;'
                        ]
                    }
                }
            ],
            variable: [
                {
                    id: '77e59094-9650-4a0b-8740-6db62932cbb8',
                    'key': 'google',
                    'value': 'google',
                    'type': 'string'
                },
                {
                    'id': '7a5868f5-6374-4bb1-b65e-43a93575d91f',
                    'key': 'number',
                    'value': '2',
                    'type': 'string'
                }
            ]
        };
        expect(new PostmanEventExtractor(event).extractOnInitEvent()).toEqual(
            {
                script: 'let onInit;',
                store: {
                    google: '`google`',
                    number: '`2`',
                }
            });
    });

    it('should extract onMessageReceivedEvent', () => {
        const event = {
            event: [
                {
                    listen: 'test',
                    script: {
                        id: '7955eff0-4714-49cf-a324-c51497cadc85',
                        'type': 'text/javascript',
                        'exec': [
                            'let onMessageReceived;'
                        ]
                    }
                },
                {
                    listen: 'prerequest',
                    script: {
                        'exec': [
                            'let onInit;'
                        ]
                    }
                }
            ],
            variable: [
                {
                    'id': '7a5868f5-6374-4bb1-b65e-43a93575d91f',
                    'key': 'number',
                    'value': '2',
                    'type': 'string'
                }
            ]
        };
        expect(new PostmanEventExtractor(event).extractOnMessageReceivedEvent()).toEqual(
            {
                script: 'let onMessageReceived;'
            });
    });

    it('should extract onFinish', () => {
        const event = {
            event: [
                {
                    listen: 'test',
                    script: {
                        id: '7955eff0-4714-49cf-a324-c51497cadc85',
                        'type': 'text/javascript',
                        'exec': [
                            'let onFinish;'
                        ]
                    }
                },
                {
                    listen: 'prerequest',
                    script: {
                        'exec': [
                            'let onInit;'
                        ]
                    }
                }
            ],
            variable: [
                {
                    'id': '7a5868f5-6374-4bb1-b65e-43a93575d91f',
                    'key': 'number',
                    'value': '2',
                    'type': 'string'
                }
            ]
        };
        expect(new PostmanEventExtractor(event).extractOnMessageReceivedEvent()).toEqual(
            {
                script: 'let onFinish;'
            });
    });
});
