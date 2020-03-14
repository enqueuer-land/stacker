export class ComponentFinder {
    private readonly requisitions: any[];

    public constructor(requisitions: any[]) {
        this.requisitions = requisitions || [];
    }

    public findItem(id: string) {
        return this.requisitions
            .map(requisition => this.findIdInRequisition(id, requisition))
            .filter(component => !!component)[0];
    }

    private findIdInRequisition(id: string, requisition: any) {
        if (requisition.id === id) {
            return requisition;
        }

        const foundPublisher = (requisition.publishers || []).filter((publisher: any) => publisher.id === id)[0];
        if (foundPublisher) {
            return foundPublisher;
        }
        const foundSubscription = (requisition.subscriptions || []).filter((subscription: any) => subscription.id === id)[0];
        if (foundSubscription) {
            return foundSubscription;
        }

        return (requisition.requisitions || [])
            .map((requisition: any) => this.findIdInRequisition(id, requisition))
            .filter((component: any) => !!component)[0];
    }
}
