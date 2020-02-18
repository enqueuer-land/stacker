import {InputRequisitionModel} from 'enqueuer';
import {ComponentFactory} from "@/components/component-factory";
import {ComponentTypes} from "@/components/component-types";

export default {
    state: {
        textFilter: '',
        requisitions: [],
        selectedComponent: null
    },
    mutations: {
        componentSelected: (stage: any, component: {}) => {
            if (stage.selectedComponent) {
                stage.selectedComponent.carabinaMeta.selected = false;
            }
            stage.selectedComponent = component;
            stage.selectedComponent.carabinaMeta.selected = true;
        },
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        createNewComponent: (stage: any, componentType: ComponentTypes, parent: any) => {
            if (stage.selectedComponent) {
                stage.selectedComponent.carabinaMeta.selected = false;
            }

            if (componentType === ComponentTypes.REQUISITION) {
                console.log('Here: ' + parent );
                const component = new ComponentFactory().createRequisition();
                stage.selectedComponent = component;
                stage.requisitions.push(component);
            } else {
                const parentRequisition = parent || new ComponentFactory().createRequisition();
                const component = new ComponentFactory().createComponent(componentType, parentRequisition);
                stage.selectedComponent = component;
                parentRequisition.carabinaMeta.selected = false;
                stage.requisitions.push(parentRequisition);
            }
        },
        currentSelectedComponentChanged: (stage: any, event: any) => {
            if (stage.selectedComponent) {
                stage.selectedComponent[event.attributeName] = event.value;
            }
        },
    },
    getters: {
        selectedComponent: (state: any) => state.selectedComponent,
        textFilter: (state: any) => state.textFilter,
        requisitions: (state: any) => state.requisitions,
        filteredRequisitions: (state: any) => state.requisitions
            .filter((requisition: InputRequisitionModel) => requisition.name.includes(state.textFilter))
    },
    namespaced: true
}
