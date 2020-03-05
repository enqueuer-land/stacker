//TODO test it
import * as fs from 'fs';
import {IdCreator} from '@/components/id-creator';
import {ComponentTypes} from '@/components/component-types';

import {remote} from 'electron';
remote.getGlobal('eventEmitter').on('importFromPostman', () => console.log('iuhhull'));


export class ComponentLoader {

    public loadComponents(): any[] {
        const files = ComponentLoader.pickFiles() || [];
        const map = files.map(file => this.load(file));
        console.log(map);
        return map;
    }

    private static pickFiles(): string[] | undefined {
        return remote.dialog.showOpenDialogSync({
            properties: ['openFile', 'openDirectory', 'multiSelections']
        });
    }

    private load(file: string) {
        const stats = fs.statSync(file);
        if (stats.isDirectory()) {
            return this.loadDirectory(file);
        }
        return this.loadFile(file);
    }

    private loadDirectory(dirname: string) {
        return fs.readdirSync(dirname).map(file => this.loadFile(file));
    }

    private loadFile(file: string) {
        return file;
    }
}
