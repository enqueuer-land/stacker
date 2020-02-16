import {Components} from "@/components/components";

function getId() {
    return 'ID' + Math.trunc(Math.random() * 999999) + Math.trunc(Math.random() * 999999);
}


export class ComponentFactory {

    public createRequisition = (): any => {
        return {
            id: getId(),
            name: 'New Requisition',
            requisitions: [],
            publishers: [],
            subscriptions: [],
            carabinaMeta: {
                componentName: Components.REQUISITION
            }
        }
    };

    createPublisher(parentRequisition: any) {
        return {
            type: 'HTTP',
            id: getId(),
            name: 'New Publisher',
            carabinaMeta: {
                parentRequisition,
                componentName: Components.PUBLISHER
            }
        }
    }

    createSubscription(parentRequisition: any) {
        return {
            type: 'HTTP',
            id: getId(),
            name: 'New Subscription',
            carabinaMeta: {
                parentRequisition,
                componentName: Components.SUBSCRIPTION
            }
        }

    }
}
