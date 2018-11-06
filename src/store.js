import Vue from 'vue';
import Vuex from 'vuex';
import {generateId} from './tests/id-generator';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sideBarSelectedItem: null,
        requisitions: [],
        // requisitions: [
        //     {
        //         parent: {
        //             name: 'firstParent',
        //             parent: {
        //                 name: 'secondParent',
        //                 parent: {
        //                     name: 'thirdParent'
        //                 }
        //             }
        //         },
        //         id: generateId(),
        //         name: 'first',
        //         publishers: [
        //             {
        //                 id: generateId(),
        //                 name: 'leaf p01',
        //                 type: "HTTP"
        //             },
        //             {
        //                 id: generateId(),
        //                 name: 'leaf p02',
        //                 type: "AMQP"
        //             }
        //         ],
        //         subscriptions: [
        //             {
        //                 id: generateId(),
        //                 name: 'leaf s01',
        //                 type: "ZEROMQ"
        //             },
        //             {
        //                 id: generateId(),
        //                 name: 'leaf s02',
        //                 type: "KAFKA"
        //             }
        //         ],
        //         requisitions: [
        //             {
        //                 id: generateId(),
        //                 name: 'first-first',
        //                 publishers: [
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf p11',
        //                         type: "HTTP"
        //                     }
        //                 ],
        //                 subscriptions: [
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf s11',
        //                         type: "AMQP"
        //                     },
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf s12',
        //                         type: "SQS"
        //                     }
        //                 ]
        //             },
        //             {
        //                 id: generateId(),
        //                 name: 'first-second',
        //                 publishers: [
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf p21',
        //                         type: "AMQP"
        //                     },
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf p22',
        //                         type: "MQTT"
        //                     }
        //                 ],
        //                 subscriptions: [
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf s21',
        //                         type: "ZEROMQ"
        //                     },
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf s22',
        //                         type: "SQS"
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         id: generateId(),
        //         name: 'second',
        //         publishers: [
        //             {
        //                 id: generateId(),
        //                 name: 'leaf p01',
        //                 type: "HTTP"
        //             },
        //             {
        //                 id: generateId(),
        //                 name: 'leaf p02',
        //                 type: "AMQP"
        //             }
        //         ],
        //         subscriptions: [
        //             {
        //                 id: generateId(),
        //                 name: 'leaf s01',
        //                 type: "ZEROMQ"
        //             },
        //             {
        //                 id: generateId(),
        //                 name: 'leaf s02',
        //                 type: "KAFKA"
        //             }
        //         ],
        //         requisitions: [
        //             {
        //                 id: generateId(),
        //                 name: 'first-first',
        //                 publishers: [
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf p11',
        //                         type: "HTTP"
        //                     }
        //                 ],
        //                 subscriptions: [
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf s11',
        //                         type: "AMQP"
        //                     },
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf s12',
        //                         type: "SQS"
        //                     }
        //                 ]
        //             },
        //             {
        //                 id: generateId(),
        //                 name: 'first-second',
        //                 publishers: [
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf p21',
        //                         type: "AMQP"
        //                     },
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf p22',
        //                         type: "MQTT"
        //                     }
        //                 ],
        //                 subscriptions: [
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf s21',
        //                         type: "ZEROMQ"
        //                     },
        //                     {
        //                         id: generateId(),
        //                         name: 'leaf s22',
        //                         type: "SQS"
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ],
        result: {
            "valid": false,
            "tests": [
                {
                    "valid": true,
                    "name": "No time out",
                    "description": "Requisition has not timed out"
                },
                {
                    "valid": false,
                    "name": "Some stuff",
                    "description": "Description"
                },
                {
                    "valid": true,
                    "name": "Some stuff",
                    "description": "Description"
                },
                {
                    "valid": true,
                    "name": "Some stuff",
                    "description": "Description"
                }

            ],
            "name": "Requisition Giant name and stuff #0",
            "subscriptions": [
                {
                    "name": "Subscription #0",
                    "type": "https-server",
                    "tests": [
                        {
                            "name": "Https payload",
                            "valid": true,
                            "description": "Expected 'JSON.parse(message.body).https' to be equal to 'works!'. Received 'works!'"
                        },
                        {
                            "valid": true,
                            "name": "Message received",
                            "description": "Subscription has received its message"
                        }
                    ],
                    "valid": true,
                    "connectionTime": "2018-11-02T17:19:26.179Z",
                    "messageReceived": {
                        "headers": {
                            "content-type": "application/json",
                            "content-length": "23",
                            "host": "localhost:4430",
                            "connection": "close"
                        },
                        "params": {},
                        "query": {},
                        "body": "{\n  \"https\": \"works!\"\n}"
                    }
                }
            ],
            "publishers": [
                {
                    "name": "publisher description",
                    "valid": true,
                    "type": "https-client",
                    "tests": [
                        {
                            "name": "Published",
                            "valid": true,
                            "description": "Published successfully"
                        },
                        {
                            "name": "Status Code",
                            "valid": true,
                            "description": "Expected 'statusCode' to be equal to '200'. Received '200'"
                        },
                        {
                            "name": "Body",
                            "valid": true,
                            "description": "Expected 'body' to be equal to 'https'. Received 'https'"
                        },
                        {
                            "name": "Response message received",
                            "valid": true,
                            "description": "Response message was received"
                        }
                    ],
                    "publishTime": "2018-11-02T17:19:26.212Z",
                    "messageReceived": {
                        "statusCode": 200,
                        "body": "https",
                        "headers": {
                            "x-powered-by": "Express",
                            "access-control-allow-origin": "*",
                            "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
                            "content-type": "text/html; charset=utf-8",
                            "content-length": "5",
                            "etag": "W/\"5-w0N9vHwSVdOiHURNhuvy6SNMIr0\"",
                            "date": "Fri, 02 Nov 2018 17:19:26 GMT",
                            "connection": "close"
                        },
                        "request": {
                            "uri": {
                                "protocol": "https:",
                                "slashes": true,
                                "auth": null,
                                "host": "localhost:4430",
                                "port": "4430",
                                "hostname": "localhost",
                                "hash": null,
                                "search": null,
                                "query": null,
                                "pathname": "/enqueuer",
                                "path": "/enqueuer",
                                "href": "https://localhost:4430/enqueuer"
                            },
                            "method": "post",
                            "headers": {
                                "content-type": "application/json",
                                "Content-Length": 23
                            }
                        }
                    }
                }
            ],
            "time": {
                "startTime": "2018-11-02T17:19:26.162Z",
                "endTime": "2018-11-02T17:19:26.213Z",
                "totalTime": 51011,
                "timeout": 3000
            },
            requisitions: [{
                "valid": true,
                "tests": [
                    {
                        "valid": true,
                        "name": "No time out",
                        "description": "Requisition has timed out"
                    }
                ],
                "name": "Requisition #0",
                "subscriptions": [
                    {
                        "name": "Subscription #0",
                        "type": "https-server",
                        "tests": [
                            {
                                "name": "Https payload",
                                "valid": true,
                                "description": "Expected 'JSON.parse(message.body).https' to be equal to 'works!'. Received 'works!'"
                            },
                            {
                                "valid": true,
                                "name": "Message received",
                                "description": "Subscription has received its message"
                            }
                        ],
                        "valid": true,
                        "connectionTime": "2018-11-02T17:19:26.179Z",
                        "messageReceived": {
                            "headers": {
                                "content-type": "application/json",
                                "content-length": "23",
                                "host": "localhost:4430",
                                "connection": "close"
                            },
                            "params": {},
                            "query": {},
                            "body": "{\n  \"https\": \"works!\"\n}"
                        }
                    }
                ],
                "publishers": [
                    {
                        "name": "publisher description",
                        "valid": true,
                        "type": "https-client",
                        "tests": [
                            {
                                "name": "Published",
                                "valid": true,
                                "description": "Published successfully"
                            },
                            {
                                "name": "Status Code",
                                "valid": true,
                                "description": "Expected 'statusCode' to be equal to '200'. Received '200'"
                            },
                            {
                                "name": "Body",
                                "valid": true,
                                "description": "Expected 'body' to be equal to 'https'. Received 'https'"
                            },
                            {
                                "name": "Response message received",
                                "valid": true,
                                "description": "Response message was received"
                            }
                        ],
                        "publishTime": "2018-11-02T17:19:26.212Z",
                        "messageReceived": {
                            "statusCode": 200,
                            "body": "https",
                            "headers": {
                                "x-powered-by": "Express",
                                "access-control-allow-origin": "*",
                                "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
                                "content-type": "text/html; charset=utf-8",
                                "content-length": "5",
                                "etag": "W/\"5-w0N9vHwSVdOiHURNhuvy6SNMIr0\"",
                                "date": "Fri, 02 Nov 2018 17:19:26 GMT",
                                "connection": "close"
                            },
                            "request": {
                                "uri": {
                                    "protocol": "https:",
                                    "slashes": true,
                                    "auth": null,
                                    "host": "localhost:4430",
                                    "port": "4430",
                                    "hostname": "localhost",
                                    "hash": null,
                                    "search": null,
                                    "query": null,
                                    "pathname": "/enqueuer",
                                    "path": "/enqueuer",
                                    "href": "https://localhost:4430/enqueuer"
                                },
                                "method": "post",
                                "headers": {
                                    "content-type": "application/json",
                                    "Content-Length": 23
                                }
                            }
                        }
                    }
                ],
                "time": {
                    "startTime": "2018-11-02T17:19:26.162Z",
                    "endTime": "2018-11-02T17:19:26.213Z",
                    "totalTime": 51,
                    "timeout": 3000
                }
            },
                {
                    "valid": true,
                    "tests": [
                        {
                            "valid": true,
                            "name": "No time out",
                            "description": "Requisition has timed out"
                        }
                    ],
                    "name": "Requisition #1",
                    "subscriptions": [
                        {
                            "name": "Subscription #0",
                            "type": "https-server",
                            "tests": [
                                {
                                    "name": "Https payload",
                                    "valid": true,
                                    "description": "Expected 'JSON.parse(message.body).https' to be equal to 'works!'. Received 'works!'"
                                },
                                {
                                    "valid": true,
                                    "name": "Message received",
                                    "description": "Subscription has received its message"
                                }
                            ],
                            "valid": true,
                            "connectionTime": "2018-11-02T17:19:26.179Z",
                            "messageReceived": {
                                "headers": {
                                    "content-type": "application/json",
                                    "content-length": "23",
                                    "host": "localhost:4430",
                                    "connection": "close"
                                },
                                "params": {},
                                "query": {},
                                "body": "{\n  \"https\": \"works!\"\n}"
                            }
                        }
                    ],
                    "publishers": [
                        {
                            "name": "publisher description",
                            "valid": true,
                            "type": "https-client",
                            "tests": [
                                {
                                    "name": "Published",
                                    "valid": true,
                                    "description": "Published successfully"
                                },
                                {
                                    "name": "Status Code",
                                    "valid": true,
                                    "description": "Expected 'statusCode' to be equal to '200'. Received '200'"
                                },
                                {
                                    "name": "Body",
                                    "valid": true,
                                    "description": "Expected 'body' to be equal to 'https'. Received 'https'"
                                },
                                {
                                    "name": "Response message received",
                                    "valid": true,
                                    "description": "Response message was received"
                                }
                            ],
                            "publishTime": "2018-11-02T17:19:26.212Z",
                            "messageReceived": {
                                "statusCode": 200,
                                "body": "https",
                                "headers": {
                                    "x-powered-by": "Express",
                                    "access-control-allow-origin": "*",
                                    "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
                                    "content-type": "text/html; charset=utf-8",
                                    "content-length": "5",
                                    "etag": "W/\"5-w0N9vHwSVdOiHURNhuvy6SNMIr0\"",
                                    "date": "Fri, 02 Nov 2018 17:19:26 GMT",
                                    "connection": "close"
                                },
                                "request": {
                                    "uri": {
                                        "protocol": "https:",
                                        "slashes": true,
                                        "auth": null,
                                        "host": "localhost:4430",
                                        "port": "4430",
                                        "hostname": "localhost",
                                        "hash": null,
                                        "search": null,
                                        "query": null,
                                        "pathname": "/enqueuer",
                                        "path": "/enqueuer",
                                        "href": "https://localhost:4430/enqueuer"
                                    },
                                    "method": "post",
                                    "headers": {
                                        "content-type": "application/json",
                                        "Content-Length": 23
                                    }
                                }
                            }
                        }
                    ],
                    "time": {
                        "startTime": "2018-11-02T17:19:26.162Z",
                        "endTime": "2018-11-02T17:19:26.213Z",
                        "totalTime": 51,
                        "timeout": 3000
                    }
                }]
        }
    },
    mutations: {
        addRequisition(state, parent) {
            const requisition = {
                id: generateId(),
                name: 'New Requisition',
                publishers: [],
                subscriptions: [],
                requisitions: [],
                component: "requisition"
            };
            if (parent !== null && parent !== undefined) {
                parent.requisitions.push(requisition);
                requisition.parent = parent;
            } else {
                state.requisitions.push(requisition);
            }
            state.sideBarSelectedItem = requisition.id;
        },
        addPublisher(state, parent) {
            const publisher = {
                id: generateId(),
                name: 'New Publisher',
                type: "HTTP",
                parent: parent,
                component: "publisher"
            };
            parent.publishers.push(publisher);
            state.sideBarSelectedItem = publisher.id;
        },
        addSubscription(state, parent) {
            const subscription = {
                id: generateId(),
                name: 'New Subscription',
                type: "HTTP",
                parent: parent,
                component: "subscription"
            };
            parent.subscriptions.push(subscription);
            state.sideBarSelectedItem = subscription.id;
        },
        deleteComponent(state, item) {
            if (state.sideBarSelectedItem === item.id) {
                state.sideBarSelectedItem = null;
            }
            if (item.parent) {
                item.parent.requisitions = item.parent.requisitions.filter(requisition => requisition.id !== item.id);
                item.parent.publishers = item.parent.publishers.filter(publisher => publisher.id !== item.id);
                item.parent.subscriptions = item.parent.subscriptions.filter(subscription => subscription.id !== item.id);
            } else {
                state.requisitions = state.requisitions.filter(requisition => requisition.id !== item.id);
            }
            if (item.subscriptions) {
                item.subscriptions = item.subscriptions.filter(subscription => subscription.id !== item.id);
            }
            if (item.publishers) {
                item.publishers = item.publishers.filter(publisher => publisher.id !== item.id);
            }
            if (item.requisitions) {
                item.requisitions = item.requisitions.filter(requisition => requisition.id !== item.id);
            }
        },
        sideBarItemSelected(state, item) {
            state.sideBarSelectedItem = item.id;
        }
    },
    actions: {}
})
