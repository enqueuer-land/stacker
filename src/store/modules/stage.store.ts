import {InputRequisitionModel} from 'enqueuer';
import {remote} from 'electron';
import {ComponentTypes} from '@/components/component-types';
import {IdCreator} from '@/components/id-creator';
import {ComponentDecycler} from "@/components/component-decycler";

const prepareRequisition = (msg: any) => {
    const componentName = msg.carabinaMeta.componentName;
    let decycled = new ComponentDecycler().decycle(msg);
    if (componentName === ComponentTypes.PUBLISHER) {
        decycled = {publishers: [decycled], name: decycled.name, id: new IdCreator().create()};
    } else if (componentName === ComponentTypes.SUBSCRIPTION) {
        decycled = {timeout: -1, subscriptions: [decycled], name: decycled.name, id: new IdCreator().create()};
    }
    return decycled;
};

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
        runComponent: async ({state, commit}: any, msg: InputRequisitionModel) => {
            const decycled = prepareRequisition(msg);
            console.log(JSON.stringify(decycled));
            remote.getGlobal('eventEmitter').emit('runEnqueuer', decycled);
            remote.getGlobal('eventEmitter').once('runEnqueuerReply', (responses: any) => commit('updateResponse', responses));
        }
    },
    getters: {
        responses: (state: any) => state.responses
    },
    namespaced: true
}
