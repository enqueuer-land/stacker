import { ReportModel } from './report-model';

export interface PublisherModel extends ReportModel {
    readonly type: string;
    readonly publishTime: Date | string;
}