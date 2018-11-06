import TestsSummary from "./tests-summary";

export default class FlattenTestsSummary {
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
        Object.keys(node).forEach(key => {
            let value = node[key];
            if (key === 'tests') {
                this.sumTests(value, hierarchy)
            }
            else if (typeof value === 'object') {
                let updatedHierarchy = hierarchy.concat(node);
                this.findTests(value, updatedHierarchy);
            }
        });
    }

    sumTests(tests, hierarchy) {
        tests.forEach(test => {
            if (test.valid !== undefined &&
                test.description !== undefined &&
                test.name !== undefined) {
                let clone = {
                    ...test,
                    hierarchy: hierarchy
                };
                this.testSummary.addTest(clone)
            }
        });
    }
}
