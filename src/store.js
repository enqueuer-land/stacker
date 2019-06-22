import Vue from 'vue';
import Vuex from 'vuex';
import ComponentManager from "./tests/component-manager";
import ParentRemover from "./tests/parent-remover";
import IdReplacer from "./tests/id-replacer";
import MultipleObjectNotation from "./tests/multiple-object-notation";
import router from './router'
import StageHeader from "./components/stage/StageHeader";
import {stageBodyPropsBuilder, stageHeaderPropsBuilder} from "./router-props-builder";
import DotStackerDirectory from "./tests/dot-stacker-directory";

const EventEmitter = require('events');

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        results: [],
        filter: '',
        resultFilter: {
            string: '',
            showPassingTests: true,
            showFailingTests: true,
            showIgnored: false
        },
        eventEmitter: new EventEmitter(),
        selectedItem: null,
        requisitions: [],
        requisition: {
            sideBarOptions: [
                {
                    name: "Save",
                    icon: "cloud_upload",
                    click: (payload) => {
                        payload.commit('saveRequisition', payload);
                    }
                },
                {
                    divider: true,
                },
                {
                    name: "Copy",
                    icon: "filter_none",
                    click: (payload) => {
                        payload.commit('clipboardCopy', payload);
                    }
                },
                {
                    name: "Paste",
                    icon: "file_copy",
                    isEnabled(item) {
                        return new ComponentManager().isAbleToBePastedIn(item);
                    },
                    click: (payload) => {
                        payload.commit('clipboardPaste', payload);
                    }
                },
                {
                    divider: true,
                },
                {
                    name: "Collapse",
                    icon: "unfold_less",
                    click: (payload) => {
                        payload.commit('collapseRequisition', payload);
                    }
                },
                {
                    name: "Expand",
                    icon: "unfold_more",
                    click: (payload) => {
                        payload.commit('expandRequisition', payload);
                    }
                },
                {
                    divider: true,
                },
                {
                    name: "Ignore",
                    icon: "error_outline", //"report_off",//"not_interested",
                    toggle: {
                        name: 'ignore',
                        color: 'var(--ignored-test-color)'
                    },
                    click: (payload) => {
                        payload.store.state.eventEmitter.emit('ignoreComponent', payload.item);
                        payload.commit('ignoreComponent', payload);
                    }
                },
                {
                    name: "Delete",
                    icon: "delete",
                    click: (payload) => {
                        payload.commit('deleteComponent', payload);
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
                    click: (payload) => {
                        payload.commit('clipboardCopy', payload);
                    }
                },
                {
                    divider: true,
                },
                {
                    name: "Ignore",
                    icon: "error_outline",
                    toggle: {
                        name: 'ignore',
                        color: 'var(--ignore-test-color)'
                    },
                    click: (payload) => {
                        payload.store.state.eventEmitter.emit('ignoreComponent', payload.item);
                        payload.commit('ignoreComponent', payload);
                    }
                },
                {
                    name: "Delete",
                    icon: "delete",
                    click: (payload) => {
                        payload.commit('deleteComponent', payload);
                    }
                }
            ],
            protocols: [],
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
                    click: (payload) => {
                        payload.commit('clipboardCopy', payload);
                    }
                },
                {
                    divider: true,
                },
                {
                    name: "Ignore",
                    icon: "error_outline", //"report, not_interested",
                    toggle: {
                        name: 'ignore',
                        color: 'var(--ignored-test-color)'
                    },
                    click: (payload) => {
                        payload.store.state.eventEmitter.emit('ignoreComponent', payload.item);
                        payload.commit('ignoreComponent', payload);
                    }
                },
                {
                    name: "Delete",
                    icon: "delete",
                    click: (payload) => {
                        payload.commit('deleteComponent', payload);
                    }
                }
            ],
            protocols: [],
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
        addPublisherProtocol(state, payload) {
            state.publisher.protocols.push(payload);
            router.addRoutes([{
                path: "/publisher/:id",
                component: StageHeader,
                props: (route) => stageHeaderPropsBuilder(route, state),
                children: [{
                    component: payload.module,
                    path: payload.type.toLowerCase(),
                    props: (route) => stageBodyPropsBuilder(route, state),

                }]
            }]);

        },
        addSubscriptionProtocol(state, payload) {
            state.subscription.protocols.push(payload);
            router.addRoutes([{
                path: "/subscription/:id",
                component: StageHeader,
                props: (route) => stageHeaderPropsBuilder(route, state),
                children: [{
                    component: payload.module,
                    path: payload.type.toLowerCase(),
                    props: (route) => stageBodyPropsBuilder(route, state),

                }]
            }]);
        },
        saveRequisition(state, payload) {
            window.remote.dialog.showSaveDialog({
                defaultPath: payload.item.name + '.stk',
                showsTagField: false,
            }, (filename) => {
                if (filename) {
                    new ComponentManager().saveFile(filename, payload.item);
                }
            })
        },
        exportResponse(state, response) {
            window.remote.dialog.showSaveDialog({
                defaultPath: response.name + '.res.stk',
                showsTagField: false,
            }, (filename) => {
                if (filename) {
                    new ComponentManager().saveFile(filename, response);
                }
            })
        },
        createDotStackerDirectory(state, payload) {
            new DotStackerDirectory(payload.homeDirectory).copyExamplesFile(payload.asarDirectory);
        },
        quit(state, payload) {
            console.log('quit');
            new DotStackerDirectory(payload.homeDirectory).saveRequisitions(state.requisitions);
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
        openLastOpenedRequisitions(state, payload) {
            const requisitions = new DotStackerDirectory(payload.homeDirectory).openRequisitions();
            if (requisitions.length > 0) {
                state.requisitions = state.requisitions.concat(requisitions);
                const last = requisitions[requisitions.length - 1];
                state.selectedItem = last;
                payload.router.push({path: '/' + last.component + '/' + last.id});
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
            const parent = item.parent;
            new ComponentManager().delete(item);
            if (state.selectedItem && state.selectedItem.id === item.id) {
                state.selectedItem = null;
            }
            if (item.parent === undefined) {
                state.requisitions = state.requisitions.filter(requisition => requisition.id !== item.id);
            }
            if (parent) {
                state.selectedItem = parent;
                payload.router.push({path: '/' + parent.component + '/' + parent.id});
            } else {
                payload.router.push({path: '/'});
            }
        },
        ignoreComponent(state, payload) {
            payload.item.ignore = !payload.item.ignore;
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
            state.eventEmitter.emit('requisitionReport', payload.reports, payload.requisition);
            state.results.push(payload.reports);
        },
        clearResult(state) {
            state.eventEmitter.emit('clearResult');
        },
        clipboardCopy(state, payload) {
            const stringifiedElement = JSON.stringify(new IdReplacer().replace(new ParentRemover().remove(payload.item)), null, 2);
            electron.clipboard.writeText(stringifiedElement);
        },
        clipboardPaste(state, payload) {
            try {
                const clipboard = electron.clipboard.readText();
                const parsedClipboard = new MultipleObjectNotation().parse(clipboard);

                if (parsedClipboard) {
                    console.log('Pasted: ' + parsedClipboard.name);

                    const parent = payload ? payload.item : undefined;
                    delete parsedClipboard.id;
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

        },
        collapseRequisition(state, payload) {
            state.eventEmitter.emit('collapseRequisition', payload);
        },
        expandRequisition(state, payload) {
            state.eventEmitter.emit('expandRequisition', payload);
        },
        clearRequisitions(state, payload) {
            state.requisitions.forEach(requisition => new ComponentManager().delete(requisition));
            state.requisitions = [];

            state.selectedItem = null;
            payload.router.push({path: '/'});
        }
    },
    actions: {
        runRequisition: function ({state, commit}, requisition) {
            state.eventEmitter.emit('statusInformation', `Running requisition '${requisition.name}'`);
            const decycle = new ParentRemover().remove(requisition);
            console.log('Requisition to be ran: ' + JSON.stringify(decycle, null, 2));
            window.ipcRenderer.send('runRequisition', decycle);

            window.ipcRenderer.once('runRequisitionReply', (event, reports) => {
                state.eventEmitter.emit('statusInformation', `Report of requisition '${requisition.name}'`);
                console.log('Renderer got report!');
                commit('setRequisitionResult', {reports, requisition});
            });

        }
    }
});
