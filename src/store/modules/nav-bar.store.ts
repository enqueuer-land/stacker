import store from '@/store';
import Store from 'electron-store';
import {Logger} from '@/components/logger';
import {IdCreator} from '@/components/id-creator';
import {FileDialog} from '@/components/file-dialog';
import {EnvironmentSaver} from '@/environments/environment-saver';
import {EnvironmentLoader} from '@/environments/environment-loader';
import {RendererMessageCommunicator} from '@/components/renderer-message-communicator';

const navBarRepository = new Store({name: 'nav-bar'});

RendererMessageCommunicator.on('openEnvironment',
    async () => {
        const environments = await EnvironmentLoader.importEnvironment();
        environments
            .filter(item => item)
            .forEach(environment => {
                store.commit('nav-bar/addEnvironment', environment);
            });
    });

RendererMessageCommunicator.on('importPostmanEnvironment',
    async () => {
        const postmanEnvironments = await EnvironmentLoader.importPostmanEnvironment();
        postmanEnvironments
            .filter(item => item)
            .forEach(postmanEnvironment => {
                store.commit('nav-bar/addEnvironment', postmanEnvironment);
            });
    });

const noEnvironment = {name: 'No environment', role: 'none', store: {}};

function persist(stage: any) {
    RendererMessageCommunicator.emit('setEnqueuerStore', stage.selectedEnvironment.store);
    navBarRepository.set('environments', stage.environments);
    navBarRepository.set('selectedEnvironment', stage.selectedEnvironment);
}

const selectedEnvironment = navBarRepository.get('selectedEnvironment', noEnvironment);
RendererMessageCommunicator.emit('setEnqueuerStore', selectedEnvironment.store);

export default {
    state: {
        environments: navBarRepository.get('environments', [noEnvironment]),
        selectedEnvironment: selectedEnvironment,
    },
    mutations: {
        environmentSelected: (stage: any, environment: any) => {
            stage.selectedEnvironment = {...environment};
            persist(stage);
        },
        changeSelectedEnvironmentStore: (stage: any, payload: any) => {
            const environment = stage.environments.find((item: any) => item.id === payload.environment.id);
            environment.store = payload.store;
            stage.selectedEnvironment = {...environment};
            persist(stage);
        },
        changeSelectedEnvironmentName: (stage: any, payload: any) => {
            const environment = stage.environments.find((item: any) => item.id === payload.environment.id);
            environment.name = payload.name;
            stage.selectedEnvironment = {...environment};
            persist(stage);
        },
        deleteEnvironment: (stage: any, payload: any) => {
            stage.environments = stage.environments.filter((item: any) => item.id !== payload.environment.id);
            if (stage.selectedEnvironment.id === payload.environment.id) {
                stage.selectedEnvironment = {...noEnvironment};
            }
            persist(stage);
        },
        cloneEnvironment: (stage: any, payload: any) => {
            const clone = {...payload.environment, id: new IdCreator().create()};
            stage.environments.push(clone);
            persist(stage);
        },
        addNewEnvironment: (stage: any) => {
            const environment = {
                name: `New Environment ${stage.environments.length}`,
                id: new IdCreator().create(),
                store: {}
            };
            stage.environments.push(environment);
            stage.selectedEnvironment = {...environment};
            persist(stage);
        },
        addEnvironment: (stage: any, payload: any) => {
            stage.environments.push(payload);
            const lastEnvironment = stage.environments[stage.environments.length - 1];
            stage.selectedEnvironment = {...lastEnvironment};
            persist(stage);
        },
        saveEnvironment: (stage: any, payload: any) => {
            FileDialog
                .showSaveDialog(payload.environment.name + '.nqr.env.yml')
                .then(filename => {
                    if (filename) {
                        new EnvironmentSaver()
                            .save(filename, payload.environment)
                            .then(() => Logger.info(`Environment '${payload.environment.name}' saved as '${filename}`));
                    }
                });
        },
    },
    actions: {},
    getters: {
        environments: (state: any) => state.environments,
        selectedEnvironment: (state: any) => state.selectedEnvironment,
    },
    namespaced: true
}
