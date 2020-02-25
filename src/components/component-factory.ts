import {ComponentTypes} from "@/components/component-types";
import {IdCreator} from "@/components/id-creator";

//TODO test it
export class ComponentFactory {

    public createComponent = (componentType: ComponentTypes, parent?: any): any => {
        switch (componentType) {
            case ComponentTypes.REQUISITION:
                return this.createRequisition(parent);
            case ComponentTypes.PUBLISHER:
                return this.createPublisher(parent);
            case ComponentTypes.SUBSCRIPTION:
                return this.createSubscription(parent);
        }
    };

    public createRequisition = (parent?: any): any => {
        const requisition = {
            id: new IdCreator().create(),
            name: 'New requisition',
            iterations: 1,
            delay: 0,
            timeout: 0,
            parallel: false,
            requisitions: [],
            publishers: [],
            subscriptions: [],
            carabinaMeta: {
                parent,
                selected: false,
                collapsed: false,
                componentName: ComponentTypes.REQUISITION
            }
        };
        if (parent) {
            parent.requisitions.push(requisition);
            parent.carabinaMeta.collapsed = false;
        }
        return requisition;
    };

    private createPublisher = (parent: any): any => {
        const publisher = {
            type: 'HTTP',
            id: new IdCreator().create(),
            name: 'New publisher',
            carabinaMeta: {
                parent,
                selected: false,
                componentName: ComponentTypes.PUBLISHER
            }
        };
        parent.publishers.push(publisher);
        parent.carabinaMeta.collapsed = false;
        return publisher;
    };

    private createSubscription = (parent: any): any => {
        const subscription = {
            type: 'HTTP',
            timeout: 0,
            avoidable: false,
            id: new IdCreator().create(),
            name: 'New subscription',
            carabinaMeta: {
                parent,
                selected: false,
                componentName: ComponentTypes.SUBSCRIPTION
            }
        };
        parent.subscriptions.push(subscription);
        parent.carabinaMeta.collapsed = false;
        return subscription;

    };
}
