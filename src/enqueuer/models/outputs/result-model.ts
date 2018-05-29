import { RequisitionModel } from './requisition-model';
import { ReportModel } from './report-model';

export interface ResultModel extends ReportModel {
    readonly id?: string;
    readonly type: 'runnable';
    readonly runnables: (ResultModel | RequisitionModel)[];
}