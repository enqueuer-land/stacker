import ObjectDecycler from "./object-decycler";
import {generateId} from "./id-generator";

export default class IdReplacer {
    constructor() {
    }

    replace(node) {
        return this.deepReplace(new ObjectDecycler().decycle(node));
    }

    deepReplace(node) {
        const clone = Object.assign({}, node);
        if (clone.id !== undefined) {
            clone.id = generateId();
        }

        Object.keys(clone).forEach(key => {
            const value = clone[key];
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    for (let index in value) {
                        clone[key][index] = this.deepReplace(value[index]);
                    }
                } else {
                    clone[key] = this.deepReplace(value);
                }
            }
        });
        return clone;

    }
}
