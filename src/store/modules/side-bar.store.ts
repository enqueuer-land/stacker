import {InputRequisitionModel} from 'enqueuer';
import {ComponentFactory} from "@/components/component-factory";

export default {
    state: {
        textFilter: '',
        requisitions: [new ComponentFactory().createRequisition()],
        selectedComponent: null
    },
    mutations: {
        componentSelected: (stage: any, component: {}) => {
            if (stage.selectedComponent) {
                stage.selectedComponent.carabinaMeta.selected = false;
            }
            stage.selectedComponent = component;
        },
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        createNewRequisition: (stage: any) => stage.requisitions.push(new ComponentFactory().createRequisition()),
        createNewPublisher: (stage: any) => {
            const requisition = new ComponentFactory().createRequisition();
            const publisher = new ComponentFactory().createPublisher(requisition);
            requisition.publishers.push(publisher);
            stage.requisitions.push(requisition)
        },
        createNewSubscription: (stage: any) => {
            const requisition = new ComponentFactory().createRequisition();
            const subscription = new ComponentFactory().createSubscription(requisition);
            requisition.publishers.push(subscription);
            stage.requisitions.push(requisition)
        }
    },
    getters: {
        selectedComponentId: (state: any) => {
            console.log(state.selectedComponent.id)
            return state.selectedComponent.id
        },
        textFilter: (state: any) => state.textFilter,
        filteredRequisitions: (state: any) => state.requisitions
            .filter((requisition: InputRequisitionModel) => requisition.name.includes(state.textFilter))
    },
    namespaced: true
}
