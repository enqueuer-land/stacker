import store from "@/store";
import {ipcRenderer, remote} from "electron";
import Store from 'electron-store';
import {IdCreator} from "@/components/id-creator";
import {EnvironmentSaver} from "@/environments/environment-saver";
import {EnvironmentLoader} from "@/environments/environment-loader";

const navBarRepository = new Store({name: 'nav-bar'});

ipcRenderer.on('openEnvironment', () => store.commit('nav-bar/loadEnvironment'));
ipcRenderer.on('importPostmanEnvironment', () => EnvironmentLoader.importPostmanEnvironment());

const noEnvironment = {name: 'No environment', role: 'none'};

function persist(stage: any) {
    ipcRenderer.send('setEnqueuerStore', stage.selectedEnvironment.store);
    navBarRepository.set('environments', stage.environments);
    navBarRepository.set('selectedEnvironment', stage.selectedEnvironment);
}

const selectedEnvironment = navBarRepository.get('selectedEnvironment', noEnvironment);
ipcRenderer.send('setEnqueuerStore', selectedEnvironment.store);

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
        loadEnvironment: (stage: any) => {
            stage.environments = stage.environments.concat(new EnvironmentLoader().load());
            const lastEnvironment = stage.environments[stage.environments.length - 1];
            stage.selectedEnvironment = {...lastEnvironment};
            persist(stage);
        },
        saveEnvironment: (stage: any, payload: any) => {
            new EnvironmentSaver().save(payload.environment);
        },
    },
    actions: {},
    getters: {
        environments: (state: any) => state.environments,
        selectedEnvironment: (state: any) => state.selectedEnvironment,
    },
    namespaced: true
}
