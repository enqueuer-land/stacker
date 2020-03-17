import {IdCreator} from '@/components/id-creator';
import {ComponentTypes} from '@/components/component-types';
import {ComponentFactory} from '@/components/component-factory';

//TODO test it
export class ComponentCloner {

    public static cloneRequisition(rawRequisition: any, parent?: any): any {
        let clone = new ComponentFactory().createRequisition(parent);
        const carabinaMetaBkp = clone.carabinaMeta;
        clone = Object.assign({}, clone, rawRequisition);
        clone.carabinaMeta = Object.assign({}, carabinaMetaBkp, rawRequisition.carabinaMeta);

        clone.requisitions = (rawRequisition.requisitions || [])
            .map((requisition: any) => ComponentCloner.cloneRequisition(requisition, clone));
        clone.publishers = (rawRequisition.publishers || [])
            .map((publisher: any) => ComponentCloner.clonePublisher(publisher, clone));
        clone.subscriptions = (rawRequisition.subscriptions || [])
            .map((subscription: any) => ComponentCloner.cloneSubscription(subscription, clone));
        clone.name += ' (clone)';
        clone.id = new IdCreator().create();
        return clone;
    }

    public static clonePublisher(component: any, parent: any) {
        const clone = new ComponentFactory().createComponent(ComponentTypes.PUBLISHER, parent);
        return this.overwriteStuff(clone, component);
    }

    public static cloneSubscription(component: any, parent: any) {
        const clone = new ComponentFactory().createComponent(ComponentTypes.SUBSCRIPTION, parent);
        return this.overwriteStuff(clone, component);
    }

    private static overwriteStuff(clone: any, component: any) {
        const carabinaMetaBkp = clone.carabinaMeta;
        clone = Object.assign({}, clone, component);
        clone.carabinaMeta = Object.assign({}, carabinaMetaBkp, component.carabinaMeta);
        clone.id = new IdCreator().create();
        clone.name += ' (clone)';
        return clone;
    }
}
