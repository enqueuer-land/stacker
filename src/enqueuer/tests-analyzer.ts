
export class TestsAnalyzer {
    private failingTests: any = [];
    private passingTests: any = [];

    public constructor(report: any) {
        this.findRequisitions([report], []);
    }

    public getTestsNumber(): number {
        return this.failingTests.length + this.passingTests.length;
    }

    public getPassingTests(): any[] {
        return this.passingTests;
    }

    public getFailingTests(): any[] {
        return this.failingTests;
    }

    public getPercentage(): number {
        let percentage = Math.trunc(10000 * this.passingTests.length / this.getTestsNumber()) / 100;
        if (isNaN(percentage)) {
            percentage = 100;
        }
        return percentage;
    }

    private findRequisitions(reports: any[] = [], hierarchy: string[]) {
        reports.forEach((requisition: any) => {
            this.findRequisitions(requisition.requisitions, hierarchy.concat(requisition.name));
            this.findTests(requisition, hierarchy.concat(requisition.name));
        });
    }

    private findTests(requisition: any, hierarchy: string[]) {
        this.sumTests(requisition.tests, hierarchy.concat(requisition.name));

        (requisition.subscriptions || [])
                .forEach((subscription: any) => this.sumTests(subscription.tests, hierarchy.concat(subscription.name)));
        (requisition.publishers || [])
                .forEach((publisher: any) => this.sumTests(publisher.tests, hierarchy.concat(publisher.name)));
    }

    private sumTests(tests: any[], hierarchy: string[]): void {
        tests.forEach(test => {
            if (test.valid) {
                this.passingTests.push({test, hierarchy: hierarchy});
            } else {
                this.failingTests.push({test, hierarchy: hierarchy});
            }
        });
    }

}
