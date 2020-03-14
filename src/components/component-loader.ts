import * as fs from 'fs';
import * as yaml from 'yamljs';
import {addLog} from '@/store/modules/stage.store';
import {ComponentTypes} from '@/components/component-types';
import {ComponentFactory} from '@/components/component-factory';
import {PostmanCollectionConverter} from '@/postman/postman-collection-converter';

export class ComponentLoader {

    public static async importFile(file: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(file, (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const fileContent = data.toString();
                    try {
                        resolve(ComponentLoader.loadRequisition(JSON.parse(fileContent)));
                    } catch (e) {
                        try {
                            resolve(ComponentLoader.loadRequisition(yaml.parse(fileContent)));
                        } catch (e) {
                            addLog({message: `Error reading '${file}': ${e}`, level: 'ERROR'});
                        }
                    }
                });
            } catch (e) {
                addLog({message: `Error reading '${file}': ${e}`, level: 'ERROR'});
                resolve(null);
            }
        });
    }

    public static async importFromPostman(file: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(file, (err, data) => {
                    if (err) {
                        addLog({message: `Error reading '${file}': ${err}`, level: 'ERROR'});
                        reject(err);
                        return;
                    }
                    const fileContent = JSON.parse(data.toString());
                    const converted = new PostmanCollectionConverter().convert(fileContent as any);
                    resolve(ComponentLoader.loadRequisition(converted));
                });
            } catch (e) {
                addLog({message: `Error reading '${file}': ${e}`, level: 'ERROR'});
                resolve(null);
            }
        });
    }

    public static loadRequisition(rawRequisition: any, parent?: any): any {
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
