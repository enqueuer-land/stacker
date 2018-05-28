import { ResultPublisherModel } from './result-publisher-model';
import { ResultSubscriptionModel } from './result-subscription-model';

export interface ResultStartEventModel {
    readonly publisher?: ResultPublisherModel;
    readonly subscription?: ResultSubscriptionModel;
}