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
        createNewComponent: (stage: any, payload: any) => {
            if (stage.selectedComponent) {
                stage.selectedComponent.carabinaMeta.selected = false;
            }

            if (payload.componentType === ComponentTypes.REQUISITION) {
                const component = new ComponentFactory().createRequisition(payload.parent);
                stage.selectedComponent = component;
                if (!payload.parent) {
                    stage.requisitions.push(component);
                } else {
                    payload.parent.carabinaMeta.selected = false;
                }
            } else {
                const parentRequisition = payload.parent || new ComponentFactory().createRequisition();
                const component = new ComponentFactory().createComponent(payload.componentType, parentRequisition);
                stage.selectedComponent = component;
                parentRequisition.carabinaMeta.selected = false;
                if (!payload.parent) {
                    stage.requisitions.push(parentRequisition);
                }
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
            .filter((requisition: InputRequisitionModel) => requisition.name.includes(state.textFilter)),
        breadcrumbItems: (state: any): any[] => {
            const result = [];
            let parent = state.selectedComponent;
            while (parent.carabinaMeta && parent.carabinaMeta.parent) {
                parent = parent.carabinaMeta.parent;
                result.push({text: parent.name, href: '#', id: parent.id});
            }
            return result.reverse();
        }
    },
    namespaced: true
}
