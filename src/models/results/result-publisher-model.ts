import { ResultReportModel } from './result-report-model';

export interface ResultPublisherModel extends ResultReportModel {
    readonly type: string;
    readonly publishTime: Date | string;
}