import { PublisherModel } from './publisher-model';
import { SubscriptionModel } from './subscription-model';

export interface StartEventModel {
    readonly publisher?: PublisherModel;
    readonly subscription?: SubscriptionModel;
}