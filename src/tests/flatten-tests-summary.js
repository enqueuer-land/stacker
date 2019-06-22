export default class FlattenTestsSummary {
    constructor() {
    }

    flatten(node) {
        const iterationIndex = (node.totalIterations > 1) ? ` [${node.iteration}]` : '';
        return this.goDeep(node, [{
            name: node.name + iterationIndex,
            id: node.id
        }]);
    }

    goDeep(node, hierarchy) {
        const tests = Object.keys(node.hooks || {})
            .reduce((acc, hookName) => {
                return acc.concat(node.hooks[hookName].tests
                    .map(test => {
                        return {
                            ...test,
                            hierarchy: hierarchy.concat({
                                name: hookName
                            })
                        };
                    }));
            }, []);


        const nested = (node.subscriptions || [])
            .concat(node.publishers || [])
            .concat(node.requisitions || [])
            .reduce((acc, component) => {
                const iterationCounter = (component.totalIterations > 1) ? ` [${component.iteration}]` : '';
                return acc.concat(this.goDeep(component, hierarchy.concat({
                    name: component.name + iterationCounter,
                    id: component.id
                })));
            }, []);
        return tests.concat(nested);
    }
}
