import store from '@/store'
import LZString from 'lz-string';
import {PluginsLoader} from '@/plugins/plugins-loader';
import {ComponentTypes} from '@/components/component-types';
import {ComponentParent} from '@/components/component-parent';
import {CarabinaComponent} from '@/models/carabina-component';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {EnqueuerLogParser} from '@/components/enqueuer-log-parser';
import {RequisitionWrapperCreator} from '@/components/requisition-wrapper-creator';
import {RendererMessageCommunicator} from '@/renderer/renderer-message-communicator';

export default () => ({
    state: {
        plugins: PluginsLoader.getInstance().getPlugins(),
        enqueuerLogParser: new EnqueuerLogParser(600, 'INFO'),
        pluginManagerModal: false,
    },
    mutations: {
        addEnqueuerLog: (stage: any, data: any) => {
            stage.enqueuerLogParser.addLogs(data);
        },
        addLog: (stage: any, data: any) => {
            stage.enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog(data.message, data.level));
        },
        clearLogs: (stage: any) => {
            stage.enqueuerLogParser.clearBuffer();
        },
        increaseLogFilterLevel: (stage: any) => {
            stage.enqueuerLogParser.increasePriorityFilter();
        },
        decreaseLogFilterLevel: (stage: any) => {
            stage.enqueuerLogParser.decreasePriorityFilter();
        },
        setPluginManagerModalVisibility: (stage: any, visibility: boolean) => {
            stage.pluginManagerModal = visibility;
        },
        setPlugins: (stage: any, data: any) => {
            stage.plugins = data;
        },
        runCurrentlySelectedComponent: () => {
            const selectedComponent = store.getters['side-bar/selectedComponent'];
            store.dispatch('stage/runComponent', selectedComponent)
                .then(() => {/* do nothing */
                });
        },
        runHighestParentOfSelectedComponent: () => {
            const selectedComponent = store.getters['side-bar/selectedComponent'];
            const highestParent = new ComponentParent(selectedComponent).findHighestParent();
            store.dispatch('stage/runComponent', highestParent)
                .then(() => {/* do nothing */
                });
        }
    },
    actions: {
        loadPlugin: async ({commit}: any, plugin: any) => {
            const pluginsLoader = PluginsLoader.getInstance();
            await pluginsLoader.loadPlugin(plugin.javascript);
            pluginsLoader.addInstalledPlugin(plugin);
            commit('setPlugins', pluginsLoader.getPlugins());
        },
        runComponent: async (_: any, component: CarabinaComponent) => {
            const decycled: CarabinaRequisition = new RequisitionWrapperCreator(component).create();
            store.commit('result/runRequisition', decycled);
            RendererMessageCommunicator.emit('runEnqueuer', decycled);
            RendererMessageCommunicator.on('runEnqueuerReply', ((event, responses) => {
                const decompress = JSON.parse(LZString.decompressFromUTF16(responses));
                store.commit('result/responseReceived', decompress);
            }));
        },
    },
    getters: {
        plugins: (state: any) => state.plugins,
        pluginManagerModal: (state: any) => state.pluginManagerModal,
        enqueuerLogs: (state: any) => state.enqueuerLogParser.getLogs(),
        currentLogLevel: (state: any) => state.enqueuerLogParser.getPriorityFilterName(),
        installingPluginModal: (state: any) => state.installingPluginModal,
        protocolsOfComponentList: (state: any) => (componentType: ComponentTypes) => {
            switch (componentType) {
                case ComponentTypes.PUBLISHER:
                    return Object.keys(state.plugins.publishers).map((publisherKey: string) => ({value: publisherKey.toUpperCase()}));
                case ComponentTypes.SUBSCRIPTION:
                    return Object.keys(state.plugins.subscriptions).map((subscriptionKey: string) => ({value: subscriptionKey.toUpperCase()}));
            }
            return [];
        },
    },
    namespaced: true,
});
