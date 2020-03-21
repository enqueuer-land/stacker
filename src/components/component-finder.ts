import {CarabinaComponent} from '@/models/carabina-component';
import {CarabinaRequisition} from '@/models/carabina-requisition';

export class ComponentFinder {
    private readonly requisitions: CarabinaRequisition[];

    public constructor(requisitions: CarabinaRequisition[]) {
        this.requisitions = requisitions || [];
    }

    public findItem(id: string) {
        return this.requisitions
            .map(requisition => this.findIdInRequisition(id, requisition))
            .filter(component => !!component)[0];
    }

    private findIdInRequisition(id: string, requisition: CarabinaRequisition): CarabinaComponent | undefined {
        if (requisition.id === id) {
            return requisition;
        }

        const foundPublisher = (requisition.publishers || []).find(publisher => publisher.id === id);
        if (foundPublisher) {
            return foundPublisher;
        }
        const foundSubscription = (requisition.subscriptions || []).find(subscription => subscription.id === id);
        if (foundSubscription) {
            return foundSubscription;
        }

        return (requisition.requisitions || [])
            .map((requisition: any) => this.findIdInRequisition(id, requisition))
            .find((component: any) => !!component);
    }
}
