import * as fs from 'fs';
import * as yaml from 'yamljs';
import {remote} from 'electron';
import {IdCreator} from '@/components/id-creator';
import {ComponentTypes} from '@/components/component-types';
import {ComponentDecycler} from '@/components/component-decycler';

//TODO test it
export class ComponentSaver {

    public save(item: any) {
        const filename = ComponentSaver.pickDestination(item);
        if (!filename) {
            return;
        }
        const componentName = item.carabinaMeta.componentName;
        const decycled = new ComponentDecycler().decycle(item);

        let componentToSave;
        switch (componentName) {
            case ComponentTypes.PUBLISHER:
                componentToSave = {
                    publishers: [decycled],
                    name: decycled.name,
                    id: new IdCreator().create()
                };
                break;
            case ComponentTypes.SUBSCRIPTION:
                componentToSave = {
                    timeout: -1,
                    subscriptions: [decycled],
                    name: decycled.name,
                    id: new IdCreator().create()
                };
                break;
            default:
                componentToSave = decycled;
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

    private static saveRequisition(filename: string, item: any): void {
        fs.writeFileSync(filename, yaml.stringify(item, 100, 2));
    }

}
