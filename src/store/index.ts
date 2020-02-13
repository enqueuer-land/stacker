import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer, remote} from 'electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    runRequisitionViaGlobal: async function ({state, commit}, requisition) {
      console.log(await remote.getGlobal('runEnqueuer')(requisition));

    },
    runRequisition: function ({state, commit}, requisition) {
      console.log('store action');
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
  modules: {
  }
})
