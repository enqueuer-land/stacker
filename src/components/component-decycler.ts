//TODO test it
export class ComponentDecycler {

    public decycle(component: any) {
        return ComponentDecycler.removeMetadataFromRequisition(component);
    }

    private static removeMetadataFromRequisition(item: any) {
        const clone = ComponentDecycler.removeCarabinaMeta(item);
        if (item.publishers) {
            clone.publishers = item.publishers.map((publisher: any) => ComponentDecycler.removeCarabinaMeta(publisher));
        }
        if (item.subscriptions) {
            clone.subscriptions = item.subscriptions.map((subscription: any) => ComponentDecycler.removeCarabinaMeta(subscription));
        }
        if (item.requisitions) {
            clone.requisitions = item.requisitions.map((requisition: any) => ComponentDecycler.removeMetadataFromRequisition(requisition));
        }
        return clone;
    }

    private static removeCarabinaMeta(item: any): any {
        const clone = Object.assign({}, item);
        delete clone.carabinaMeta;
        return clone;
    }

}
