import {InputRequisitionModel} from 'enqueuer';
import {ComponentFactory} from '@/components/component-factory';
import {ComponentTypes} from '@/components/component-types';
import {ComponentSaver} from '@/components/component-saver';

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
        addRequisition: (stage: any, component: any) => stage.requisitions.push(component),
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
        changeAttributeOfComponent: (stage: any, event: any) => {
            event.component[event.attributeName] = event.value;
            event.component.carabinaMeta.unsaved = true;
        },
        saveComponent: (stage: any, event: any) => {
            new ComponentSaver().save(event.component);
        },
        deleteComponentById: (stage: any, event: any) => {
            stage.requisitions = stage.requisitions.filter((requisition: any) => requisition.id !== event.component.id);
            if (stage.selectedComponent) {
                if (stage.selectedComponent.id === event.id) {
                    stage.selectedComponent = null;
                }
            }
            const parent = event.component.carabinaMeta.parent;
            if (parent) {
                parent.requisitions = parent.requisitions.filter((requisition: any) => requisition.id !== event.component.id);
                parent.publishers = parent.publishers.filter((publisher: any) => publisher.id !== event.component.id);
                parent.subscriptions = parent.subscriptions.filter((subscription: any) => subscription.id !== event.component.id);
            }
            if (event.component.subscriptions) {
                event.component.subscriptions = event.component.subscriptions.filter((subscription: any) => subscription.id !== event.component.id);
            }
            if (event.component.publishers) {
                event.component.publishers = event.component.publishers.filter((publisher: any) => publisher.id !== event.component.id);
            }
            if (event.component.requisitions) {
                event.component.requisitions = event.component.requisitions.filter((requisition: any) => requisition.id !== event.component.id);
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
