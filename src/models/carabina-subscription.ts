import {CarabinaMeta} from '@/models/carabina-meta';

export interface CarabinaSubscription {
    id: string;
    type: string;
    name: string;
    timeout: number;
    ignore: boolean;
    avoidable: boolean;

    carabinaMeta: CarabinaMeta;
    [propname: string]: any;
}
