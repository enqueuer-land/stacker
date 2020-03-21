import Store from 'electron-store';
import {Logger} from '@/components/logger';
import {FileDialog} from '@/components/file-dialog';
import {ComponentSaver} from '@/components/component-saver';
import {ComponentTypes} from '@/components/component-types';
import {ComponentFinder} from '@/components/component-finder';
import {ComponentParent} from '@/components/component-parent';
import {ComponentLoader} from '@/components/component-loader';
import {ComponentCloner} from '@/components/component-cloner';
import {CarabinaComponent} from '@/models/carabina-component';
import {CarabinaPublisher} from '@/models/carabina-publisher';
import {ComponentFactory} from '@/components/component-factory';
import {ComponentDecycler} from '@/components/component-decycler';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {CarabinaSubscription} from '@/models/carabina-subscription';
import requisitionsExample from '@/components/requisitions-example.json';

const sidebarRepository = new Store({name: 'side-bar'});

function persist(stage: any) {
    sidebarRepository.set('selectedComponentId', stage.selectedComponent ? stage.selectedComponent.id : null);
    sidebarRepository.set('requisitions', stage.requisitions.map((requisition: any) => new ComponentDecycler().decycle(requisition)));
}

const initialRequisitions = sidebarRepository.get('requisitions', requisitionsExample)
    .map((requisition: any) => ComponentLoader.loadRequisition(requisition));

let initialSelectedComponent: CarabinaComponent | undefined;
const initialSelectedComponentId = sidebarRepository.get('selectedComponentId', null);
if (initialSelectedComponentId) {
    initialSelectedComponent = new ComponentFinder(initialRequisitions).findItem(initialSelectedComponentId);
}

//TODO Move to another class
const moveComponent = (draggedComponent: any, target: any, draggedComponentParent: any) => {
    switch (draggedComponent.carabinaMeta.type) {
        case ComponentTypes.REQUISITION:
            draggedComponentParent.requisitions = draggedComponentParent.requisitions
                .filter((item: any) => item.id !== draggedComponent.id);

            target.requisitions.push(draggedComponent);
            break;
        case ComponentTypes.PUBLISHER:
            draggedComponentParent.publishers = draggedComponentParent.publishers
                .filter((item: any) => item.id !== draggedComponent.id);

            target.publishers.push(draggedComponent);
            break;
        case ComponentTypes.SUBSCRIPTION:
            draggedComponentParent.subscriptions = draggedComponentParent.subscriptions
                .filter((item: any) => item.id !== draggedComponent.id);

            target.subscriptions.push(draggedComponent);
            break;
    }
};

//TODO fix bug. It's not working
function unselectSelectedComponent(stage: any) {
    if (stage.selectedComponent) {
        console.log(stage.selectedComponent.name)
        const foundItem = new ComponentFinder(stage.requisitions).findItem(stage.selectedComponent.id);
        if (foundItem) {
            console.log(foundItem.id)
            foundItem.carabinaMeta.selected = false;
        }
    }
}

//TODO test it
export default () => ({
    state: {
        textFilter: '',
        requisitions: initialRequisitions,
        selectedComponent: initialSelectedComponent,
    },
    mutations: {
        componentSelected: (stage: any, component: any) => {
            unselectSelectedComponent(stage);
            const selected = new ComponentFinder(stage.requisitions).findItem(component.id);
            if (selected) {
                stage.selectedComponent = component;
                stage.selectedComponent.carabinaMeta.selected = true;
            }
            persist(stage);
        },
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        addRequisition: (stage: any, requisition: CarabinaRequisition) => {
            if (!new ComponentFinder(stage.requisitions).findItem(requisition.id)) {
                stage.requisitions.push(requisition);
                unselectSelectedComponent(stage);
                stage.selectedComponent = requisition;
                Logger.info(`Component '${requisition.name}' loaded`);
            } else {
                Logger.info(`Component ${requisition.name} is already opened`);
            }
            persist(stage);
        },
        //TODO Move to another class
        createNewComponent: (stage: any, payload: any) => {
            let createdComponent;
            if (payload.componentType === ComponentTypes.REQUISITION) {
                createdComponent = new ComponentFactory().createRequisition(payload.parent);
                if (!payload.parent) {
                    stage.requisitions.push(createdComponent);
                }
            } else {
                const parentRequisition = payload.parent || new ComponentFactory().createRequisition();
                createdComponent = new ComponentFactory().createComponent(payload.componentType, parentRequisition);
                if (!payload.parent) {
                    stage.requisitions.push(parentRequisition);
                }
                parentRequisition.carabinaMeta.collapsed = false;
            }
            if (payload.startSelected) {
                createdComponent.carabinaMeta.selected = true;
                if (stage.selectedComponent) {
                    stage.selectedComponent.carabinaMeta.selected = false;
                }
                stage.selectedComponent = createdComponent;
            }
            persist(stage);
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
        duplicateComponent: (stage: any, event: any) => {
            const parent = event.component.carabinaMeta.parent;
            const type = event.component.carabinaMeta.type;
            const component = new ComponentDecycler().decycle(event.component);
            let clone;
            switch (type) {
                case ComponentTypes.REQUISITION:
                    clone = ComponentCloner.cloneRequisition(component as CarabinaRequisition, parent);
                    if (!parent) {
                        stage.requisitions.push(clone);
                    }
                    break;
                case ComponentTypes.PUBLISHER:
                    clone = ComponentCloner.clonePublisher(component as CarabinaPublisher, parent);
                    break;
                // case ComponentTypes.SUBSCRIPTION:
                default:
                    clone = ComponentCloner.cloneSubscription(component as CarabinaSubscription, parent);
                    break;
            }
            clone.carabinaMeta.selected = false;
            persist(stage);
        },
        //TODO Move to another class
        componentDragAndDrop: (stage: any, event: any) => {
            let target = new ComponentFinder(stage.requisitions).findItem(event.drag.to.id);
            const draggedComponent = event.component;
            if (!target) {
                const draggedComponentParent = draggedComponent.carabinaMeta.parent || stage;
                if (draggedComponent.carabinaMeta.type === ComponentTypes.REQUISITION) {
                    draggedComponentParent.requisitions = draggedComponentParent.requisitions
                        .filter((item: any) => item.id !== draggedComponent.id);

                    delete draggedComponent.carabinaMeta.parent;
                    stage.requisitions.push(draggedComponent);
                }
            } else {
                if (new ComponentParent(target).isGrandChildOf(draggedComponent) ||
                    target.id === draggedComponent.id) {
                    return;
                }
                const draggedComponentParent = draggedComponent.carabinaMeta.parent || stage;
                if (target.carabinaMeta.type === ComponentTypes.REQUISITION) {
                    moveComponent(draggedComponent, target, draggedComponentParent);
                } else {
                    target = target.carabinaMeta.parent;
                    moveComponent(draggedComponent, target, draggedComponentParent);
                }
                draggedComponent.carabinaMeta.parent = target;
            }
            persist(stage);
        },
        saveComponent: (stage: any, {component}: any) => {
            FileDialog
                .showSaveDialog(component.name + '.nqr.yml')
                .then(filename => {
                    if (filename) {
                        new ComponentSaver()
                            .save(component, filename)
                            .then(() => Logger.info(`Component '${component.name}' saved as '${filename}'`));
                    }
                })
        },
        //TODO Move to another class
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
            .filter((requisition: CarabinaRequisition) => JSON.stringify(Object.values(new ComponentDecycler().decycle(requisition))).toLowerCase()
                .includes(state.textFilter.toLowerCase())),
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
});
