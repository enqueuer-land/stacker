import * as fs from 'fs';
import * as yaml from 'yamljs';
import {Logger} from '@/components/logger';
import {IdCreator} from '@/components/id-creator';

export class EnvironmentLoader {

    public static loadFile(file: string): Promise<object> {
        return new Promise((resolve, reject) => {
            fs.readFile(file, async (err, data) => {
                if (err) {
                    Logger.error(`Error reading '${file}': ${err}`);
                } else {
                    const fileContent = data.toString();
                    try {
                        return resolve(await EnvironmentLoader.loadEnvironment(JSON.parse(fileContent)));
                    } catch (e) {
                        try {
                            return resolve(await EnvironmentLoader.loadEnvironment(yaml.parse(fileContent)));
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                reject('Error loading environment');
            });
        });
    }

    public static loadPostmanEnvironment(file: string): Promise<object> {
        return new Promise((resolve, reject) => {
            fs.readFile(file, ((err, data) => {
                if (!err) {
                    try {
                        const raw = JSON.parse(data.toString());
                        raw.store = raw.values
                            .reduce((acc: any, value: any) => {
                                if (value.enabled) {
                                    acc[value.key] = value.value
                                }
                                return acc;
                            }, {});
                        resolve(EnvironmentLoader.loadEnvironment(raw));
                        return;
                    } catch (e) {
                        console.log(e);
                    }
                }
                reject('Error importing postman collection');
            }));
        });
    }

    private static async loadEnvironment(raw: any): Promise<object> {
        if (!raw.store) {
            throw `Invalid environment: no 'store' attribute found`;
        }
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
