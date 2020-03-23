import {ComponentTypes} from '@/components/component-types';
import {CarabinaRequisition} from '@/models/carabina-requisition';

export type CarabinaMeta = {
    filename?: string;
    collapsed?: boolean;
    parent?: CarabinaRequisition;
    selected: boolean;
    type: ComponentTypes;
};

