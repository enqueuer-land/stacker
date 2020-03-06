import {IdCreator} from "@/components/id-creator";
import {EnvironmentSaver} from "@/environments/environment-saver";
import {EnvironmentLoader} from "@/environments/environment-loader";

const postman = {
    "id": "65dc9680-d05d-44a5-b2c0-9af2b6fa8348",
    name: "AWS Dev",
    "store": {
        "SERVICE_IAM_BASE_URL": "http://sa-east-1-elb-service-iam.aws-development.dc-ifood.com",
        "SERVICE_IDENTITY_BASE_URL": "http://sa-east-1-elb-service-identity.aws-development.dc-ifood.com",
        "SERVICE_WSLOJA_BASE_URL": "http://wsloja-int.ifood-devel.com.br",
        "SERVICE_KONG_BASE_URL": "http://sa-east-1-elb-ifood-kong-marketplace.aws-development.dc-ifood.com",
        "SERVICE_MERCHANT_BASE_URL": "http://sa-east-1-elb-ifood-service-merchant.aws-development.dc-ifood.com",
        "SERVICE_MENU_BASE_URL": "http://sa-east-1-elb-ifood-service-menu.aws-development.dc-ifood.com",
        "SERVICE_ACCOUNT_SEARCH_BASE_URL": "http://us-east-2-account-search.aws-development.dc-ifood.com/",
        "SERVICE_OTP": "http://sa-east-1-elb-service-otp.aws-development.dc-ifood.com",
        "SERVICE_ACCOUNT_METADATA_BASE_URL": "http://sa-east-1-elb-account-metadata.aws-development.dc-ifood.com",
        "SERVICE_EMAIL_VALIDATOR": "http://sa-east-1-elb-email-validator.aws-development.dc-ifood.com",
        "SERVICE_DEVICES_BASE_URL": "sa-east-1-elb-service-account-devices.aws-development.dc-ifood.com"
    },
    "_postman_variable_scope": "environment",
    "_postman_exported_at": "2020-03-05T18:10:16.704Z",
    "_postman_exported_using": "Postman/7.19.1"
};

const noEnvironment = {name: 'No environment', role: 'none'};

export default {
    state: {
        environments: [noEnvironment, postman],
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
            stage.environments.push({
                name: 'New Environment',
                id: new IdCreator().create(),
                store: {}
            });
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
