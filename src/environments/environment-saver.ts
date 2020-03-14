import * as fs from 'fs';
import * as yaml from 'yamljs';
import {FileDialog} from '@/components/file-dialog';

//TODO test it
export class EnvironmentSaver {
    public async save(environment: any): Promise<void> {
        const filename = await FileDialog.showSaveDialog(environment.name + '.nqr.env.yml');
        if (!filename) {
            return;
        }
        fs.writeFileSync(filename, yaml.stringify(environment, 100, 2));
    }
}
