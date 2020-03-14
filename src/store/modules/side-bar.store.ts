import store from '@/store'
import Store from 'electron-store';
import {Logger} from '@/components/logger';
import {InputRequisitionModel} from 'enqueuer';
import {FileDialog} from '@/components/file-dialog';
import {ComponentSaver} from '@/components/component-saver';
import {ComponentTypes} from '@/components/component-types';
import {ComponentFinder} from '@/components/component-finder';
import {ComponentParent} from '@/components/component-parent';
import {ComponentLoader} from '@/components/component-loader';
import {ComponentFactory} from '@/components/component-factory';
import {ComponentDecycler} from '@/components/component-decycler';
import {RendererMessageSender} from '@/components/renderer-message-sender';

const sidebarRepository = new Store({name: 'side-bar'});

RendererMessageSender
    .on('openComponent', async () => (await FileDialog.showOpenDialog())
        .map(async file => await ComponentLoader.importFile(file))
        .filter(async file => await file)
        .map(async requisition => requisition && store.commit('side-bar/addRequisition', await requisition)));
RendererMessageSender
    .on('importPostmanCollection', async () => (await FileDialog.showOpenDialog())
        .map(async file => await ComponentLoader.importFromPostman(file))
        .filter(async file => await file)
        .map(async requisition => requisition && store.commit('side-bar/addRequisition', await requisition)));

function persist(stage: any) {
    sidebarRepository.set('selectedComponentId', stage.selectedComponent ? stage.selectedComponent.id : null);
    sidebarRepository.set('requisitions', stage.requisitions.map((requisition: any) => new ComponentDecycler().decycle(requisition)));
}

const initialRequisitions = sidebarRepository.get('requisitions', [])
    .map((requisition: any) => ComponentLoader.loadRequisition(requisition));

let initialSelectedComponent = null;
const initialSelectedComponentId = sidebarRepository.get('selectedComponentId', null);
if (initialSelectedComponentId) {
    initialSelectedComponent = new ComponentFinder(initialRequisitions).findItem(initialSelectedComponentId);
}

export default {
    state: {
        textFilter: '',
        requisitions: initialRequisitions,
        selectedComponent: initialSelectedComponent,
    },
    mutations: {
        componentSelected: (stage: any, component: {}) => {
            if (stage.selectedComponent) {
                const foundItem = new ComponentFinder(stage.requisitions).findItem(stage.selectedComponent.id);
                if (foundItem) {
                    foundItem.carabinaMeta.selected = false;
                }
            }
            stage.selectedComponent = component;
            stage.selectedComponent.carabinaMeta.selected = true;
            persist(stage);
        },
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        addRequisition: (stage: any, component: any) => {
            stage.requisitions.push(component);
            persist(stage);
        },
        createNewComponent: (stage: any, payload: any) => {
            if (payload.componentType === ComponentTypes.REQUISITION) {
                const component = new ComponentFactory().createRequisition(payload.parent);
                if (!payload.parent) {
                    stage.requisitions.push(component);
                }
                persist(stage);
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
                parentRequisition.carabinaMeta.collapsed = false;
                persist(stage);
                return component;
            }
        },
        currentSelectedComponentChanged: (stage: any, event: any) => {
            if (stage.selectedComponent) {
                stage.selectedComponent[event.attributeName] = event.value;
                persist(stage);
            }
        },
        changeAttributeOfComponent: (stage: any, event: any) => {
            event.component[event.attributeName] = event.value;
            persist(stage);
        },
        saveComponent: (stage: any, event: any) => {
            new ComponentSaver().save(event.component)
                .then(() => Logger.info(`Component '${event.component.name}' saved`));
        },
        deleteComponentById: (stage: any, event: any) => {
            stage.requisitions = stage.requisitions.filter((requisition: any) => requisition.id !== event.component.id);
            if (stage.selectedComponent) {
                if (stage.selectedComponent.id === event.component.id || new ComponentParent(stage.selectedComponent).isGrandChildOf(event.component)) {
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
            persist(stage);
        },
    },
    getters: {
        selectedComponent: (state: any) => state.selectedComponent,
        textFilter: (state: any) => state.textFilter,
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
