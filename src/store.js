import Vue from 'vue';
import Vuex from 'vuex';
import ObjectDecycler from "./tests/object-decycler";
import ComponentManager from "./tests/component-manager";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        results: [],
        filter: '',
        resultFilter: {
            string: '',
            showPassingTests: true,
            showFailingTests: true,
        },
        selectedItem: null,
        requisitions: [],
        requisition: {
            sideBarOptions: [
                {
                    name: "Save",
                    disabled: false,
                    click: (commit, item) => {
                        commit('saveRequisition', {item: item});
                    }
                },
                // {
                //     name: "Expand",
                //     click: (commit, item) => {
                //         commit('expandRequisition', {item: item});
                //     }
                // },
                {
                    divider: true,
                    name: null,
                    click: () => null
                },
                {
                    header: true,
                    name: "Create",
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
                    divider: true,
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
            getEvents() {
                return [
                    {
                        label: 'On Initialization',
                        name: 'onInit'
                    },
                    {
                        label: 'On Finish',
                        name: 'onFinish'
                    },
                ]
            }
        },
        publisher: {
            sideBarOptions: [
                {
                    name: "Delete",
                    click: (commit, item, router) => {
                        commit('deleteComponent', {item: item, router: router});
                    }
                }
            ],
            protocols: {
                http: {
                    sync: true,
                },
                amqp: {},
                mqtt: {},
            },
            getEvents(protocol) {
                let syncEvent = {
                    label: 'On Message Received',
                    name: 'onMessageReceived'
                };
                let events = [
                    {
                        label: 'On Initialization',
                        name: 'onInit'
                    },
                    {
                        label: 'On Finish',
                        name: 'onFinish'
                    },
                ];
                if (protocol && protocol.sync) {
                    events.splice(1, 0, syncEvent);
                }
                return events
            }
        },
        subscription: {
            sideBarOptions: [
                {
                    name: "Delete",
                    click: (commit, item, router) => {
                        commit('deleteComponent', {item: item, router: router});
                    }
                }
            ],
            protocols: {
                http: {},
                amqp: {},
                mqtt: {},
            },
            getEvents() {
                return [
                    {
                        label: 'On Initialization',
                        name: 'onInit'
                    },
                    {
                        label: 'On Message Received',
                        name: 'onMessageReceived'
                    },
                    {
                        label: 'On Finish',
                        name: 'onFinish'
                    },
                ]
            }
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
        saveRequisition(state, payload) {
            window.remote.dialog.showSaveDialog({
                defaultPath: payload.item.name + '.stk.json',
                showsTagField: false,
            }, (filename) => {
                if (filename) {
                    new ComponentManager().saveRequisitionFile(filename, payload.item);
                }
            })
        },
        changeResultFilter(state, value) {
            state.resultFilter = value;
        },
        changeFilter(state, value) {
            state.filter = value;
        },
        openRequisitionFile(state, payload) {
            const newComponent = new ComponentManager().openRequisitionFile(payload.file);
            if (Array.isArray(newComponent) && newComponent.length > 0) {
                state.requisitions = state.requisitions.concat(newComponent);
                const item = newComponent[newComponent.length - 1];
                state.selectedItem = item;
                payload.router.push({path: '/' + item.component + '/' + item.id});
            } else if (newComponent) {
                state.requisitions.push(newComponent);
                state.selectedItem = newComponent;
                payload.router.push({path: '/' + newComponent.component + '/' + newComponent.id});
            }
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
            if (state.selectedItem && state.selectedItem.id === item.id) {
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
                payload.router.push({path: newPath});
            }
        },
        selectItemById(state, payload) {
            const currentSelectedId = state.selectedItem ? state.selectedItem.id : null;
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
            state.results.push(payload.report);
        }
    },
    actions: {
        runRequisition: function ({commit}, requisition) {
            const decycle = new ObjectDecycler().decycle(requisition);
            console.log('Requisition to be ran: ' + JSON.stringify(decycle, null, 2).substr(0, 1000));
            window.ipcRenderer.send('runRequisition', decycle);

            window.ipcRenderer.once('runRequisitionReply', (event, report) => {
                console.log('Renderer got report: ' + JSON.stringify(report, null, 2).substr(0, 200));
                commit('setRequisitionResult', {report: report});
            });

        }
    }
})
