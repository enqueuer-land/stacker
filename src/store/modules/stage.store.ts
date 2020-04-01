import store from '@/store'
import LZString from 'lz-string';
import {Logger} from '@/components/logger';
import {FileDialog} from '@/renderer/file-dialog';
import {PluginsLoader} from '@/plugins/plugins-loader';
import {ComponentTypes} from '@/components/component-types';
import {ComponentParent} from '@/components/component-parent';
import {CarabinaComponent} from '@/models/carabina-component';
import {CarabinaPublisher} from '@/models/carabina-publisher';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {EnqueuerLogParser} from '@/components/enqueuer-log-parser';
import {CarabinaSubscription} from '@/models/carabina-subscription';
import {RequisitionWrapperCreator} from '@/components/requisition-wrapper-creator';
import {RendererMessageCommunicator} from '@/renderer/renderer-message-communicator';

const pluginsLoader = new PluginsLoader();
export default () => ({
    state: {
        plugins: pluginsLoader.getPlugins(),
        pluginsNames: pluginsLoader.getPluginsNames(),
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
        updatePluginsList: (stage: any) => {
            stage.plugins = pluginsLoader.getPlugins();
            stage.pluginsNames = pluginsLoader.getPluginsNames();
            RendererMessageCommunicator.emit('restartEnqueuer');
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
            await pluginsLoader.loadPlugin(plugin.javascript);
            commit('updatePluginsList');
        },
        removePlugin: async ({commit}: any, plugin: any) => {
            await pluginsLoader.removePlugin(plugin.javascript);
            commit('updatePluginsList');
        },
        loadPluginsFromFileSystem: async ({commit}: any) => {
            const pickedFiles = await FileDialog.showOpenDialog();
            if (pickedFiles.length > 0) {
                try {
                    await Promise.all(pickedFiles.map(async file => await pluginsLoader.loadFileFromFileSystem(file)));
                    commit('updatePluginsList');
                } catch (e) {
                    Logger.error(e);
                }
            }
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
        pluginsNames: (state: any) => state.pluginsNames,
        pluginManagerModal: (state: any) => state.pluginManagerModal,
        enqueuerLogs: (state: any) => state.enqueuerLogParser.getLogs(),
        currentLogLevel: (state: any) => state.enqueuerLogParser.getPriorityFilterName(),
        installingPluginModal: (state: any) => state.installingPluginModal,
        protocolsOfComponentList: (state: any) => (componentType: ComponentTypes): any[] => {
            switch (componentType) {
                case ComponentTypes.PUBLISHER:
                    return Object.keys(state.plugins.publishers).map((key: string) => ({value: key.toUpperCase()}));
                case ComponentTypes.SUBSCRIPTION:
                    return Object.keys(state.plugins.subscriptions).map((key: string) => ({value: key.toUpperCase()}));
            }
            return [];
        },
        componentHelpUrl: (state: any) => (component: CarabinaPublisher | CarabinaSubscription): string => {
            switch (component.carabinaMeta.type) {
                case ComponentTypes.PUBLISHER:
                    return state.plugins.publishers[component.type.toLowerCase()].urlHelp;
                case ComponentTypes.SUBSCRIPTION:
                    return state.plugins.subscriptions[component.type.toLowerCase()].urlHelp;
            }
            return '';
        },
    },
    namespaced: true,
});
