import { ReportModel } from './report-model';
import { TimeModel } from './time-model';
import { SubscriptionModel } from './subscription-model';
import { StartEventModel } from './start-event-model';

export interface RequisitionModel extends ReportModel {
    readonly type: 'requisition';
    readonly id?: string;
    readonly time: TimeModel;
    readonly subscriptions: SubscriptionModel[];
    readonly startEvent: StartEventModel;
}
