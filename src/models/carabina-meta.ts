import {ComponentTypes} from '@/components/component-types';
import {CarabinaRequisition} from '@/models/carabina-requisition';

export type CarabinaMeta = {
    parent?: CarabinaRequisition;
    selected: boolean;
    collapsed?: boolean;
    type: ComponentTypes;
};

