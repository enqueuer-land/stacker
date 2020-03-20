import path from 'path'
import * as fs from 'fs';
import * as yaml from 'yamljs';
import {Logger} from '@/components/logger';
import {ComponentTypes} from '@/components/component-types';
import {CarabinaPublisher} from '@/models/carabina-publisher';
import {ComponentFactory} from '@/components/component-factory';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {CarabinaSubscription} from '@/models/carabina-subscription';
import {PostmanCollectionConverter} from '@/postman/postman-collection-converter';

export class ComponentLoader {

    public static async importFile(file: string): Promise<CarabinaRequisition> {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(file, (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const fileContent = data.toString();
                    try {
                        resolve(ComponentLoader.loadRequisitionAsAnArrayOrObject(file, JSON.parse(fileContent)));
                    } catch (e) {
                        try {
                            resolve(ComponentLoader.loadRequisitionAsAnArrayOrObject(file, yaml.parse(fileContent)));
                        } catch (e) {
                            Logger.error(`Error reading '${file}': ${e}`);
                        }
                    }
                });
            } catch (e) {
                Logger.error(`Error reading '${file}': ${e}`);
                reject(`Error reading '${file}': ${e}`);
            }
        });
    }

    public static async importFromPostman(file: string): Promise<CarabinaRequisition> {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(file, (err, data) => {
                    if (err) {
                        Logger.error(`Error reading '${file}': ${err}`);
                        reject(err);
                        return;
                    }
                    const fileContent = JSON.parse(data.toString());
                    const converted = new PostmanCollectionConverter().convert(fileContent as any);
                    resolve(ComponentLoader.loadRequisition(converted));
                });
            } catch (e) {
                Logger.error(`Error reading '${file}': ${e}`);
                reject(`Error reading '${file}': ${e}`);
            }
        });
    }

    private static loadRequisitionAsAnArrayOrObject(file: string, parsed: any): CarabinaRequisition {
        if (Array.isArray(parsed)) {
            return ComponentLoader.loadRequisition({
                name: path.parse(file).name,
                requisitions: parsed
            });
        }
        return ComponentLoader.loadRequisition(parsed);
    }


    public static loadRequisition(rawRequisition: any, parent?: CarabinaRequisition): CarabinaRequisition {
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

    private static loadPublisher(component: any, parent: CarabinaRequisition): CarabinaPublisher {
        let defaultPublisher = new ComponentFactory().createComponent(ComponentTypes.PUBLISHER, parent);
        const carabinaMetaBkp = defaultPublisher.carabinaMeta;
        defaultPublisher = Object.assign({}, defaultPublisher, component);
        defaultPublisher.carabinaMeta = Object.assign({}, carabinaMetaBkp, component.carabinaMeta);
        return defaultPublisher;
    }

    private static loadSubscription(component: any, parent: CarabinaRequisition): CarabinaSubscription {
        let defaultSubscription = new ComponentFactory().createComponent(ComponentTypes.SUBSCRIPTION, parent);
        const carabinaMetaBkp = defaultSubscription.carabinaMeta;
        defaultSubscription = Object.assign({}, defaultSubscription, component);
        defaultSubscription.carabinaMeta = Object.assign({}, carabinaMetaBkp, component.carabinaMeta);
        return defaultSubscription;
    }

}
