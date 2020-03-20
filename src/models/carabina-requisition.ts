import {CarabinaComponent} from '@/models/carabina-component';
import {CarabinaPublisher} from '@/models/carabina-publisher';
import {CarabinaSubscription} from '@/models/carabina-subscription';

export interface CarabinaRequisition extends CarabinaComponent {
    delay: number;
    timeout: number;
    parallel: boolean;
    iterations: number;
    publishers: CarabinaPublisher[];
    requisitions: CarabinaRequisition[];
    subscriptions: CarabinaSubscription[];
}
