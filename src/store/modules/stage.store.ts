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
        runRequisitionViaGlobal: async ({state, commit}: any, msg: InputRequisitionModel) => {
            let requisition: any = msg;
            if (msg.carabinaMeta.componentName === ComponentTypes.PUBLISHER) {
                requisition = {publishers: [msg], name: msg.name, id: new IdCreator().create()};
            }
            const ruEnqueuerFunction = remote.getGlobal('runEnqueuer');
            const responses = await ruEnqueuerFunction(requisition);
            commit('updateResponse', responses)
        },
        runRequisition: ({state, commit}: any, requisition: InputRequisitionModel) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            // window.ipcRenderer.send('runRequisition');
            ipcRenderer.send('runRequisition', requisition);
            ipcRenderer.once('runRequisitionReply', (event, reports) => {
                console.log(reports);
                // state.eventEmitter.emit('statusInformation', `Report of requisition '${requisition.name}'`);
                // console.log('Renderer got report!');
                // commit('setRequisitionResult', {reports, requisition});
            });

        }
    },
    getters: {
        responses: (state: any) => state.responses
    },
    namespaced: true
}
