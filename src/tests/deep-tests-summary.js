import TestsSummary from "./tests-summary";

export default class DeepTestsSummary {
    constructor() {
        this.testSummary = new TestsSummary();
    }

    addTest(node) {
        this.findTests(node, []);
        return this;
    }

    getTests() {
        return this.testSummary.getTests();
    }

    getPassingTests() {
        return this.testSummary.getPassingTests();
    }

    getFailingTests() {
        return this.testSummary.getFailingTests();
    }

    getPercentage() {
        return this.testSummary.getPercentage();
    }

    isValid() {
        return this.testSummary.isValid();
    }

    findTests(node, hierarchy) {
        if (node === undefined || node === null) {
            return;
        }
        let addedHierarchy = hierarchy.concat(node.name);
        Object.keys(node).forEach(key => {
            let value = node[key];
            if (key === 'tests') {
                this.sumTests(value, addedHierarchy)
            }
            else if (typeof value === 'object') {
                this.findTests(value, addedHierarchy);
            }
        });
    }

    sumTests(tests, hierarchy) {
        tests.forEach(test => {
            let clone = {
                ...test,
                hierarchy: hierarchy
            };
            this.testSummary.addTest(clone)
        });
    }
}
