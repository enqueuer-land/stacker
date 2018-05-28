import { ResultReportModel } from './result-report-model';

export interface ResultSubscriptionModel extends ResultReportModel {
    readonly type: string;
    readonly connectionTime?: Date | string;
    readonly messageReceivedTime?: Date | string;
}