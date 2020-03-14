import store from '@/store'
import {ipcRenderer} from 'electron';
import {InputRequisitionModel} from 'enqueuer';
import {IdCreator} from '@/components/id-creator';
import {PluginsLoader} from '@/plugins/plugins-loader';
import {ComponentTypes} from '@/components/component-types';
import {ComponentParent} from '@/components/component-parent';
import {ComponentDecycler} from '@/components/component-decycler';
import {EnqueuerLogParser} from '@/components/enqueuer-log-parser';

export function addLog(data: { message: string; level: string }) {
    store.commit('stage/addLog', data);
}

ipcRenderer.on('addLog', ((event, data) => addLog(data)));
ipcRenderer.on('loadPlugin', ((event, data) => store.dispatch('stage/loadPlugins', data)));
ipcRenderer.on('enqueuerLog', ((event, data) => store.commit('stage/addEnqueuerLog', data)));
ipcRenderer.on('runCurrentlySelectedComponent', (() => store.commit('stage/runCurrentlySelectedComponent')));
ipcRenderer.on('runHighestParentOfSelectedComponent', (() => store.commit('stage/runHighestParentOfSelectedComponent')));

function prepareRequisition(msg: any) {
    const componentName = msg.carabinaMeta.componentName;
    let decycled = new ComponentDecycler().decycle(msg);
    if (componentName === ComponentTypes.PUBLISHER) {
        decycled = {publishers: [decycled], name: decycled.name, id: new IdCreator().create()};
    } else if (componentName === ComponentTypes.SUBSCRIPTION) {
        decycled = {timeout: -1, subscriptions: [decycled], name: decycled.name, id: new IdCreator().create()};
    }
    return decycled;
}

export default {
    state: {
        plugins: new PluginsLoader().getPlugins(),
        enqueuerLogParser: new EnqueuerLogParser().setPriorityFilter('TRACE'),
        installingPluginModal: false,
    },
    mutations: {
        addEnqueuerLog: (stage: any, data: any) => {
            stage.enqueuerLogParser.addLogs(data);
        },
        addLog: (stage: any, data: any) => {
            stage.enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog(data.message, data.level));
        },
        addInstallingPluginModal: (stage: any) => {
            stage.installingPluginModal = true;
        },
        removeInstallingPluginModal: (stage: any) => {
            stage.installingPluginModal = false;
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
        loadPlugins: async ({state}: any) => {
            state.plugins = new PluginsLoader().loadPlugins();
        },
        runComponent: async (_: any, msg: InputRequisitionModel) => {
            const decycled = prepareRequisition(msg);
            store.commit('result/runRequisition', decycled);
            ipcRenderer.send('runEnqueuer', decycled);
            ipcRenderer.on('runEnqueuerReply', ((event, responses) => store.commit('result/updateResponse', responses)));
        },
    },
    getters: {
        plugins: (state: any) => state.plugins,
        enqueuerLogs: (state: any) => state.enqueuerLogParser.getLogs(),
        installingPluginModal: (state: any) => state.installingPluginModal,
        environments: (state: any) => state.environments,
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
    namespaced: true
};
