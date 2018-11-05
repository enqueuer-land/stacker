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
}
