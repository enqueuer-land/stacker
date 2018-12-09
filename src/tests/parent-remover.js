import ObjectDecycler from "./object-decycler";

export default class ParentRemover {
    constructor() {
    }

    remove(node) {

        return this.deepRemove(new ObjectDecycler().decycle(node));
    }

    deepRemove(node) {
        const clone = {...node};
        delete clone.parent;

        Object.keys(clone).forEach(key => {
            const value = clone[key];
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    for (let index in value) {
                        clone[key][index] = this.deepRemove(value[index]);
                    }
                } else {
                    clone[key] = this.deepRemove(value);
                }
            }
        });
        return clone;

    }
}
