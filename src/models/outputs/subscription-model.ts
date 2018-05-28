import { ReportModel } from './report-model';

export interface SubscriptionModel extends ReportModel {
    readonly type: string;
    readonly connectionTime?: Date | string;
    readonly messageReceivedTime?: Date | string;
}