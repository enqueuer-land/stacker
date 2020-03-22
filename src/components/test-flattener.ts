import {IdCreator} from '@/components/id-creator';
import {ComponentTypes} from '@/components/component-types';
import {OutputRequisitionModel as RequisitionModel} from 'enqueuer';
import {ReportModel} from 'enqueuer/js/models/outputs/report-model';

export type Hierarchy = {
    name: string;
    id: string;
    [propname: string]: any;
};

export class TestFlattener {
    public flatten(requisitionModel: RequisitionModel): Hierarchy[] {
        return this.goDeep(requisitionModel);
    }

    private goDeep(report: ReportModel, hierarchy: Hierarchy[] = []): Hierarchy[] {
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
        const subscriptions: ReportModel[] = (report.subscriptions || []);
        const publishers: ReportModel[] = (report.publishers || []);
        const requisitions: ReportModel[] = (report.requisitions || []);

        return this.getSubComponentHierarchies(subscriptions, hierarchy, ComponentTypes.SUBSCRIPTION)
            .concat(this.getSubComponentHierarchies(publishers, hierarchy, ComponentTypes.PUBLISHER))
            .concat(this.getSubComponentHierarchies(requisitions, hierarchy, ComponentTypes.REQUISITION));
    }

    private getSubComponentHierarchies(tests: ReportModel[], hierarchy: Hierarchy[], type: ComponentTypes) {
        return tests
            .reduce((acc: Hierarchy[], component: ReportModel) => {
                const iterationCounter = (component.totalIterations > 1) ? ` [${component.iteration}]` : '';
                return acc.concat(this.goDeep(component, hierarchy
                    .concat({
                        type,
                        id: component.id,
                        name: component.name + iterationCounter,
                    })));
            }, []);
    }
}
