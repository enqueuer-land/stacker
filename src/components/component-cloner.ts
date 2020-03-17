import {IdCreator} from '@/components/id-creator';
import {ComponentTypes} from '@/components/component-types';
import {ComponentFactory} from '@/components/component-factory';

export class ComponentCloner {

    public static cloneRequisition(rawRequisition: any, parent?: any): any {
        const carabinaMetaBkp = rawRequisition.carabinaMeta;
        const clone = new ComponentFactory().createRequisition(parent);
        Object.keys(rawRequisition)
            .forEach(key => clone[key] = rawRequisition[key]);
        clone.id = new IdCreator().create();
        clone.carabinaMeta = Object.assign({}, carabinaMetaBkp, rawRequisition.carabinaMeta);
        clone.carabinaMeta.parent = parent;

        clone.requisitions = (rawRequisition.requisitions || [])
            .map((requisition: any) => ComponentCloner.cloneRequisition(requisition, clone));
        clone.publishers = (rawRequisition.publishers || [])
            .map((publisher: any) => ComponentCloner.clonePublisher(publisher, clone));
        clone.subscriptions = (rawRequisition.subscriptions || [])
            .map((subscription: any) => ComponentCloner.cloneSubscription(subscription, clone));
        clone.name = ComponentCloner.identifyNextName(clone.name, 0, parent && parent.requisitions);
        return clone;
    }

    private static identifyNextName(currentName: string, attemptNumber: number, list?: any[]): string {
        const possibleNextName = `${currentName} - (copy${attemptNumber > 0 ? ' ' + attemptNumber : ''})`;
        if (list && list.find(item => item.name === possibleNextName)) {
            return this.identifyNextName(currentName, attemptNumber + 1, list);
        }
        return possibleNextName;
    }

    public static clonePublisher(component: any, parent: any) {
        const clone = new ComponentFactory().createComponent(ComponentTypes.PUBLISHER, parent);
        Object.keys(component)
            .forEach(key => clone[key] = component[key]);
        clone.id = new IdCreator().create();
        const overwriteStuff = this.overwriteCarabinaMEta(clone, component, parent);
        overwriteStuff.name = ComponentCloner
            .identifyNextName(overwriteStuff.name, 0, parent.publishers);
        return overwriteStuff;
    }

    public static cloneSubscription(component: any, parent: any) {
        const clone = new ComponentFactory().createComponent(ComponentTypes.SUBSCRIPTION, parent);
        Object.keys(component)
            .forEach(key => clone[key] = component[key]);
        clone.id = new IdCreator().create();
        const overwriteStuff = this.overwriteCarabinaMEta(clone, component, parent);
        overwriteStuff.name = ComponentCloner
            .identifyNextName(overwriteStuff.name, 0, parent.subscriptions);
        return overwriteStuff;
    }

    private static overwriteCarabinaMEta(clone: any, component: any, parent: any) {
        const carabinaMetaBkp = clone.carabinaMeta;
        clone.carabinaMeta = Object.assign({}, carabinaMetaBkp, component.carabinaMeta);
        clone.carabinaMeta.parent = parent;
        return clone;
    }
}
