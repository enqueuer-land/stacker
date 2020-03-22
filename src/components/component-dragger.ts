import {ComponentTypes} from '@/components/component-types';
import {CarabinaComponent} from '@/models/carabina-component';
import {CarabinaPublisher} from '@/models/carabina-publisher';
import {ComponentParent} from '@/components/component-parent';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {CarabinaSubscription} from '@/models/carabina-subscription';

export class ComponentDragger {
    private readonly draggedComponent: CarabinaComponent;
    private readonly draggedComponentParent: CarabinaRequisition;

    constructor(draggedComponent: CarabinaComponent, draggedComponentParent: CarabinaRequisition) {
        this.draggedComponent = draggedComponent;
        this.draggedComponentParent = draggedComponentParent;
    }

    public moveToRoot(): boolean {
        if (this.draggedComponent.carabinaMeta.type === ComponentTypes.REQUISITION) {
            this.draggedComponentParent.requisitions = this.draggedComponentParent.requisitions
                .filter((item: any) => item.id !== this.draggedComponent.id);
            delete this.draggedComponent.carabinaMeta.parent;
            return true;
        }
        return false;
    }

    public moveToComponent(target: CarabinaRequisition): void {
        if (new ComponentParent(target).isGrandChildOf(this.draggedComponent as CarabinaRequisition) ||
            target.id === this.draggedComponent.id) {
            return;
        }

        switch (this.draggedComponent.carabinaMeta.type) {
            case ComponentTypes.REQUISITION:
                this.draggedComponentParent.requisitions = this.draggedComponentParent.requisitions
                    .filter((item: any) => item.id !== this.draggedComponent.id);

                target.requisitions.push(this.draggedComponent as CarabinaRequisition);
                break;
            case ComponentTypes.PUBLISHER:
                this.draggedComponentParent.publishers = this.draggedComponentParent.publishers
                    .filter((item: any) => item.id !== this.draggedComponent.id);

                target.publishers.push(this.draggedComponent as CarabinaPublisher);
                break;
            case ComponentTypes.SUBSCRIPTION:
                this.draggedComponentParent.subscriptions = this.draggedComponentParent.subscriptions
                    .filter((item: any) => item.id !== this.draggedComponent.id);

                target.subscriptions.push(this.draggedComponent as CarabinaSubscription);
                break;
        }
        this.draggedComponent.carabinaMeta.parent = target;
    }
}
