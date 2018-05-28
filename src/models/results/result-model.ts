import { ResultRequisitionModel } from './result-requisition-model';
import { ResultReportModel } from './result-report-model';

export interface ResultModel extends ResultReportModel {
    readonly id?: string;
    readonly type: 'runnable';
    readonly runnables: ResultModel[] | ResultRequisitionModel[];
}