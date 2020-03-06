import {remote} from "electron";
import {IdCreator} from "@/components/id-creator";
import {EnvironmentSaver} from "@/environments/environment-saver";
import {EnvironmentLoader} from "@/environments/environment-loader";
import store from "@/store";

remote.getGlobal('eventEmitter').on('openEnvironment', () => store.commit('nav-bar/loadEnvironment'));
remote.getGlobal('eventEmitter').on('importPostmanEnvironment', () => EnvironmentLoader.importPostmanEnvironment());

const noEnvironment = {name: 'No environment', role: 'none'};
export default {
    state: {
        environments: [noEnvironment],
        selectedEnvironment: noEnvironment
    },
    mutations: {
        environmentSelected: (stage: any, environment: any) => {
            stage.selectedEnvironment = {...environment};
        },
        changeSelectedEnvironmentStore: (stage: any, payload: any) => {
            const environment = stage.environments.find((item: any) => item.id === payload.environment.id);
            environment.store = payload.store;
            stage.selectedEnvironment = {...environment};
        },
        changeSelectedEnvironmentName: (stage: any, payload: any) => {
            const environment = stage.environments.find((item: any) => item.id === payload.environment.id);
            environment.name = payload.name;
            stage.selectedEnvironment = {...environment};
        },
        deleteEnvironment: (stage: any, payload: any) => {
            stage.environments = stage.environments.filter((item: any) => item.id !== payload.environment.id);
            if (stage.selectedEnvironment.id === payload.environment.id) {
                stage.selectedEnvironment = {...noEnvironment};
            }
        },
        cloneEnvironment: (stage: any, payload: any) => {
            const clone = {...payload.environment, id: new IdCreator().create()};
            stage.environments.push(clone);
        },
        addNewEnvironment: (stage: any) => {
            const environment = {
                name: `New Environment ${stage.environments.length}`,
                id: new IdCreator().create(),
                store: {}
            };
            stage.environments.push(environment);
            stage.selectedEnvironment = {...environment};
        },
        addEnvironment: (stage: any, payload: any) => {
            stage.environments.push(payload);
        },
        loadEnvironment: (stage: any) => {
            stage.environments = stage.environments.concat(new EnvironmentLoader().load());
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
