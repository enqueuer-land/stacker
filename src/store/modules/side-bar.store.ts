import {InputRequisitionModel} from "enqueuer";
import {ComponentFactory} from "@/components/component-factory";

export default {
    state: {
        textFilter: '',
        requisitions: [new ComponentFactory().createRequisition()],
    },
    mutations: {
        componentSelected: (stage: any, component: {}) => console.log(component),
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        createNewRequisition: (stage: any) => stage.requisitions.push(new ComponentFactory().createRequisition())
    },
    getters: {
        textFilter: (state: any) => state.textFilter,
        filteredRequisitions: (state: any) => state.requisitions
            .filter((requisition: InputRequisitionModel) => requisition.name.includes(state.textFilter))
    },
    namespaced: true
}
