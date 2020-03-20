import {CarabinaPublisher} from '@/models/carabina-publisher';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {CarabinaSubscription} from '@/models/carabina-subscription';

export class ComponentDecycler {

    public decycle(component: CarabinaRequisition) {
        return ComponentDecycler.removeMetadataFromRequisition(component);
    }

    private static removeMetadataFromRequisition(item: CarabinaRequisition) {
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

    private static removeCarabinaMeta(item: CarabinaRequisition | CarabinaPublisher | CarabinaSubscription): any {
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
