import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const generateId = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = 'id';

    for (let i = 20; i > 0; --i) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

};

export default new Vuex.Store({
    state: {
        requisitions: [
            {
                id: generateId(),
                name: 'first',
                publishers: [
                    {
                        id: generateId(),
                        name: 'leaf p01',
                        type: "HTTP"
                    },
                    {
                        id: generateId(),
                        name: 'leaf p02',
                        type: "AMQP"
                    }
                ],
                subscriptions: [
                    {
                        id: generateId(),
                        name: 'leaf s01',
                        type: "ZEROMQ"
                    },
                    {
                        id: generateId(),
                        name: 'leaf s02',
                        type: "KAFKA"
                    }
                ],
                requisitions: [
                    {
                        id: generateId(),
                        name: 'first-first',
                        publishers: [
                            {
                                id: generateId(),
                                name: 'leaf p11',
                                type: "HTTP"
                            }
                        ],
                        subscriptions: [
                            {
                                id: generateId(),
                                name: 'leaf s11',
                                type: "AMQP"
                            },
                            {
                                id: generateId(),
                                name: 'leaf s12',
                                type: "SQS"
                            }
                        ]
                    },
                    {
                        id: generateId(),
                        name: 'first-second',
                        publishers: [
                            {
                                id: generateId(),
                                name: 'leaf p21',
                                type: "AMQP"
                            },
                            {
                                id: generateId(),
                                name: 'leaf p22',
                                type: "MQTT"
                            }
                        ],
                        subscriptions: [
                            {
                                id: generateId(),
                                name: 'leaf s21',
                                type: "ZEROMQ"
                            },
                            {
                                id: generateId(),
                                name: 'leaf s22',
                                type: "SQS"
                            }
                        ]
                    }
                ]
            },
            {
                id: generateId(),
                name: 'second',
                publishers: [
                    {
                        id: generateId(),
                        name: 'leaf p01',
                        type: "HTTP"
                    },
                    {
                        id: generateId(),
                        name: 'leaf p02',
                        type: "AMQP"
                    }
                ],
                subscriptions: [
                    {
                        id: generateId(),
                        name: 'leaf s01',
                        type: "ZEROMQ"
                    },
                    {
                        id: generateId(),
                        name: 'leaf s02',
                        type: "KAFKA"
                    }
                ],
                requisitions: [
                    {
                        id: generateId(),
                        name: 'first-first',
                        publishers: [
                            {
                                id: generateId(),
                                name: 'leaf p11',
                                type: "HTTP"
                            }
                        ],
                        subscriptions: [
                            {
                                id: generateId(),
                                name: 'leaf s11',
                                type: "AMQP"
                            },
                            {
                                id: generateId(),
                                name: 'leaf s12',
                                type: "SQS"
                            }
                        ]
                    },
                    {
                        id: generateId(),
                        name: 'first-second',
                        publishers: [
                            {
                                id: generateId(),
                                name: 'leaf p21',
                                type: "AMQP"
                            },
                            {
                                id: generateId(),
                                name: 'leaf p22',
                                type: "MQTT"
                            }
                        ],
                        subscriptions: [
                            {
                                id: generateId(),
                                name: 'leaf s21',
                                type: "ZEROMQ"
                            },
                            {
                                id: generateId(),
                                name: 'leaf s22',
                                type: "SQS"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    mutations: {},
    actions: {}
})
