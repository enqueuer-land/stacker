import Vue from 'vue';
import Vuex from 'vuex';
import ObjectDecycler from "./tests/object-decycler";
import ComponentManager from "./tests/component-manager";
// import {RequisitionRunner} from "enqueuer/js/requisition-runners/requisition-runner";
// import {ipcRenderer} from 'electron';
// import * as fs from 'fs';
// const fs = window.require('fs');
// const staticFsModule = require('./lib/fs');

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
        openFile(state, payload) {
            const fileRequisition = {
                    "timeout": 3000,
                    "name": "opened from file req",
                    "delay": 9090,
                    "iterations": 69,
                    "publishers": [
                        {
                            "timeout": 123,
                            "name": "opened from file pub",
                            "type": "http",
                            "url": "http://localhost:23068/basic",
                            "method": "POST",
                            "payload": "basic auth",
                            "headers": {
                                "content-type": "application/json"
                            },
                            "onMessageReceived": {
                                "assertions": [
                                    {
                                        "expect": "body",
                                        "toBeEqualTo": "`basic auth response`"
                                    }
                                ]
                            }
                        }
                    ],
                    "subscriptions": [
                        {
                            "name": "opened from file sub",
                            "type": "http",
                            "endpoint": "/basic",
                            "port": 23068,
                            "method": "POST",
                            "avoid": true,
                            "timeout": 10000,
                            "response": {
                                "headers": {
                                    "key": 123
                                },
                                "status": 200,
                                "payload": "basic auth response"
                            },
                            "onMessageReceived": {
                                "assertions": [
                                    {
                                        "name": "Payload",
                                        "expect": "message.body",
                                        "toBeEqualTo": "`basic auth`"
                                    }
                                ]
                            },
                            "onFinish": {
                                script: 'I am a script',
                                "assertions": [
                                    {
                                        "name": "Payload",
                                        "expect": "message.body",
                                        "toBeGreaterThan": "`basic auth`"
                                    }
                                ]
                            }
                        }
                    ]
                }
            ;
            const newComponent = new ComponentManager().createRequisition(fileRequisition);
            state.requisitions.push(newComponent);
            state.selectedItem = newComponent;
            payload.router.push({path: '/' + newComponent.component + '/' + newComponent.id});
        },
        addRequisition(state, payload) {
            const newComponent = new ComponentManager().createRequisition({}, payload.parent);
            if (payload.parent === undefined) {
                state.requisitions.push(newComponent);
            } else {
                newComponent.parent.requisitions.push(newComponent);
            }
            state.selectedItem = newComponent;
            payload.router.push({path: '/' + newComponent.component + '/' + newComponent.id});
        },
        addPublisher(state, payload) {
            const newComponent = new ComponentManager().createPublisher({}, payload.parent);
            state.selectedItem = newComponent;
            payload.parent.publishers.push(newComponent);
            payload.router.push({path: '/' + newComponent.component + '/' + newComponent.id});
        },
        addSubscription(state, payload) {
            const newComponent = new ComponentManager().createSubscription({}, payload.parent);
            state.selectedItem = newComponent;
            payload.parent.subscriptions.push(newComponent);
            payload.router.push({path: '/' + newComponent.component + '/' + newComponent.id});
        },
        deleteComponent(state, payload) {
            const item = payload.item;
            new ComponentManager().delete(item);
            if (state.selectedItem.id === item.id) {
                state.selectedItem = null;
            }
            if (item.parent === undefined) {
                state.requisitions = state.requisitions.filter(requisition => requisition.id !== item.id);
            }
            payload.router.push({path: '/'});
        },
        selectItem(state, payload) {
            const currentSelectedId = state.selectedItem ? state.selectedItem.id : null;
            console.log('Current item: ' + currentSelectedId + '; Selecting item: ' + payload.item.id);
            if (currentSelectedId !== payload.item.id) {
                state.selectedItem = payload.item;
                let newPath = '/' + payload.item.component + '/' + payload.item.id;
                console.log('Going to new path: ' + newPath);
                payload.router.push({path: newPath});
            }
        },
        selectItemById(state, payload) {
            const currentSelectedId = state.selectedItem ? state.selectedItem.id : null;
            console.log('Current item: ' + currentSelectedId + '; Selecting item: ' + payload.id);
            if (currentSelectedId !== payload.id) {


                const item = new ComponentManager().findItem(payload.id);
                if (item) {
                    state.selectedItem = item;
                    let newPath = '/' + item.component + '/' + payload.id;
                    console.log('Going to new path: ' + newPath);
                    payload.router.push({path: newPath});
                } else {
                    console.log('No item was find with: ' + payload.id);
                }

            }
        },
        setRequisitionResult(state, payload) {
            state.result = payload.report;
        }
    },
    actions: {
        runRequisition: function ({commit}, requisition) {
            console.log('Requisition to be ran: ' + JSON.stringify(new ObjectDecycler().decycle(requisition)));
            // console.log('File: ' + JSON.parse(fs.readFileSync('fileToOpen.json').toString()));
            // ipcRenderer.send('openFile', 'fileToOpen.json');

            // new RequisitionRunner(requisition, null).run()
            //     .then(report => {
            //         console.log('works')
            //         // commit('setRequisitionResult', {report: report});
            //     })
            //     .catch(err => {
            //        console.log(`Error running requisition: ${err}`);
            //     });
            //

            commit('setRequisitionResult', {
                report: {
                    "valid": true,
                    id: this.state.requisitions[0].id,
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
                            id: this.state.requisitions[0].subscriptions[0].id,
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
                            id: this.state.requisitions[0].publishers[0].id,
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
