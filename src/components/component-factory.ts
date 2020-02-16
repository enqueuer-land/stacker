import {Components} from "@/components/components";

function getId() {
    return 'ID' + Math.trunc(Math.random() * 999999) + Math.trunc(Math.random() * 999999);
}


export class ComponentFactory {

    public createRequisition = (): any => {
        return {
            id: getId(),
            name: 'second',
            requisitions: [{
                id: getId(),
                name: 'second',
                requisitions: [],
                publishers: [],
                subscriptions: [],
                carabinaMeta: {
                    componentName: Components.REQUISITION
                }
            }],
            publishers: [{
                type: 'HTTP',
                id: getId(),
                name: 'second',
                requisitions: [],
                publishers: [],
                subscriptions: [],
                carabinaMeta: {
                    componentName: Components.PUBLISHER
                }
            }],
            subscriptions: [],
            carabinaMeta: {
                componentName: Components.REQUISITION
            }
        }
    };

}
