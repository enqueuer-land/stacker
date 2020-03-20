import {CarabinaPublisher} from '@/models/carabina-publisher';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {CarabinaSubscription} from '@/models/carabina-subscription';

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

    private findIdInRequisition(id: string, requisition: CarabinaRequisition): CarabinaRequisition | CarabinaPublisher | CarabinaSubscription | undefined {
        if (requisition.id === id) {
            return requisition;
        }

        const foundPublisher = (requisition.publishers || []).filter(publisher => publisher.id === id)[0];
        if (foundPublisher) {
            return foundPublisher;
        }
        const foundSubscription = (requisition.subscriptions || []).filter(subscription => subscription.id === id)[0];
        if (foundSubscription) {
            return foundSubscription;
        }

        return (requisition.requisitions || [])
            .map((requisition: any) => this.findIdInRequisition(id, requisition))
            .filter((component: any) => !!component)[0];
    }
}
