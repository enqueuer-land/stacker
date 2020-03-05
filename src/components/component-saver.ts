import * as fs from 'fs';
import {remote} from 'electron';
import {IdCreator} from '@/components/id-creator';
import {ComponentTypes} from '@/components/component-types';

//TODO test it
export class ComponentSaver {

    public save(item: any) {
        const filename = ComponentSaver.pickDestination(item);
        const componentName = item.carabinaMeta.componentName;
        const metalessComponent = ComponentSaver.removeMetadata(item);
        if (!filename) {
            return;
        }

        let componentToSave;
        switch (componentName) {
            case ComponentTypes.PUBLISHER:
                componentToSave = {
                    publishers: [metalessComponent],
                    name: metalessComponent.name,
                    id: new IdCreator().create()
                };
                break;
            case ComponentTypes.SUBSCRIPTION:
                componentToSave = {
                    timeout: -1,
                    subscriptions: [metalessComponent],
                    name: metalessComponent.name,
                    id: new IdCreator().create()
                };
                break;
            default:
                componentToSave = ComponentSaver.removeMetadataFromRequisition(item);
                break;
        }
        ComponentSaver.saveRequisition(filename, componentToSave);
    }

    private static pickDestination(item: any): string | undefined {
        return remote.dialog.showSaveDialogSync({
            defaultPath: item.name + '.nqr.json',
            showsTagField: false,
        });
    }

    private static removeMetadata(item: any): any {
        const clone = Object.assign({}, item);
        delete clone.carabinaMeta;
        return clone;
    }

    private static saveRequisition(filename: string, item: any): void {
        fs.writeFileSync(filename, JSON.stringify(item, null, 4));
    }

    private static removeMetadataFromRequisition(item: any) {
        const clone = Object.assign({}, item);
        clone.publishers = item.publishers.map((publisher: any) => ComponentSaver.removeMetadata(publisher));
        clone.subscriptions = item.subscriptions.map((subscription: any) => ComponentSaver.removeMetadata(subscription));
        clone.requisitions = item.requisitions.map((requisition: any) => ComponentSaver.removeMetadataFromRequisition(requisition));
        return clone;
    }
}
