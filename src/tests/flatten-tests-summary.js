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

    getNotIgnoredTests() {
        return this.testSummary.getNotIgnoredTests();
    }

    getPassingTests() {
        return this.testSummary.getPassingTests();
    }

    getIgnoredList() {
        return this.testSummary.getIgnoredList();
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
        const clonedHierarchy = JSON.parse(JSON.stringify(hierarchy));
        if (node === undefined || node === null) {
            return;
        }

        if (node.ignored === true) {
            this.testSummary.addTest({hierarchy: clonedHierarchy, ignored: true, name: 'Skipped'});
        } else {
            Object.keys(node).forEach(key => {
                const value = node[key];
                if (key === 'tests') {
                    this.sumTests(value, clonedHierarchy)
                } else if (key === 'publishers' || key === 'subscriptions' || key === 'requisitions') {
                    if (typeof value === 'object') {
                        if (Array.isArray(value)) {
                            value.forEach((item => {
                                const updatedHierarchy = clonedHierarchy.concat(item);
                                this.findTests(item, updatedHierarchy);
                            }));
                        } else {
                            const updatedHierarchy = clonedHierarchy.concat(value);
                            this.findTests(value, updatedHierarchy);
                        }
                    }
                }
            });

        }

    }

    sumTests(tests, hierarchy) {
        tests.forEach(test => {
            if (test.valid !== undefined &&
                test.description !== undefined &&
                test.name !== undefined) {
                const clone = Object.assign({}, test, {hierarchy: hierarchy});
                this.testSummary.addTest(clone)
            }
        });
    }
}
