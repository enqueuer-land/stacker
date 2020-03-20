import {CarabinaPublisher} from '@/models/carabina-publisher';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {CarabinaSubscription} from '@/models/carabina-subscription';

export class ComponentParent {
    private readonly component: any;

    public constructor(component: object) {
        this.component = component;
    }

    public findHighestParent(): CarabinaRequisition | CarabinaPublisher | CarabinaSubscription | undefined {
        const parent = this.component.carabinaMeta.parent;
        if (parent) {
            return new ComponentParent(parent).findHighestParent();
        }
        return this.component;
    }

    public isGrandChildOf(parentComponent: CarabinaRequisition): boolean {
        const parent = this.component.carabinaMeta.parent;
        if (parent) {
            if (parent.id === parentComponent.id) {
                return true;
            }
            return new ComponentParent(this.component.carabinaMeta.parent).isGrandChildOf(parentComponent);
        }
        return false;
    }

}
