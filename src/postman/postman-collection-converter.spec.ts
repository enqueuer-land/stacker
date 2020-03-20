import {PostmanCollectionConverter} from '@/postman/postman-collection-converter';

describe('PostmanCollectionConverter', () => {
    it('should reuse name', () => {
        const postmanCollection = {
            info: {
                name: 'name'
            },
            item: []
        };

        const converted = new PostmanCollectionConverter().convert(postmanCollection);

        expect(converted.name).toBe(postmanCollection.info.name);
    });

    it('should reuse name recursively', () => {
        const postmanCollection = {
            info: {
                name: 'name'
            },
            item: [{
                name: 'name2',
                item: []
            }]
        };

        const converted = new PostmanCollectionConverter().convert(postmanCollection);

        expect(converted.name).toBe(postmanCollection.info.name);
        expect(converted.requisitions[0].name).toBe(postmanCollection.item[0].name);
    });

    it('should create publishers', () => {
        const postmanCollection: any = {
            info: {
                name: 'Name',
            },
            item: [
                {
                    name: 'Get stuff',
                    event: [
                        {
                            listen: 'prerequest',
                            script: {
                                exec: [
                                    'const pubInit = true;'
                                ],
                                type: 'text/javascript'
                            }
                        },
                        {
                            listen: 'test',
                            script: {
                                exec: [
                                    'const pubFinish = true;'
                                ],
                                type: 'text/javascript'
                            }
                        }
                    ],
                    request: {
                        method: 'POST',
                        url: {
                            raw: 'http://localhost:80/resources/id',
                        },
                        auth: {
                            type: 'basic',
                            basic: [{
                                key: 'key',
                                value: 'value'
                            }]
                        },
                        header: [
                            {
                                key: 'Content-Type',
                                name: 'Content-Type',
                                value: 'application/json',
                                type: 'text'
                            }
                        ],
                        body: {
                            mode: 'raw',
                            raw: '{\n    \'id\': \'9fee90b4-8b28-49e5-bc1e-d8a3430d1234\',\n    \'description\': \'iPhone\'\n}',
                            options: {
                                raw: {
                                    language: 'json'
                                }
                            }
                        },
                    },
                    response: []
                }
            ]
        };

        const converted = new PostmanCollectionConverter().convert(postmanCollection);

        expect(converted).toEqual({
            name: 'Name',
            publishers: [
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    authentication: {
                        basic: {
                            key: 'value'
                        }
                    },
                    method: 'POST',
                    name: 'Get stuff',
                    payload: '{\n    \'id\': \'9fee90b4-8b28-49e5-bc1e-d8a3430d1234\',\n    \'description\': \'iPhone\'\n}',
                    type: 'HTTP',
                    url: 'http://localhost:80/resources/id',
                    onInit: {
                        script: 'const pubInit = true;'
                    },
                    onResponseReceived: {
                        script: 'const pubFinish = true;'
                    },
                }
            ],
            requisitions: [],
            subscriptions: []
        });
    });

    it('should get collection events', () => {
        const postmanCollection: any = {
            info: {
                name: 'Name',
            },
            item: [],
            event: [
                {
                    listen: 'prerequest',
                    script: {
                        exec: [
                            'const init = true;'
                        ],
                        type: 'text/javascript'
                    }
                },
                {
                    listen: 'test',
                    script: {
                        exec: [
                            'const finish = true;'
                        ],
                        type: 'text/javascript'
                    }
                }
            ],
        };

        const converted = new PostmanCollectionConverter().convert(postmanCollection);

        expect(converted).toEqual({
            name: 'Name',
            publishers: [],
            requisitions: [],
            subscriptions: [],
            onInit: {
                script: 'const init = true;'
            },
            onFinish: {
                script: 'const finish = true;'
            },
        });
    });

    it('should create subscriptions', () => {
        const postmanCollection: any = {
            info: {
                name: 'Name',
            },
            item: [
                {
                    name: 'subscription',
                    response: [{
                        id: 'id',
                        name: 'subscription',
                        originalRequest: {
                            url: {
                                protocol: 'http',
                                method: 'POST',
                                path: ['/resource/:id']
                            }
                        },
                        header: [
                            {
                                key: 'Content-Type',
                                name: 'Content-Type',
                                value: 'application/json',
                                type: 'text'
                            }
                        ],
                        body: 'payload'
                    }]
                }
            ]
        };

        const converted = new PostmanCollectionConverter().convert(postmanCollection);

        expect(converted).toEqual({
            name: 'Name',
            subscriptions: [
                {
                    id: 'id',
                    endpoint: '/resource/:id',
                    name: 'subscription',
                    port: 8080,
                    response: {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        payload: 'payload',
                        status: 200
                    },
                    type: 'http'
                }
            ],
            requisitions: [],
            publishers: []
        });
    });

});
