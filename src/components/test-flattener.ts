import {OutputRequisitionModel as RequisitionModel} from 'enqueuer';
import {ReportModel} from 'enqueuer/js/models/outputs/report-model';
import {IdCreator} from '@/components/id-creator';

//TODO test it
export type Hierarchy = {
    name: string;
    id: string;
    [propname: string]: any;
};

export class TestFlattener {
    flatten(requisitionModel: RequisitionModel): Hierarchy[] {
        return this.goDeep(requisitionModel);
    }

    goDeep(report: ReportModel, hierarchy: Hierarchy[] = []): Hierarchy[] {
        const tests = Object
            .keys(report.hooks || {})
            .reduce((acc: Hierarchy[], hookName) => {
                return acc.concat(report.hooks![hookName]
                    .tests
                    .map(test => {
                        return {
                            ...test,
                            arguments: report.hooks![hookName].arguments,
                            id: new IdCreator().create(),
                            hierarchy: hierarchy.concat({
                                name: hookName,
                                id: new IdCreator().create(),
                            })
                        };
                    }));
            }, []);
        const nested = this.getNestedTests(report, hierarchy);
        return tests.concat(nested);
    }

    private getNestedTests(report: ReportModel, hierarchy: Hierarchy[]): Hierarchy[] {
        const subComponents: ReportModel[] = (report.subscriptions || [])
            .concat(report.publishers || [])
            .concat(report.requisitions || []);

        return subComponents
            .reduce((acc: Hierarchy[], component: ReportModel) => {
                const iterationCounter = (component.totalIterations > 1) ? ` [${component.iteration}]` : '';
                return acc.concat(this.goDeep(component, hierarchy
                    .concat({
                        id: component.id,
                        name: component.name + iterationCounter,
                    })));
            }, []);
    }
}
