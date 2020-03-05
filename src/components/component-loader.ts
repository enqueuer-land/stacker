import * as fs from 'fs';
import store from '@/store'
import * as path from 'path';
import * as yaml from 'yamljs';
import {remote} from 'electron';
import {ComponentTypes} from '@/components/component-types';
import {ComponentFactory} from "@/components/component-factory";


//TODO test it
export class ComponentLoader {

    public enable() {
        remote.getGlobal('eventEmitter').on('openComponent', () => ComponentLoader.loadComponents());
    }

    public static loadComponents(): void {
        (ComponentLoader.pickFiles() || [])
            .map(file => ComponentLoader.load(file))
            .filter(file => file)
            .forEach(requisition => store.commit('side-bar/addRequisition', requisition));
    }

    private static pickFiles(): string[] | undefined {
        return remote.dialog.showOpenDialogSync({
            properties: ['openFile', 'openDirectory', 'multiSelections']
        });
    }

    private static load(file: string) {
        const stats = fs.statSync(file);
        if (stats.isDirectory()) {
            return ComponentLoader.loadDirectory(file);
        }
        return ComponentLoader.loadFile(file);
    }

    private static loadDirectory(dirname: string) {
        return fs.readdirSync(dirname).map(file => ComponentLoader.loadFile(path.join(dirname, file)));
    }

    private static loadFile(file: string) {
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

    private static loadRequisition(rawRequisition: any, parent?: any) {
        const defaultRequisition = new ComponentFactory().createRequisition(parent);
        Object.keys(rawRequisition)
            .filter(key => !['publishers', 'subscriptions', 'requisitions'].includes(key))
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
            .filter(key => !['publishers', 'subscriptions', 'requisitions'].includes(key))
            .forEach(key => {
                defaultPublisher[key] = component[key];
            });
        return defaultPublisher;
    }

    private static loadSubscription(component: any, parent: any) {
        const defaultPublisher = new ComponentFactory().createComponent(ComponentTypes.SUBSCRIPTION, parent);
        Object.keys(component)
            .filter(key => !['publishers', 'subscriptions', 'requisitions'].includes(key))
            .forEach(key => {
                defaultPublisher[key] = component[key];
            });
        return defaultPublisher;
    }
}
