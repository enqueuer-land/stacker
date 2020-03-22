import {ComponentTypes} from '@/components/component-types';
import {CarabinaComponent} from '@/models/carabina-component';

export class ComponentDeleter {
    private readonly component: CarabinaComponent;
    private readonly type: ComponentTypes;

    constructor(component: CarabinaComponent) {
        this.component = component;
        this.type = component.carabinaMeta.type;
    }

    public delete(): void {
        const parent = this.component.carabinaMeta.parent;
        if (parent) {
            switch (this.type) {
                case ComponentTypes.REQUISITION:
                    parent.requisitions = parent.requisitions.filter((requisition: any) => requisition.id !== this.component.id);
                    break;
                case ComponentTypes.PUBLISHER:
                    parent.publishers = parent.publishers.filter((publisher: any) => publisher.id !== this.component.id);
                    break;
                case ComponentTypes.SUBSCRIPTION:
                    parent.subscriptions = parent.subscriptions.filter((subscription: any) => subscription.id !== this.component.id);
                    break;
            }
        }
    }
}
