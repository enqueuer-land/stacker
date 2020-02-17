import {Components} from "@/components/components";

//TODO test it
export class ComponentStylish {
    private readonly component: any;

    constructor(component: any) {
        this.component = component;
    }

    public shouldPrintType = (): boolean => {
        return this.component.carabinaMeta.componentName !== Components.REQUISITION;
    };

    public getType = (): string => {
        if (this.component.carabinaMeta.componentName === Components.REQUISITION) {
            return '';
        }
        return this.component.type.substr(0, 7);
    };

    public getChildrenLength = (): number => {
        return this.component.requisitions.length +
            this.component.publishers.length +
            this.component.subscriptions.length;
    };

    public getComponentTag = (): string => {
        return this.component.carabinaMeta.componentName
            .substr(0, 3)
            .toUpperCase();

    };

    public componentNameTagStyle = (): any => {
        const style: any = {
        };
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

    public componentStyle = (selected: boolean): any => {
        const style: any = {};
        if (selected) {
            style['background-color'] = 'var(--carabina-body-background-color)';
        }
        return style;
    };

    public componentNameStyle = (selected: boolean): any => {
        const style: any = {};
        if (selected) {
            style['color'] = 'var(--carabina-text-color)';
        }
        return style;
    };
}
