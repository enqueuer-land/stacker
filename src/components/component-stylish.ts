import {InputRequisitionModel, InputPublisherModel, InputSubscriptionModel} from 'enqueuer';
import {Components} from "@/components/components";

//TODO test it
export class ComponentStylish {
    private readonly component: InputRequisitionModel | InputPublisherModel | InputSubscriptionModel;

    constructor(component: InputRequisitionModel | InputPublisherModel | InputSubscriptionModel) {
        this.component = component;
    }

    public shouldPrintType = (): boolean => {
        return this.component.carabinaMeta.componentName !== Components.REQUISITION;
    };

    public getType = (): string => {
        if (this.component.carabinaMeta.componentName === Components.REQUISITION) {
            return '';
        }
        return this.component.type;
    };

    public getComponentTag = (): string => {
        return this.component.carabinaMeta.componentName
            .substr(0, 3)
            .toUpperCase();

    };

    public componentNameTagStyle = (): any => {
        const style: any = {};
        const componentName = this.component.carabinaMeta.componentName;
        if (componentName === Components.REQUISITION) {
            style['color'] = 'var(--carabina-requisition-color)'
        } else if (componentName === Components.PUBLISHER) {
            style['color'] = 'var(--carabina-publisher-color)'
        } else if (componentName === Components.SUBSCRIPTION) {
            style['color'] = 'var(--carabina-subscription-color)'
        }
        return style;
    };
}
