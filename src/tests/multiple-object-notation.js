const fs = window.remote.require('fs');
import * as yaml from 'yamljs';

export default class MultipleObjectNotation {
    parse(value) {
        try {
            return new yaml.parse(value);
        }
        catch (ymlErr) {
            try {
                return JSON.parse(value);
            }
            catch (jsonErr) {
                console.error(`Not able to parse as Yaml: ${ymlErr}`);
                console.error(`Not able to parse as Json: ${jsonErr}`);
                throw Error(JSON.stringify({ymlError: ymlErr, jsonError: jsonErr.toString()}));
            }
        }
    }
    loadFromFileSync(filename) {
        return this.parse(fs.readFileSync(filename).toString());
    }
}
