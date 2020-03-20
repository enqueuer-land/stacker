import {CarabinaComponent} from '@/models/carabina-component';
import {CarabinaRequisition} from '@/models/carabina-requisition';

export class ComponentParent {
    private readonly component: any;

    public constructor(component: object) {
        this.component = component;
    }

    public findHighestParent(): CarabinaComponent | undefined {
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
