import {ComponentTypes} from '@/components/component-types';
import {CarabinaRequisition} from '@/models/carabina-requisition';

export type CarabinaMeta = {
    parent?: CarabinaRequisition;
    filename?: string;
    collapsed?: boolean;
    changedAfterSaving?: boolean;
    type: ComponentTypes;
    selected: boolean;
};

