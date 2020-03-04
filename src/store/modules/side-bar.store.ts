import {InputRequisitionModel} from 'enqueuer';
import {ComponentFactory} from "@/components/component-factory";
import {ComponentTypes} from "@/components/component-types";
import {ComponentFinder} from "@/components/ComponentFinder";

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
            if (payload.componentType === ComponentTypes.REQUISITION) {
                const component = new ComponentFactory().createRequisition(payload.parent);
                if (!payload.parent) {
                    stage.requisitions.push(component);
                }
                return component;
            } else {
                const parentRequisition = payload.parent || new ComponentFactory().createRequisition();
                const component = new ComponentFactory().createComponent(payload.componentType, parentRequisition);
                if (payload.startSelected) {
                    component.carabinaMeta.selected = true;
                    stage.selectedComponent = component;
                    parentRequisition.carabinaMeta.selected = false;
                }
                if (!payload.parent) {
                    stage.requisitions.push(parentRequisition);
                }
                return component;
            }
        },
        currentSelectedComponentChanged: (stage: any, event: any) => {
            if (stage.selectedComponent) {
                stage.selectedComponent[event.attributeName] = event.value;
                stage.selectedComponent.carabinaMeta.unsaved = true;
            }
        },
        changeAttributeById: (stage: any, event: any) => {
            const item = new ComponentFinder(stage.requisitions).findItem(event.id);
            if (item) {
                item[event.attributeName] = event.value;
                item.carabinaMeta.unsaved = true;
            }
        },
        deleteComponentById: (stage: any, event: any) => {
            const item = new ComponentFinder(stage.requisitions).findItem(event.id);
            stage.requisitions = stage.requisitions.filter((requisition: any) => requisition.id !== item.id);
            if (item) {
                if (stage.selectedComponent) {
                    if (stage.selectedComponent.id === event.id) {
                        stage.selectedComponent = null;
                    }
                }
                const parent = item.carabinaMeta.parent;
                if (parent) {
                    parent.requisitions = parent.requisitions.filter((requisition: any) => requisition.id !== item.id);
                    parent.publishers = parent.publishers.filter((publisher: any) => publisher.id !== item.id);
                    parent.subscriptions = parent.subscriptions.filter((subscription: any) => subscription.id !== item.id);
                }
                if (item.subscriptions) {
                    item.subscriptions = item.subscriptions.filter((subscription: any) => subscription.id !== item.id);
                }
                if (item.publishers) {
                    item.publishers = item.publishers.filter((publisher: any) => publisher.id !== item.id);
                }
                if (item.requisitions) {
                    item.requisitions = item.requisitions.filter((requisition: any) => requisition.id !== item.id);
                }
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
