import {CarabinaMeta} from '@/models/carabina-meta';
import {CarabinaPublisher} from '@/models/carabina-publisher';
import {CarabinaSubscription} from '@/models/carabina-subscription';

export interface CarabinaRequisition {
    id: string;
    name: string;
    delay: number;
    timeout: number;
    ignore: boolean;
    parallel: boolean;
    iterations: number;
    publishers: CarabinaPublisher[];
    requisitions: CarabinaRequisition[];
    subscriptions: CarabinaSubscription[];

    carabinaMeta: CarabinaMeta;
    [propname: string]: any;
}
