export default class TestsAnalyzer {
    constructor() {
        this.tests = [];
    }

    addTest(report) {
        this.findRequisitions(report);
        return this;
    }

    isValid() {
        return this.getNotIgnoredTests().every(test => test.valid);
    }

    getTests() {
        return this.tests;
    }

    getNotIgnoredTests() {
        return this.tests.filter(test => test.ignored === false || test.ignored === undefined);
    }

    getIgnoredList() {
        return this.tests.filter(test => test.ignored !== false && test.ignored !== undefined);
    }

    getPassingTests() {
        return this.tests.filter(test => test.valid && !test.ignored);
    }

    getFailingTests() {
        return this.tests.filter(test => !test.valid && !test.ignored);
    }

    getPercentage() {
        let percentage = Math.trunc(10000 * this.getPassingTests().length / this.getNotIgnoredTests().length) / 100;
        if (isNaN(percentage)) {
            percentage = 100;
        }
        return percentage;
    }

    findRequisitions(requisition) {
        this.findTests(requisition);
        (requisition.requisitions || []).forEach((child) => {
            this.findRequisitions(child);
        });
    }

    findTests(requisition) {
        this.computeComponent(requisition);
        for (const child of (requisition.subscriptions || []).concat(requisition.publishers || [])) {
            this.computeComponent(child);
        }
    }

    computeComponent(reportModel) {
        if (reportModel.ignored) {
            this.tests.push(Object.assign({}, reportModel, {description: reportModel.description || 'Ignored'}));
        } else {
            Object.keys(reportModel.hooks || {}).forEach((key) => {
                const hook = reportModel.hooks[key];
                this.tests = this.tests.concat(hook.tests || []);
            });
        }
    }
}
