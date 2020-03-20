import {CarabinaComponent} from '@/models/carabina-component';

export class ComponentDecycler {

    public decycle(component: CarabinaComponent) {
        return ComponentDecycler.removeMetadataFromRequisition(component);
    }

    private static removeMetadataFromRequisition(item: CarabinaComponent) {
        const clone = ComponentDecycler.removeCarabinaMeta(item);
        if (clone.publishers) {
            clone.publishers = item.publishers.map((publisher: any) => ComponentDecycler.removeCarabinaMeta(publisher));
        }
        if (clone.subscriptions) {
            clone.subscriptions = item.subscriptions.map((subscription: any) => ComponentDecycler.removeCarabinaMeta(subscription));
        }
        if (clone.requisitions) {
            clone.requisitions = item.requisitions.map((requisition: any) => ComponentDecycler.removeMetadataFromRequisition(requisition));
        }
        return clone;
    }

    private static removeCarabinaMeta(item: CarabinaComponent): any {
        const clone = Object.assign({}, item);
        if (item) {
            clone.carabinaMeta = Object.assign({}, item.carabinaMeta);
            if (clone.carabinaMeta) {
                delete clone.carabinaMeta.parent;
            }
        }
        return clone;
    }

}
