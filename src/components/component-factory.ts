import {Components} from "@/components/components";
import {IdCreator} from "@/components/id-creator";

//TODO test it
export class ComponentFactory {

    public createRequisition = (): any => {
        return {
            id: new IdCreator().create(),
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
            id: new IdCreator().create(),
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
            id: new IdCreator().create(),
            name: 'New Subscription',
            carabinaMeta: {
                parentRequisition,
                componentName: Components.SUBSCRIPTION
            }
        }

    }
}
