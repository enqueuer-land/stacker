import {InputRequisitionModel} from "enqueuer";
import {ipcRenderer, remote} from "electron";
import {ComponentTypes} from "@/components/component-types";
import {IdCreator} from "@/components/id-creator";

export default {
    state: {
        responses: [],
    },
    mutations: {
        updateResponse: (stage: any, responses: any[]) => {
            stage.responses = responses;
        },
    },
    actions: {
        runRequisition: async ({state, commit}: any, msg: InputRequisitionModel) => {
            let requisition: any = msg;
            if (msg.carabinaMeta.componentName === ComponentTypes.PUBLISHER) {
                requisition = {publishers: [msg], name: msg.name, id: new IdCreator().create()};
            } else if (msg.carabinaMeta.componentName === ComponentTypes.SUBSCRIPTION) {
                requisition = {subscriptions: [msg], name: msg.name, id: new IdCreator().create()};
            }
            const ruEnqueuerFunction = remote.getGlobal('runEnqueuer');
            const responses = await ruEnqueuerFunction(requisition);
            commit('updateResponse', responses)
        }
    },
    getters: {
        responses: (state: any) => state.responses
    },
    namespaced: true
}
