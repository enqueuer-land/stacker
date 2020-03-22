import store from '@/store'
import LZString from 'lz-string';
import {FileDialog} from '@/renderer/file-dialog';
import {PluginsLoader} from '@/plugins/plugins-loader';
import * as stageStore from '@/store/modules/stage.store';
import {ComponentTypes} from '@/components/component-types';
import {EnqueuerLogParser} from '@/components/enqueuer-log-parser';
import {RendererMessageCommunicator} from '@/renderer/renderer-message-communicator';

jest.mock('@/store');
jest.mock('@/renderer/file-dialog');
jest.mock('@/plugins/plugins-loader');
jest.mock('@/components/enqueuer-log-parser');
jest.mock('@/renderer/renderer-message-communicator');

describe('StageStore', () => {
    const getPluginsMock = jest.fn(() => ['plugin1']);
    // @ts-ignore
    PluginsLoader.mockImplementation(() => ({getPlugins: getPluginsMock, loadFileFromFileSystem: () => ''}));
    // @ts-ignore
    EnqueuerLogParser.mockImplementation(() => ({name: 'logParser'}));
    // @ts-ignore
    EnqueuerLogParser.generateLog.mockImplementation(() => 'parsed log');

    beforeEach(() => {
        getPluginsMock.mockClear();
    });

    it('namespaced should be true', () => {
        expect(stageStore.default().namespaced).toBeTruthy();
    });

    it('should initialize correctly', () => {
        expect(stageStore.default().state).toEqual({
            plugins: ['plugin1'],
            enqueuerLogParser: {
                name: 'logParser'
            },
            installingPluginModal: false,
        });
    });

    it('should get plugins correctly', () => {
        const state = {plugins: ['p1', 'p2']};
        expect(stageStore.default().getters.plugins(state)).toEqual(state.plugins);
    });

    it('should get enqueuer logs correctly', () => {
        const state = {
            enqueuerLogParser: {
                getLogs: () => ['l1', 'l2']
            }
        };
        expect(stageStore.default().getters.enqueuerLogs(state)).toEqual(state.enqueuerLogParser.getLogs());
    });

    it('should get current log level correctly', () => {
        const state = {
            enqueuerLogParser: {
                getPriorityFilterName: () => ['INFO']
            }
        };
        expect(stageStore.default().getters.currentLogLevel(state)).toEqual(state.enqueuerLogParser.getPriorityFilterName());
    });

    it('should get installingPluginModal correctly', () => {
        const state = {
            installingPluginModal: true
        };
        expect(stageStore.default().getters.installingPluginModal(state)).toBeTruthy();
    });

    it('should get requisition protocols list', () => {
        expect(stageStore.default().getters.protocolsOfComponentList({})(ComponentTypes.REQUISITION)).toEqual([]);
    });

    it('should get publisher protocols list', () => {
        const state = {
            plugins: {
                publishers: {
                    http: true,
                    mqtt: true,
                    amqp: true,
                }
            }
        };
        expect(stageStore.default().getters.protocolsOfComponentList(state)(ComponentTypes.PUBLISHER))
            .toEqual([
                {
                    value: 'HTTP'
                },
                {
                    value: 'MQTT'
                },
                {
                    value: 'AMQP'
                },
            ]);
    });

    it('should get subscription protocols list', () => {
        const state = {
            plugins: {
                subscriptions: {
                    http: true,
                    mqtt: true,
                    amqp: true,
                }
            }
        };
        expect(stageStore.default().getters.protocolsOfComponentList(state)(ComponentTypes.SUBSCRIPTION))
            .toEqual([
                {
                    value: 'HTTP'
                },
                {
                    value: 'MQTT'
                },
                {
                    value: 'AMQP'
                },
            ]);
    });

    it('should addEnqueuerLog', () => {
        const addLogsMock = jest.fn();

        const state = {
            enqueuerLogParser: {
                addLogs: addLogsMock
            }
        };
        stageStore.default().mutations.addEnqueuerLog(state, 'message');

        expect(addLogsMock).toHaveBeenCalledWith('message');
    });

    it('should add parsed log', () => {
        const addParsedLogsMock = jest.fn();

        const state = {
            enqueuerLogParser: {
                addParsedLogs: addParsedLogsMock
            }
        };
        stageStore.default().mutations.addLog(state, {message: 'message', level: 'INFO'});

        expect(addParsedLogsMock).toHaveBeenCalledWith('parsed log');
    });

    it('should clear log', () => {
        const clearBufferMock = jest.fn();

        const state = {
            enqueuerLogParser: {
                clearBuffer: clearBufferMock
            }
        };
        stageStore.default().mutations.clearLogs(state);

        expect(clearBufferMock).toHaveBeenCalled();
    });

    it('should increase log filter', () => {
        const increasePriorityFilterMock = jest.fn();

        const state = {
            enqueuerLogParser: {
                increasePriorityFilter: increasePriorityFilterMock
            }
        };
        stageStore.default().mutations.increaseLogFilterLevel(state);

        expect(increasePriorityFilterMock).toHaveBeenCalled();
    });

    it('should increase log filter', () => {
        const decreasePriorityFilterMock = jest.fn();

        const state = {
            enqueuerLogParser: {
                decreasePriorityFilter: decreasePriorityFilterMock
            }
        };
        stageStore.default().mutations.decreaseLogFilterLevel(state);

        expect(decreasePriorityFilterMock).toHaveBeenCalled();
    });

    it('should add installing modal', () => {
        const state = {
            installingPluginModal: false
        };
        stageStore.default().mutations.addInstallingPluginModal(state);

        expect(state.installingPluginModal).toBeTruthy();
    });

    it('should remove installing modal', () => {
        const state = {
            installingPluginModal: true
        };
        stageStore.default().mutations.removeInstallingPluginModal(state);

        expect(state.installingPluginModal).toBeFalsy();
    });

    it('should set plugins', () => {
        const state = {
            plugins: [true]
        };
        stageStore.default().mutations.setPlugins(state, [false, true]);

        expect(state.plugins).toEqual([false, true]);
    });

    it('should runCurrentlySelectedComponent', async () => {
        const dispatchMock = jest.fn(async () => {
        });
        store.getters['side-bar/selectedComponent'] = 'component';
        store.dispatch = dispatchMock;

        stageStore.default().mutations.runCurrentlySelectedComponent();

        expect(dispatchMock).toHaveBeenCalledWith('stage/runComponent', 'component');
    });

    it('should runHighestParentOfSelectedComponent', async () => {
        const dispatchMock = jest.fn(async () => {
        });
        const parent = {name: 'requisition', carabinaMeta: {}};
        store.getters['side-bar/selectedComponent'] = {name: 'publisher', carabinaMeta: {parent}};
        store.dispatch = dispatchMock;

        stageStore.default().mutations.runHighestParentOfSelectedComponent();

        expect(dispatchMock).toHaveBeenCalledWith('stage/runComponent', parent);
    });

    it('should run component action', async () => {
        const commitMock = jest.fn(async () => {
        });
        store.commit = commitMock;

        const component = {name: 'publisher', carabinaMeta: {type: ComponentTypes.PUBLISHER}} as any;
        const emitMock = jest.fn();
        // @ts-ignore
        RendererMessageCommunicator.emit.mockImplementationOnce(emitMock);

        await stageStore.default().actions.runComponent({}, component);

        const expected = {
            carabinaMeta: {
                collapsed: expect.any(Boolean),
                parent: undefined,
                selected: expect.any(Boolean),
                type: ComponentTypes.REQUISITION,
            },
            delay: 0,
            id: expect.any(String),
            ignore: false,
            iterations: 1,
            name: 'publisher',
            parallel: false,
            publishers: [
                {
                    carabinaMeta: {
                        type: ComponentTypes.PUBLISHER,
                    },
                    name: 'publisher',
                },
            ],
            requisitions: [],
            subscriptions: [],
            timeout: -1,
        };
        expect(emitMock).toHaveBeenCalledWith('runEnqueuer', expected);
        expect(commitMock).toHaveBeenCalledWith('result/runRequisition', expected);
    });

    it('should commit when receive enqueuer reply', async () => {
        const component = {name: 'publisher', carabinaMeta: {type: ComponentTypes.PUBLISHER}} as any;
        const onReplyMock = jest.fn((event, cb) => cb(event, LZString.compressToUTF16('true')));
        // @ts-ignore
        RendererMessageCommunicator.on.mockImplementationOnce(onReplyMock);
        const commitMock = jest.fn(async () => {
        });
        store.commit = commitMock;

        await stageStore.default().actions.runComponent({}, component);

        expect(commitMock).toHaveBeenLastCalledWith('result/responseReceived', true);
    });

    it('should not load plugin when no file is selected', async () => {
        // @ts-ignore
        FileDialog.showOpenDialog.mockImplementationOnce(() => []);

        const commitMock = jest.fn();
        const state = {commit: commitMock};
        await stageStore.default().actions.loadPlugins(state);

        expect(commitMock).not.toHaveBeenCalled();
    });

    it('should not load plugin when no file is selected', async () => {
        // @ts-ignore
        FileDialog.showOpenDialog.mockImplementationOnce(() => ['filename']);

        const emitMock = jest.fn();
        // @ts-ignore
        RendererMessageCommunicator.emit.mockImplementationOnce(emitMock);

        const commitMock = jest.fn();
        store.commit = commitMock;
        const state = {commit: commitMock};
        await stageStore.default().actions.loadPlugins(state);

        expect(commitMock).toHaveBeenCalledWith('stage/addInstallingPluginModal');
        expect(commitMock).toHaveBeenCalledWith('stage/removeInstallingPluginModal');
        expect(commitMock).toHaveBeenCalledWith('setPlugins', ['plugin1']);
        expect(emitMock).toHaveBeenCalledWith('restartEnqueuer');
    });
});
