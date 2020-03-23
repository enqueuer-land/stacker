import * as fs from 'fs';
import * as yaml from 'yamljs';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {CarabinaComponent} from '@/models/carabina-component';
import {RequisitionWrapperCreator} from '@/components/requisition-wrapper-creator';

export class ComponentSaver {

    public async save(item: CarabinaComponent, filename: string) {
        item.carabinaMeta.filename = filename;
        const componentToSave = new RequisitionWrapperCreator(item).create();
        componentToSave.carabinaMeta.filename = filename;
        await ComponentSaver.saveRequisition(filename, componentToSave);
    }

    private static saveRequisition(filename: string, item: CarabinaRequisition): Promise<void> {
        return new Promise(resolve => {
            fs.writeFile(filename, yaml.stringify(item, 100, 2), () => resolve());
        });
    }

}
