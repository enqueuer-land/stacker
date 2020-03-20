import {CarabinaComponent} from '@/models/carabina-component';

export interface CarabinaSubscription extends CarabinaComponent {
    type: string;
    timeout: number;
    avoidable: boolean;
}
