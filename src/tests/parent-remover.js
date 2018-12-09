export default class ParentRemover {
    constructor() {
    }

    remove(node) {
        const clone = {...node};
        delete clone.parent;

        Object.keys(clone).forEach(key => {
            const value = clone[key];
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    for (let index in value) {
                        clone[key][index] = this.remove(value[index]);
                    }
                } else {
                    clone[key] = this.remove(value);
                }
            }
        });
        return clone;
    }
}
