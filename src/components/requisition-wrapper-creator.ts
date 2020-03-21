import {ComponentTypes} from '@/components/component-types';
import {CarabinaPublisher} from '@/models/carabina-publisher';
import {CarabinaComponent} from '@/models/carabina-component';
import {ComponentFactory} from '@/components/component-factory';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {ComponentDecycler} from '@/components/component-decycler';
import {CarabinaSubscription} from '@/models/carabina-subscription';

export class RequisitionWrapperCreator {
    private readonly component: CarabinaComponent;

    constructor(component: CarabinaComponent) {
        this.component = component;
    }

    public create(): CarabinaRequisition {
        const type = this.component.carabinaMeta.type;
        const decycled: CarabinaComponent = new ComponentDecycler().decycle(this.component);
        if (type === ComponentTypes.REQUISITION) {
            return decycled as CarabinaRequisition;
        }
        const parent = new ComponentFactory().createRequisition();
        parent.name = decycled.name;
        parent.timeout = -1;
        if (type === ComponentTypes.PUBLISHER) {
            parent.publishers.push(decycled as CarabinaPublisher);
        } else if (type === ComponentTypes.SUBSCRIPTION) {
            parent.subscriptions.push(decycled as CarabinaSubscription);
        }
        return parent;
    }
}
