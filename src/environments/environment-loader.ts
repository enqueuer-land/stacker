import * as fs from 'fs';
import * as yaml from 'yamljs';
import {Logger} from '@/components/logger';
import {IdCreator} from '@/components/id-creator';
import {FileDialog} from '@/components/file-dialog';

//TODO test it
export class EnvironmentLoader {

    public static async importEnvironment(): Promise<object[]> {
        const files = await FileDialog.showOpenDialog();
        return Promise.all(files
            .map(async (file: string) => await EnvironmentLoader.loadFile(file)));
    }

    public static async importPostmanEnvironment(): Promise<object[]> {
        const files = await FileDialog.showOpenDialog();
        return Promise.all(files
            .map(async (file: string) => await EnvironmentLoader.loadPostmanEnvironment(file)));
    }

    private static loadFile(file: string): Promise<object> {
        return new Promise(resolve => {
            fs.readFile(file, (err, data) => {
                if (err) {
                    Logger.error(`Error reading '${file}': ${err}`);
                } else {
                    const fileContent = data.toString();
                    try {
                        return resolve(EnvironmentLoader.loadEnvironment(JSON.parse(fileContent)));
                    } catch (e) {
                        try {
                            return resolve(EnvironmentLoader.loadEnvironment(yaml.parse(fileContent)));
                        } catch (e) {
                            Logger.error(`Error parsing '${file}': ${e}`);
                        }
                    }
                }
                resolve();
            });
        });
    }

    private static loadEnvironment(raw: any): object {
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
