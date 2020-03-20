import store from '@/store'
import LZString from 'lz-string';
import {FileDialog} from '@/components/file-dialog';
import {ComponentTypes} from '@/components/component-types';
import {ComponentLoader} from '@/components/component-loader';
import {EnvironmentLoader} from '@/environments/environment-loader';
import {RendererMessageCommunicator} from '@/components/renderer-message-communicator';
import {Logger} from "@/components/logger";

// stage
RendererMessageCommunicator.on('addLog', ((event, data) => store.commit('stage/addLog', data)));

RendererMessageCommunicator.on('loadPlugin', ((event, data) => store.dispatch('stage/loadPlugins', data)));

RendererMessageCommunicator.on('enqueuerLog', ((event, data) => {
    const decompress = LZString.decompressFromUTF16(data);
    store.commit('stage/addEnqueuerLog', decompress);
}));

RendererMessageCommunicator.on('runCurrentlySelectedComponent', (() => store.commit('stage/runCurrentlySelectedComponent')));

RendererMessageCommunicator.on('runHighestParentOfSelectedComponent', (() => store.commit('stage/runHighestParentOfSelectedComponent')));

// side-bar
RendererMessageCommunicator
    .on('newRequisition', () => store.commit('side-bar/createNewComponent', {
        componentType: ComponentTypes.REQUISITION,
        startSelected: true
    }));

RendererMessageCommunicator
    .on('newPublisher', () => store.commit('side-bar/createNewComponent', {
        componentType: ComponentTypes.PUBLISHER,
        startSelected: true
    }));

RendererMessageCommunicator
    .on('newSubscription', () => store.commit('side-bar/createNewComponent', {
        componentType: ComponentTypes.SUBSCRIPTION,
        startSelected: true
    }));

RendererMessageCommunicator
    .on('openComponent', async () => (await FileDialog.showOpenDialog())
        .map(async file => await ComponentLoader.importFile(file))
        .map(async (requisitionPromise: any) => {
            try {
                if (requisitionPromise) {
                    const requisition = await requisitionPromise;
                    store.commit('side-bar/addRequisition', requisition);
                }
            } catch (e) {
                console.log(e);
                Logger.error(`Error loading component`);
            }
        }));

RendererMessageCommunicator
    .on('importPostmanCollection', async () => (await FileDialog.showOpenDialog())
        .map(async file => await ComponentLoader.importFromPostman(file))
        .map(async (requisitionPromise: any) => {
            try {
                if (requisitionPromise) {
                    const requisition = await requisitionPromise;
                    store.commit('side-bar/addRequisition', requisition);
                    Logger.info(`Postman collection '${requisition.name}' imported`);
                }
            } catch (e) {
                console.log(e);
                Logger.error(`Error importing postman collection`);
            }
        }));

// nav-bar
RendererMessageCommunicator.on('openEnvironment',
    async () => {
        const files = await FileDialog.showOpenDialog();
        files
            .map(async file => await EnvironmentLoader.loadFile(file))
            .map(async environmentPromise => {
                try {
                    if (environmentPromise) {
                        const environment =  await environmentPromise;
                        store.commit('nav-bar/addEnvironment', environment);
                    }
                } catch (e) {
                    console.log(e);
                    Logger.error(`Error opening environment`);
                }
            });
    });

RendererMessageCommunicator.on('importPostmanEnvironment',
    async () => {
        const files = await FileDialog.showOpenDialog();
        files
            .map(async file => await EnvironmentLoader.loadPostmanEnvironment(file))
            .map(async environmentPromise => {
                try {
                    if (environmentPromise) {
                        const environment =  await environmentPromise;
                        store.commit('nav-bar/addEnvironment', environment);
                    }
                } catch (e) {
                    console.log(e);
                    Logger.error(`Error importing postman environment`);
                }
            });
    });
