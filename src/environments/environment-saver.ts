import * as fs from 'fs';
import * as yaml from 'yamljs';

export class EnvironmentSaver {
    public async save(filename: string, environment: any): Promise<void> {
        return new Promise(resolve => {
            fs.writeFile(filename, yaml.stringify(environment, 100, 2), () => resolve());
        })
    }
}
