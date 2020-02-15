import {InputRequisitionModel} from "enqueuer";
import {ipcRenderer, remote} from "electron";

export default {
    actions: {
        runRequisitionViaGlobal: async ({state, commit}: any, requisition: InputRequisitionModel) => {
            const ruEnqueuerFunction = remote.getGlobal('runEnqueuer');
            const message = await ruEnqueuerFunction(requisition);
            console.log(message);
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
    }, namespaced: true
}
