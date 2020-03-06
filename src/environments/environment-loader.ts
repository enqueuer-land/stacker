import * as fs from "fs";
import * as path from "path";
import * as yaml from "yamljs";
import {remote} from "electron";
import {IdCreator} from "@/components/id-creator";

//TODO test it
export class EnvironmentLoader {

    public listenMenuEvents() {
        remote.getGlobal('eventEmitter').on('importPostmanEnvironment', () => EnvironmentLoader.importPostmanEnvironment());
    }

    public load(): any {
        return (remote.dialog.showOpenDialogSync({properties: ['openFile', 'openDirectory', 'multiSelections']}) || [])
            .map((file: string) => EnvironmentLoader.load(file))
            .filter((file: any) => file);
    }

    private static importPostmanEnvironment(): void {
        console.log('importPostmanEnvironment');
    }

    private static load(file: string): any {
        const stats = fs.statSync(file);
        if (stats.isDirectory()) {
            return EnvironmentLoader.loadDirectory(file);
        }
        return EnvironmentLoader.loadFile(file);
    }

    private static loadDirectory(dirname: string): any {
        return fs.readdirSync(dirname).map(file => EnvironmentLoader.loadFile(path.join(dirname, file)));
    }

    private static loadFile(file: string): any {
        try {
            const fileContent = fs.readFileSync(file).toString();
            try {
                return EnvironmentLoader.loadEnvironment(JSON.parse(fileContent));
            } catch (e) {
                try {
                    return EnvironmentLoader.loadEnvironment(yaml.parse(fileContent));
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    private static loadEnvironment(raw: any): any {
        const defaultEnvironment: any = {
            name: 'New Environment',
            id: new IdCreator().create(),
            store: {}
        };
        Object.keys(defaultEnvironment)
            .filter(key => raw[key] !== undefined)
            .forEach(key => {
                defaultEnvironment[key] = raw[key];
            });

        return defaultEnvironment;
    }
}
