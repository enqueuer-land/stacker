import {ComponentTypes} from "@/components/component-types";

//TODO test it
export class ComponentStylish {
    private readonly component: any;

    constructor(component: any) {
        this.component = component;
    }

    public isRequisition = (): boolean => {
        return this.component.carabinaMeta.componentName === ComponentTypes.REQUISITION;
    };

    public getType = (): string => {
        if (this.component.carabinaMeta.componentName === ComponentTypes.REQUISITION) {
            return '';
        }
        return this.component.type.substr(0, 7);
    };

    public getChildrenLength = (): number => {
        return this.isRequisition() && this.component.requisitions.length +
            this.component.publishers.length +
            this.component.subscriptions.length;
    };

    public getComponentTag = (): string => {
        return this.component.carabinaMeta.componentName
            .substr(0, 3)
            .toUpperCase();

    };

    public componentNameTagStyle = (): any => {
        return {
            'user-select': 'none',
            color: this.getComponentColor()
        };
    };

    public getComponentColor = (): any => {
        const componentName = this.component.carabinaMeta.componentName;
        if (componentName === ComponentTypes.REQUISITION) {
            return 'var(--carabina-requisition-color)'
        } else if (componentName === ComponentTypes.PUBLISHER) {
            return 'var(--carabina-publisher-color)'
        } else if (componentName === ComponentTypes.SUBSCRIPTION) {
            return 'var(--carabina-subscription-color)'
        }
    };

    public componentStyle = (selected: boolean): any => {
        const style: any = {};
        if (selected) {
            style['background-color'] = 'var(--carabina-body-background-color)';
        }
        return style;
    };

    public componentNameStyle = (selected: boolean): any => {
        const style: any = {
            'user-select': 'none'
        };
        if (selected) {
            style['color'] = 'var(--carabina-text-color)';
        }
        return style;
    };
}
