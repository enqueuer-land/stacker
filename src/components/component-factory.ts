import {IdCreator} from '@/components/id-creator';
import {ComponentTypes} from '@/components/component-types';
import {CarabinaPublisher} from '@/models/carabina-publisher';
import {CarabinaRequisition} from '@/models/carabina-requisition';
import {CarabinaSubscription} from '@/models/carabina-subscription';

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

    public createRequisition = (parent?: any): CarabinaRequisition => {
        const requisition: CarabinaRequisition = {
            id: new IdCreator().create(),
            name: 'New requisition',
            iterations: 1,
            delay: 0,
            timeout: 5000,
            parallel: false,
            ignore: false,
            requisitions: [],
            publishers: [],
            subscriptions: [],
            carabinaMeta: {
                parent,
                selected: false,
                collapsed: false,
                type: ComponentTypes.REQUISITION
            }
        };
        if (parent) {
            requisition.name = requisition.name + ' ' + parent.requisitions.length;
            parent.requisitions.push(requisition);
        }
        return requisition;
    };

    private createPublisher = (parent: any): CarabinaPublisher => {
        const publisher: CarabinaPublisher = {
            type: 'HTTP',
            id: new IdCreator().create(),
            name: 'New publisher ' + parent.publishers.length,
            ignore: false,
            url: 'http://localhost:80/',
            method: 'GET',
            headers: {'content-type': 'json/application'},
            payload: '',
            carabinaMeta: {
                parent,
                selected: false,
                type: ComponentTypes.PUBLISHER
            }
        };
        parent.publishers.push(publisher);
        return publisher;
    };

    private createSubscription = (parent: any): CarabinaSubscription => {
        const subscription: CarabinaSubscription = {
            type: 'HTTP',
            timeout: 3000,
            port: 80,
            endpoint: '/',
            method: 'GET',
            avoidable: false,
            response: {
                headers: {'content-type': 'json/application'},
                status: 200,
                payload: ''
            },
            id: new IdCreator().create(),
            name: 'New subscription ' + parent.subscriptions.length,
            ignore: false,
            carabinaMeta: {
                parent,
                selected: false,
                type: ComponentTypes.SUBSCRIPTION
            }
        };
        parent.subscriptions.push(subscription);
        return subscription;

    };
}
