import store from '@/store'
import {remote} from 'electron';
import {InputRequisitionModel} from 'enqueuer';
import {IdCreator} from '@/components/id-creator';
import {PluginsLoader} from "@/plugins/plugins-loader";
import {ComponentTypes} from '@/components/component-types';
import {ComponentDecycler} from "@/components/component-decycler";
import {EnqueuerLogParser} from "@/components/enqueuer-log-parser";

remote.getGlobal('eventEmitter').on('loadPlugin', () => store.dispatch('stage/loadPlugins'));
remote.getGlobal('eventEmitter').on('enqueuerLog', (data: any) => store.commit('stage/addEnqueuerLog', {raw: data}));
// remote.getGlobal('eventEmitter').on('enqueuerError', (data: any) => store.commit('stage/addEnqueuerLog', data));
// remote.getGlobal('eventEmitter').on('messageReceivedFromEnqueuer', (data: any) => console.log(data));

function prepareRequisition(msg: any) {
    const componentName = msg.carabinaMeta.componentName;
    let decycled = new ComponentDecycler().decycle(msg);
    if (componentName === ComponentTypes.PUBLISHER) {
        decycled = {publishers: [decycled], name: decycled.name, id: new IdCreator().create()};
    } else if (componentName === ComponentTypes.SUBSCRIPTION) {
        decycled = {timeout: -1, subscriptions: [decycled], name: decycled.name, id: new IdCreator().create()};
    }
    const selectedEnvironment = store.getters['nav-bar/selectedEnvironment'];
    if (selectedEnvironment && selectedEnvironment.store) {
        if (decycled.onInit) {
            decycled.onInit.store = {
                ...selectedEnvironment.store,
                ...decycled.onInit.store
            };
        } else {
            decycled.onInit = {
                store: selectedEnvironment.store
            };
        }
    }
    return decycled;
}

export default {
    state: {
        plugins: new PluginsLoader().getPlugins(),
        enqueuerLogParser: new EnqueuerLogParser(),
        installingPluginModal: false,
    },
    mutations: {
        addEnqueuerLog: (stage: any, data: any) => {
            if (data.raw) {
                stage.enqueuerLogParser.addLogs(data.raw);
            } else if (data.parsed) {
                stage.enqueuerLogParser.addParsedLogs(data.parsed);
            }
        },
        addInstallingPluginModal: (stage: any) => {
            stage.installingPluginModal = true;
        },
        removeInstallingPluginModal: (stage: any) => {
            stage.installingPluginModal = false;
        },
    },
    actions: {
        loadPlugins: async ({state}: any) => {
            state.plugins = new PluginsLoader().loadPlugins();
        },
        runComponent: async (_: any, msg: InputRequisitionModel) => {
            const decycled = prepareRequisition(msg);
            store.commit('result/runRequisition', decycled);
            remote.getGlobal('eventEmitter').emit('runEnqueuer', decycled);
            remote.getGlobal('eventEmitter').once('runEnqueuerReply', (responses: any) => store.commit('result/updateResponse', responses));
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
                    return Object.keys(state.plugins.publishers).map((publisherKey: any) => ({value: publisherKey.toUpperCase()}));
                case ComponentTypes.SUBSCRIPTION:
                    return Object.keys(state.plugins.subscriptions).map((subscriptionKey: any) => ({value: subscriptionKey.toUpperCase()}));
            }
            return [];
        },
    },
    namespaced: true
};
