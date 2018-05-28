import { ResultReportModel } from './result-report-model';
import { ResultTimeModel } from './result-time-model';
import { ResultSubscriptionModel } from './result-subscription-model';
import { ResultStartEventModel } from './result-start-event-model';

export interface ResultRequisitionModel extends ResultReportModel {
    readonly type: 'requisition';
    readonly id?: string;
    readonly time: ResultTimeModel;
    readonly subscriptions: ResultSubscriptionModel[];
    readonly startEvent: ResultStartEventModel;
}
