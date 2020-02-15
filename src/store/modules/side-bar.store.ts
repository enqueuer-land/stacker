import {InputRequisitionModel} from "enqueuer";

export default {
    state: {
        textFilter: '',
        requisitions: [
            {
                id: Math.trunc(Math.random() * 999999),
                iterations: 2,
                name: 'first'
            },
            {
                id: Math.trunc(Math.random() * 999999),
                name: 'second'
            }
        ],
    },
    mutations: {
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        createNewRequisition: (stage: any) => stage.requisitions.push({
            id: Math.trunc(Math.random() * 999999),
            name: (stage.requisitions.length + 1).toString(),
        })
    },
    getters: {
        textFilter: (state: any) => state.textFilter,
        filteredRequisitions: (state: any) => state.requisitions
            .filter((requisition: InputRequisitionModel) => requisition.name.includes(state.textFilter))
    },
    namespaced: true
}
