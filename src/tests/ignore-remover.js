import ObjectDecycler from "./object-decycler";

export default class IgnoreRemover {
    constructor() {
    }

    remove(node) {
        return this.deepRemove(new ObjectDecycler().decycle(node));
    }

    deepRemove(node) {
        if (node.ignore) {
            return {};
        }
        const clone = {...node};

        Object.keys(clone).forEach(key => {
            const value = clone[key];
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    for (let index in value) {
                        const child = this.deepRemove(value[index]);
                        if (!child.ignore) {
                            clone[key][index] = child;
                        }
                    }
                } else {
                    const child = this.deepRemove(value);
                    if (!child.ignore) {
                        clone[key] = child;
                    }
                }
            }
        });
        return clone;

    }
}
