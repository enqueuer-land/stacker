import {IdCreator} from '@/components/id-creator';
import {CarabinaMeta} from '@/models/carabina-meta';
import {ComponentTypes} from '@/components/component-types';
import {CarabinaPublisher} from '@/models/carabina-publisher';
import {ComponentFactory} from '@/components/component-factory';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {CarabinaSubscription} from '@/models/carabina-subscription';

export class ComponentCloner {

    public static cloneRequisition(rawRequisition: CarabinaRequisition, parent?: CarabinaRequisition): CarabinaRequisition {
        const carabinaMetaBkp = rawRequisition.carabinaMeta;
        const clone = new ComponentFactory().createRequisition(parent);
        Object.keys(rawRequisition)
            .forEach(key => clone[key] = rawRequisition[key]);
        clone.id = new IdCreator().create();
        clone.carabinaMeta = Object.assign({}, carabinaMetaBkp, rawRequisition.carabinaMeta);
        if (parent) {
            clone.carabinaMeta.parent = parent;
        }

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

    public static clonePublisher(component: CarabinaPublisher, parent: CarabinaRequisition): CarabinaPublisher {
        const clone = new ComponentFactory().createComponent(ComponentTypes.PUBLISHER, parent);
        Object.keys(component)
            .forEach(key => clone[key] = component[key]);
        clone.id = new IdCreator().create();
        const overwriteStuff = this.overwriteCarabinaMeta(clone, component.carabinaMeta, parent);
        overwriteStuff.name = ComponentCloner
            .identifyNextName(overwriteStuff.name, 0, parent.publishers);
        return overwriteStuff;
    }

    public static cloneSubscription(component: CarabinaSubscription, parent: CarabinaRequisition): CarabinaSubscription {
        const clone = new ComponentFactory().createComponent(ComponentTypes.SUBSCRIPTION, parent);
        Object.keys(component)
            .forEach(key => clone[key] = component[key]);
        clone.id = new IdCreator().create();
        const overwriteStuff = this.overwriteCarabinaMeta(clone, component.carabinaMeta, parent);
        overwriteStuff.name = ComponentCloner
            .identifyNextName(overwriteStuff.name, 0, parent.subscriptions);
        return overwriteStuff;
    }

    private static overwriteCarabinaMeta(clone: any, carabinaMeta: CarabinaMeta, parent: CarabinaRequisition) {
        const carabinaMetaBkp = clone.carabinaMeta;
        clone.carabinaMeta = Object.assign({}, carabinaMetaBkp, carabinaMeta);
        clone.carabinaMeta.parent = parent;
        return clone;
    }
}
