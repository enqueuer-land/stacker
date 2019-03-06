export default class TestsSummary {
    constructor() {
        this.tests = [];
    }
    addTest(tests) {
        this.tests = this.tests.concat(tests);
        return this;
    }
    getTests() {
        return this.tests;
    }
    getNotIgnoredTests() {
        return this.tests.filter(test => !test.ignored);
    }
    getPassingTests() {
        return this.tests.filter(test => test.valid);
    }
    getIgnoredList() {
        return this.tests.filter(test => !!test.ignored);
    }
    getFailingTests() {
        return this.tests.filter(test => !test.valid);
    }
    getPercentage() {
        let percentage = Math.trunc(10000 * this.getPassingTests().length / this.getNotIgnoredTests().length) / 100;
        if (isNaN(percentage)) {
            percentage = 100;
        }
        return percentage;
    }
    isValid() {
        return this.getNotIgnoredTests().every(test => test.valid);
    }
}
