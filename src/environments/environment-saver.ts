import * as fs from 'fs';
import * as yaml from 'yamljs';
import {CarabinaEnvironment} from '@/models/carabina-environment';

export class EnvironmentSaver {
    public async save(filename: string, environment: CarabinaEnvironment): Promise<void> {
        return new Promise(resolve => {
            fs.writeFile(filename, yaml.stringify(environment, 100, 2), () => resolve());
        })
    }
}
