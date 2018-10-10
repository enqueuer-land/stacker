import {RequisitionModel} from './models/outputs/requisition-model';
import {TestModel} from './models/outputs/test-model';

export class TestsAnalyzer {
    private failingTests: TestModel[] = [];
    private passingTests: TestModel[] = [];

    public constructor(report: RequisitionModel) {
        this.findRequisitions([report]);
    }

    public getTestsNumber(): number {
        return this.failingTests.length + this.passingTests.length;
    }

    public getPassingTests(): TestModel[] {
        return this.passingTests;
    }

    public getFailingTests(): TestModel[] {
        return this.failingTests;
    }

    public getPercentage(): number {
        let percentage = Math.trunc(10000 * this.passingTests.length / this.getTestsNumber()) / 100;
        if (isNaN(percentage)) {
            percentage = 100;
        }
        return percentage;
    }

    private findRequisitions(reports: RequisitionModel[] = [], prefix: string = '') {
        reports.forEach((requisition: RequisitionModel) => {
            let hierarchy = prefix + '=>' + requisition.name;
            this.findRequisitions(requisition.requisitions, hierarchy);
            this.findTests(requisition, hierarchy);
        });
    }

    private findTests(requisition: RequisitionModel, hierarchy: string) {
        this.sumTests(requisition.tests, hierarchy + '=>' + requisition.name);

        (requisition.subscriptions || [])
                .forEach(subscription => this.sumTests(subscription.tests, hierarchy + '=>' + subscription.name));
        (requisition.publishers || [])
                .forEach(publisher => this.sumTests(publisher.tests, hierarchy + '=>' + publisher.name));
    }

    private sumTests(tests: TestModel[], hierarchy: string): void {
        tests.forEach(test => {
            console.log(`Test found: ${hierarchy} => ${JSON.stringify(test)}`);
            if (test.valid) {
                this.passingTests.push(test);
            } else {
                this.failingTests.push(test);
            }
        });
    }

}
