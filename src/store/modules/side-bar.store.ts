import {InputRequisitionModel} from "enqueuer";
import {Components} from "@/components/components";

export default {
    state: {
        textFilter: '',
        requisitions: [
            {
                id: Math.trunc(Math.random() * 999999),
                iterations: 2,
                name: 'first',
                carabinaMeta: {
                    componentName: Components.REQUISITION
                }
            },
            {
                id: Math.trunc(Math.random() * 999999),
                name: 'second',
                type: 'HTTP',
                carabinaMeta: {
                    componentName: Components.PUBLISHER
                }
            }
        ],
    },
    mutations: {
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        createNewRequisition: (stage: any) => stage.requisitions.push({
            id: Math.trunc(Math.random() * 999999),
            name: (stage.requisitions.length + 1).toString(),
            type: 'AMQP',
            carabinaMeta: {
                componentName: Components.SUBSCRIPTION
            }
        })
    },
    getters: {
        textFilter: (state: any) => state.textFilter,
        filteredRequisitions: (state: any) => state.requisitions
            .filter((requisition: InputRequisitionModel) => requisition.name.includes(state.textFilter))
    },
    namespaced: true
}
