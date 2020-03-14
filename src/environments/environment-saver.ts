import {remote} from 'electron';
import * as fs from 'fs';
import * as yaml from 'yamljs';

//TODO test it
export class EnvironmentSaver {
    public save(environment: any): void {
        const filename = EnvironmentSaver.pickDestination(environment);
        if (!filename) {
            return;
        }
        fs.writeFileSync(filename, yaml.stringify(environment, 100, 2));
    }

    private static pickDestination(item: any): string | undefined {
        return remote.dialog.showSaveDialogSync({
            defaultPath: item.name + '.nqr.env.yml',
            showsTagField: false,
        });
    }

}
