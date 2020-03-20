import {CarabinaMeta} from '@/models/carabina-meta';

export interface CarabinaPublisher {
    id: string;
    name: string;
    type: string;
    ignore: boolean;

    carabinaMeta: CarabinaMeta;
    [propname: string]: any;
}
