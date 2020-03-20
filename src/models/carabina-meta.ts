import {ComponentTypes} from '@/components/component-types';
import {CarabinaRequisition} from '@/models/carabina-requisition';

export type CarabinaMeta = {
    parent: CarabinaRequisition;
    selected: false;
    collapsed?: false;
    type: ComponentTypes;
};

