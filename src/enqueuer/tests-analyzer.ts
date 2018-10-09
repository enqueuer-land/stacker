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

    private findRequisitions(reports: RequisitionModel[] = []) {
        reports.forEach((requisition: RequisitionModel) => {
            this.findRequisitions(requisition.requisitions);
            this.findTests(requisition);
        });
    }

    private findTests(requisition: RequisitionModel) {
        this.sumTests(requisition.tests);
        if (requisition.subscriptions) {
            requisition.subscriptions
                .forEach(subscription => this.sumTests(subscription.tests));
        }
        if (requisition.publishers) {
            requisition.publishers
                .forEach(publisher => this.sumTests(publisher.tests));
        }
    }

    private sumTests(tests: TestModel[]): void {
        tests.forEach(test => {
            if (test.valid) {
                this.passingTests.push(test);
            } else {
                this.failingTests.push(test);
            }
        });
    }

}