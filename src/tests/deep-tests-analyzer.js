export default class DeepTestsAnalyzer {
    constructor(report) {
        this.tests = [];
        if (report) {
            this.addTest(report);
        }
    }
    addTest(report) {
        this.findRequisitions([report], []);
    }
    getTests() {
        return this.tests;
    }
    getPassingTests() {
        return this.tests.filter(test => test.valid);
    }
    getFailingTests() {
        return this.tests.filter(test => !test.valid);
    }
    getPercentage() {
        let percentage = Math.trunc(10000 * this.getPassingTests().length / this.getTests().length) / 100;
        if (isNaN(percentage)) {
            percentage = 100;
        }
        return percentage;
    }
    isValid() {
        return this.tests.every(test => test.valid);
    }
    findRequisitions(requisition = [], hierarchy) {
        requisition.forEach((requisition) => {
            this.findRequisitions(requisition.requisitions, hierarchy.concat(requisition.name));
            this.findTests(requisition, hierarchy.concat(requisition.name));
        });
    }
    findTests(requisition, hierarchy) {
        this.sumTests(requisition.tests, hierarchy.concat(requisition.name));
        (requisition.subscriptions || [])
            .forEach((subscription) => this.sumTests(subscription.tests, hierarchy.concat(subscription.name)));
        (requisition.publishers || [])
            .forEach((publisher) => this.sumTests(publisher.tests, hierarchy.concat(publisher.name)));
    }
    sumTests(tests, hierarchy) {
        tests.forEach(test => {
            let clone = {
                ...test,
                hierarchy: hierarchy
            };
            this.tests.push(clone)
        });
    }
}
