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

    private static loadRequisition(rawRequisition: any, parent?: any) {
        const defaultRequisition = new ComponentFactory().createRequisition(parent);
        Object.keys(rawRequisition)
            .filter(key => !['publishers', 'subscriptions', 'requisitions'].includes(key))
            .filter(key => rawRequisition[key] !== undefined)
            .forEach(key => {
                defaultRequisition[key] = rawRequisition[key];
            });
        defaultRequisition.requisitions = (rawRequisition.requisitions || [])
            .map((requisition: any) => ComponentLoader.loadRequisition(requisition, defaultRequisition));
        defaultRequisition.publishers = (rawRequisition.publishers || [])
            .map((publisher: any) => ComponentLoader.loadPublisher(publisher, defaultRequisition));
        defaultRequisition.subscriptions = (rawRequisition.subscriptions || [])
            .map((subscription: any) => ComponentLoader.loadSubscription(subscription, defaultRequisition));
        return defaultRequisition;
    }

    private static loadPublisher(component: any, parent: any) {
        const defaultPublisher = new ComponentFactory().createComponent(ComponentTypes.PUBLISHER, parent);
        Object.keys(component)
            .filter(key => component[key] !== undefined)
            .forEach(key => {
                defaultPublisher[key] = component[key];
            });
        return defaultPublisher;
    }

    private static loadSubscription(component: any, parent: any) {
        const defaultPublisher = new ComponentFactory().createComponent(ComponentTypes.SUBSCRIPTION, parent);
        Object.keys(component)
            .filter(key => component[key] !== undefined)
            .forEach(key => {
                defaultPublisher[key] = component[key];
            });
        return defaultPublisher;
    }
}
