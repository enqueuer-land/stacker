import Vue from 'vue';
import Vuex from 'vuex';
import {generateId} from './tests/id-generator';
import ObjectDecycler from "./tests/object-decycler";
// import {RequisitionRunner} from "enqueuer/js/requisition-runners/requisition-runner";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        result: null,
        selectedItem: null,
        requisitions: [],
        requisition: {
            sideBarOptions: [
                {
                    name: "Save",
                    click: (commit, item) => {
                        commit('saveRequisition', {item: item});
                    }
                },
                {
                    name: "Expand",
                    click: (commit, item) => {
                        commit('expandRequisition', {item: item});
                    }
                },
                {
                    name: null,
                    click: () => null
                },
                {
                    name: "Add requisition",
                    click: (commit, item, router) => {
                        commit('addRequisition', {parent: item, router: router});
                    }
                },
                {
                    name: "Add publisher",
                    click: (commit, item, router) => {
                        commit('addPublisher', {parent: item, router: router});
                    }
                },
                {
                    name: "Add subscription",
                    click: (commit, item, router) => {
                        commit('addSubscription', {parent: item, router: router});
                    }
                },
                {
                    name: null,
                    click: () => null
                },
                {
                    name: "Delete",
                    click: (commit, item, router) => {
                        console.log('Deleting requisition: ' + commit);
                        commit('deleteComponent', {item: item, router: router});
                    }
                },
            ],
            tabs: [
                {
                    name: 'General',
                    path: 'general'
                },
                {
                    name: 'On Initialization',
                    path: 'onInit'
                },
                {
                    name: 'On Finish',
                    path: 'onFinish'
                },
            ]
        },
        publisher: {
            sideBarOptions: [
                {
                    name: "Delete",
                    click: (commit, item, router) => {
                        console.log('Deleting requisition: ' + commit);
                        commit('deleteComponent', {item: item, router: router});
                    }
                }
            ],
            protocols: {
                http: {sync: true},
                amqp: {}
            },
            syncTab: {
                name: 'On Message Received',
                path: 'onMessageReceived',
            },
            tabs: [
                {
                    name: 'On Initialization',
                    path: 'onInit'
                },
                {
                    name: 'On Finish',
                    path: 'onFinish'
                },
            ]
        },
        subscription: {
            sideBarOptions: [
                {
                    name: "Delete",
                    click: (commit, item, router) => {
                        console.log('Deleting requisition: ' + commit);
                        commit('deleteComponent', {item: item, router: router});
                    }
                }
            ],
            protocols: {
                http: {},
                amqp: {}
            },
            tabs: [
                {
                    name: 'On Initialization',
                    path: 'onInit'
                },
                {
                    name: 'On Message Received',
                    path: 'onMessageReceived'
                },
                {
                    name: 'On Finish',
                    path: 'onFinish'
                },
            ]
        },
        assertions: [
            {
                label: 'Expect',
                name: 'expect',
                criteria: [
                    {
                        name: 'toBeEqualTo',
                        label: 'to be',
                    },
                    {
                        name: 'toBeGreaterThanOrEqualTo',
                        label: 'to be greater than or equal to',
                    },
                    {
                        name: 'toBeGreaterThan',
                        label: 'to be greater than',
                    },
                    {
                        name: 'toBeLessThanOrEqualTo',
                        label: 'to be less than or equal to',
                    },
                    {
                        name: 'toBeLessThan',
                        label: 'to be less than',
                    },
                    {
                        name: 'toContain',
                        label: 'to contain',
                    }
                ]
            },
            {
                label: 'Expect to be defined',
                name: 'expectToBeDefined',
                criteria: []
            },
            {
                label: 'Expect to be truthy',
                name: 'expectToBeTruthy',
                criteria: []
            },
            {
                label: 'Expect to be falsy',
                name: 'expectToBeFalsy',
                criteria: []
            },
            {
                label: 'Expect to be defined',
                name: 'expectToBeDefined',
                criteria: []
            },
            {
                label: 'Expect to be undefined',
                name: 'expectToBeUndefined',
                criteria: []
            }
        ],

    },
    mutations: {
        addRequisition(state, payload) {
            const newComponent = {
                id: generateId(),
                name: 'New Requisition',
                publishers: [],
                subscriptions: [],
                requisitions: [],
                component: "requisition"
            };
            if (payload.parent !== null && payload.parent !== undefined) {
                payload.parent.requisitions.push(newComponent);
                newComponent.parent = payload.parent;
            } else {
                state.requisitions.push(newComponent);
            }
            state.selectedItem = newComponent;
            payload.router.push({path: '/' + newComponent.component + '/' + newComponent.id});
        },
        addPublisher(state, payload) {
            const newComponent = {
                id: generateId(),
                name: 'New Publisher',
                type: "HTTP",
                parent: payload.parent,
                component: "publisher"
            };
            payload.parent.publishers.push(newComponent);
            state.selectedItem = newComponent;
            payload.router.push({path: '/' + newComponent.component + '/' + newComponent.id});
        },
        addSubscription(state, payload) {
            const newComponent = {
                id: generateId(),
                name: 'New Subscription',
                type: "HTTP",
                parent: payload.parent,
                component: "subscription"
            };
            payload.parent.subscriptions.push(newComponent);
            state.selectedItem = newComponent;
            payload.router.push({path: '/' + newComponent.component + '/' + newComponent.id});
        },
        deleteComponent(state, payload) {
            const item = payload.item;
            if (state.selectedItem.id === item.id) {
                state.selectedItem = null;
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
            payload.router.push({path: '/'});
        },
        selectItem(state, payload) {
            const currentSelectedId = state.selectedItem ? state.selectedItem.id : null;
            console.log('Selecting item: ' + currentSelectedId);
            if (currentSelectedId !== payload.item.id) {
                state.selectedItem = payload.item;
                let newPath = '/' + payload.item.component + '/' + payload.item.id;
                console.log('Going to new path: ' + newPath);
                payload.router.push({path: newPath});
            }
        },
        setRequisitionResult(state, payload) {
            state.result = payload.report;
        }
    },
    actions: {
        runRequisition: function ({commit}, requisition) {
            console.log('Requisition to be ran: ' + JSON.stringify(new ObjectDecycler().decycle(requisition)));
            // new RequisitionRunner(requisition, null).run()
            //     .then(report => {
            //         commit('setRequisitionResult', {report: report});
            //     })
            //     .catch(err => {
            //        console.log(`Error running requisition: ${err}`);
            //     });


            commit('setRequisitionResult', {
                report: {
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
                            ]
                        }
                    ],
                    "time": {
                        "startTime": "2018-11-02T17:19:26.162Z",
                        "endTime": "2018-11-02T17:19:26.213Z",
                        "totalTime": 51,
                        "timeout": 3000
                    }
                }
            });

        }
    }
})
