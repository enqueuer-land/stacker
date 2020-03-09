import * as fs from 'fs';
import * as yaml from 'yamljs';
import {ComponentTypes} from '@/components/component-types';
import {ComponentFactory} from '@/components/component-factory';
import {PostmanCollectionConverter} from '@/postman/postman-collection-converter';

export class ComponentLoader {

    public static importFile(file: string): any {
        try {
            const fileContent = fs.readFileSync(file).toString();
            try {
                return ComponentLoader.loadRequisition(JSON.parse(fileContent));
            } catch (e) {
                try {
                    return ComponentLoader.loadRequisition(yaml.parse(fileContent));
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public static importFromPostman(file: string): any {
        try {
            const fileContent = JSON.parse(fs.readFileSync(file).toString());
            const converted = new PostmanCollectionConverter().convert(fileContent as any);
            return ComponentLoader.loadRequisition(converted);
        } catch (e) {
            console.log(e);
        }
    }

    public static loadRequisition(rawRequisition: any, parent?: any) {
        let defaultRequisition = new ComponentFactory().createRequisition(parent);

        const carabinaMetaBkp = defaultRequisition.carabinaMeta;
        defaultRequisition = Object.assign({}, defaultRequisition, rawRequisition);
        defaultRequisition.carabinaMeta = Object.assign({}, carabinaMetaBkp, rawRequisition.carabinaMeta);

        defaultRequisition.requisitions = (rawRequisition.requisitions || [])
            .map((requisition: any) => ComponentLoader.loadRequisition(requisition, defaultRequisition));
        defaultRequisition.publishers = (rawRequisition.publishers || [])
            .map((publisher: any) => ComponentLoader.loadPublisher(publisher, defaultRequisition));
        defaultRequisition.subscriptions = (rawRequisition.subscriptions || [])
            .map((subscription: any) => ComponentLoader.loadSubscription(subscription, defaultRequisition));
        return defaultRequisition;
    }

    private static loadPublisher(component: any, parent: any) {
        let defaultPublisher = new ComponentFactory().createComponent(ComponentTypes.PUBLISHER, parent);
        const carabinaMetaBkp = defaultPublisher.carabinaMeta;
        defaultPublisher = Object.assign({}, defaultPublisher, component);
        defaultPublisher.carabinaMeta = Object.assign({}, carabinaMetaBkp, component.carabinaMeta);
        return defaultPublisher;
    }

    private static loadSubscription(component: any, parent: any) {
        let defaultSubscription = new ComponentFactory().createComponent(ComponentTypes.SUBSCRIPTION, parent);
        const carabinaMetaBkp = defaultSubscription.carabinaMeta;
        defaultSubscription = Object.assign({}, defaultSubscription, component);
        defaultSubscription.carabinaMeta = Object.assign({}, carabinaMetaBkp, component.carabinaMeta);
        return defaultSubscription;
    }
}
