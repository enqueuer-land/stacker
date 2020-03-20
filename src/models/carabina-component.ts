import {CarabinaMeta} from '@/models/carabina-meta';

export interface CarabinaComponent {
    id: string;
    name: string;
    ignore: boolean;

    carabinaMeta: CarabinaMeta;

    [propname: string]: any;
}
