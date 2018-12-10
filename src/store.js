import Vue from 'vue';
import Vuex from 'vuex';
import ComponentManager from "./tests/component-manager";
import ParentRemover from "./tests/parent-remover";
import IdReplacer from "./tests/id-replacer";
import MultipleObjectNotation from "./tests/multiple-object-notation";

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
                    icon: "cloud_upload",
                    click: (commit, item) => {
                        commit('saveRequisition', {item: item});
                    },
                },
                {
                    divider: true,
                },
                {
                    name: "Copy",
                    icon: "filter_none",
                    click: (commit, item, router) => {
                        commit('clipboardCopy', {item: item, router: router});
                    }
                },
                {
                    name: "Paste",
                    icon: "file_copy",
                    click: (commit, item, router) => {
                        commit('clipboardPaste', {item: item, router: router});
                    }
                },
                {
                    divider: true,
                },
                {
                    name: "Delete",
                    icon: "delete",
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
                    name: "Copy",
                    icon: "filter_none",
                    click: (commit, item, router) => {
                        commit('clipboardCopy', {item: item, router: router});
                    }
                },
                {
                    divider: true,
                },
                {
                    name: "Delete",
                    icon: "delete",
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
                    name: "Copy",
                    icon: "filter_none",
                    click: (commit, item, router) => {
                        commit('clipboardCopy', {item: item, router: router});
                    }
                },
                {
                    divider: true,
                },
                {
                    name: "Delete",
                    icon: "delete",
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
                defaultPath: payload.item.name + '.stk',
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
            // console.log('Current item: ' + currentSelectedId + '; Selecting item: ' + payload.item.id);
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
                    // console.log('Going to new path: ' + newPath);
                    payload.router.push({path: newPath});
                } else {
                    console.log('No item was find with: ' + payload.id);
                }

            }
        },
        setRequisitionResult(state, payload) {
            // console.log('Report added to history');
            state.results.push(payload.report);
        },
        clipboardCopy(state, payload) {
            state.clipboard = JSON.stringify(new IdReplacer().replace(new ParentRemover().remove(payload.item)), null, 2);
            if (state.clipboard) {
                electron.clipboard.writeText(txt);
            }
        },
        clipboardPaste(state, payload) {
            try {

                const clipboard = electron.clipboard.readText();
                const parsedClipboard = new MultipleObjectNotation().parse(clipboard);

                if (parsedClipboard) {
                    console.log('Pasted: ' + parsedClipboard.name);

                    const parent = payload ? payload.item : undefined;
                    switch (parsedClipboard.component) {
                        case 'requisition':
                            const newRequisition = new ComponentManager().createRequisition(parsedClipboard, parent);
                            if (parent === undefined) {
                                state.requisitions.push(newRequisition);
                            } else {
                                newRequisition.parent.requisitions.push(newRequisition);
                            }
                            state.selectedItem = newRequisition;
                            payload.router.push({path: '/' + newRequisition.component + '/' + newRequisition.id});
                            break;
                        case 'publisher':
                            if (parent) {
                                const newPublisher = new ComponentManager().createPublisher(parsedClipboard, payload.item);
                                state.selectedItem = newPublisher;
                                payload.item.publishers.push(newPublisher);
                                payload.router.push({path: '/' + newPublisher.component + '/' + newPublisher.id});
                            }
                            break;
                        case 'subscription':
                            if (parent) {
                                const newSubscription = new ComponentManager().createSubscription(parsedClipboard, payload.item);
                                state.selectedItem = newSubscription;
                                payload.item.subscriptions.push(newSubscription);
                                payload.router.push({path: '/' + newSubscription.component + '/' + newSubscription.id});
                            }
                            break;
                    }
                }
            } catch (e) {
                console.log(`Error pasting clipboard: ${e}`);
            }

        }
    },
    actions: {
        runRequisition: function ({commit}, requisition) {
            const decycle = new ParentRemover().remove(requisition);
            console.log('Requisition to be ran: ' + JSON.stringify(decycle, null, 2));
            window.ipcRenderer.send('runRequisition', decycle);

            window.ipcRenderer.once('runRequisitionReply', (event, report) => {
                console.log('Renderer got report!');
                commit('setRequisitionResult', {report: report});
            });

        }
    }
})
