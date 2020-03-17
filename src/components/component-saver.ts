import * as fs from 'fs';
import * as yaml from 'yamljs';
import {IdCreator} from '@/components/id-creator';
import {FileDialog} from '@/components/file-dialog';
import {ComponentTypes} from '@/components/component-types';
import {ComponentDecycler} from '@/components/component-decycler';

//TODO test it
export class ComponentSaver {

    public async save(item: any) {
        const filename = await FileDialog.showSaveDialog(item.name + '.nqr.yml');
        if (!filename) {
            return;
        }
        const type = item.carabinaMeta.type;
        const decycled = new ComponentDecycler().decycle(item);

        let componentToSave;
        switch (type) {
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
        await ComponentSaver.saveRequisition(filename, componentToSave);
    }

    private static saveRequisition(filename: string, item: any): Promise<void> {
        return new Promise(resolve => {
            fs.writeFile(filename, yaml.stringify(item, 100, 2), () => {
                resolve();
            });
        });
    }

}
