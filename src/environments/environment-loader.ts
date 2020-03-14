import * as fs from 'fs';
import store from '@/store';
import * as yaml from 'yamljs';
import {remote} from 'electron';
import {Logger} from '@/components/logger';
import {IdCreator} from '@/components/id-creator';
import {FileDialog} from '@/components/file-dialog';

//TODO test it
export class EnvironmentLoader {

    public load(): any {
        return (remote.dialog.showOpenDialogSync({properties: ['openFile', 'multiSelections']}) || [])
            .map((file: string) => EnvironmentLoader.loadFile(file))
            .filter((file: any) => file);
    }

    public static async importPostmanEnvironment(): Promise<object[]> {
        const files = await FileDialog.showOpenDialog();
        return Promise.all(files
            .map(async (file: string) => await EnvironmentLoader.loadPostmanEnvironment(file)));
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
                    Logger.error(`Error reading '${file}': ${e}`);
                }
            }
        } catch (e) {
            Logger.error(`Error reading '${file}': ${e}`);
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

    private static async loadPostmanEnvironment(file: string): Promise<object> {
        return new Promise(resolve => {
            fs.readFile(file, ((err, data) => {
                if (err) {
                    Logger.error(`Error reading '${file}': ${err}`);
                } else {
                    try {
                        const raw = JSON.parse(data.toString());
                        raw.store = (raw.values || [])
                            .reduce((acc: any, value: any) => {
                                if (value.enabled) {
                                    acc[value.key] = value.value
                                }
                                return acc;
                            }, {});
                        resolve(EnvironmentLoader.loadEnvironment(raw));
                        return;
                    } catch (e) {
                        Logger.error(`Error reading '${file}': ${e}`);
                    }
                }
                resolve();
            }));
        });
    }
}
