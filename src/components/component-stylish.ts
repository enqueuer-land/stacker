import {ComponentTypes} from '@/components/component-types';
import {CarabinaComponent} from '@/models/carabina-component';

export class ComponentStylish {
    private readonly component: CarabinaComponent;

    constructor(component: CarabinaComponent) {
        this.component = component;
    }

    public isRequisition(): boolean {
        return this.component.carabinaMeta.type === ComponentTypes.REQUISITION;
    }

    public getType(): string {
        if (this.component.carabinaMeta.type === ComponentTypes.REQUISITION) {
            return '';
        }
        return this.component.type.substr(0, 7).toUpperCase();
    }

    public getChildrenLength(): number {
        return this.isRequisition() ? this.component.requisitions.length +
            this.component.publishers.length +
            this.component.subscriptions.length : 0;
    }

    public typeTagStyle(): any {
        const style: any = {
            'user-select': 'none',
            color: this.getComponentColor()
        };
        if (this.component.ignore) {
            style['text-decoration'] = 'line-through';
        }
        return style;
    }

    public getComponentColor(): string {
        switch (this.component.carabinaMeta.type) {
            case ComponentTypes.REQUISITION:
                return 'var(--carabina-requisition-color)';
            case ComponentTypes.PUBLISHER:
                return 'var(--carabina-publisher-color)';
            case ComponentTypes.SUBSCRIPTION:
                return 'var(--carabina-subscription-color)'
        }
    }

    public componentStyle(): any {
        const style: any = {};
        if (this.component.carabinaMeta.selected) {
            style['background-color'] = 'var(--carabina-header-background-color)';
        }
        return style;
    }

    public componentNameStyle(): any {
        const style: any = {
            'user-select': 'none'
        };
        if (this.component.carabinaMeta.selected) {
            style['color'] = 'var(--carabina-text-color)';
        }
        if (this.component.ignore) {
            style['text-decoration'] = 'line-through';
        }
        return style;
    }
}
