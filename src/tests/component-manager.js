import {generateId} from "./id-generator";

export default class ComponentManager {
    createRequisition = (payload) => {
        const newComponent = {
            id: generateId(),
            name: 'New Requisition',
            publishers: [],
            subscriptions: [],
            requisitions: [],
            component: "requisition"
        };
        if (payload.parent !== null && payload.parent !== undefined) {
            payload.parent.requisitions.push(newComponent);
            newComponent.parent = payload.parent;
        }

        return newComponent;
    };
    createPublisher = (payload) => {
        const newComponent = {
            id: generateId(),
            name: 'New Publisher',
            type: "HTTP",
            parent: payload.parent,
            component: "publisher"
        };
        payload.parent.publishers.push(newComponent);
        return newComponent;
    };
    createSubscription = (payload) => {
        const newComponent = {
            id: generateId(),
            name: 'New Subscription',
            type: "HTTP",
            parent: payload.parent,
            component: "subscription"
        };
        payload.parent.subscriptions.push(newComponent);
        return newComponent;
    };
    delete = (item) => {
        if (item.parent) {
            item.parent.requisitions = item.parent.requisitions.filter(requisition => requisition.id !== item.id);
            item.parent.publishers = item.parent.publishers.filter(publisher => publisher.id !== item.id);
            item.parent.subscriptions = item.parent.subscriptions.filter(subscription => subscription.id !== item.id);
        }
        if (item.subscriptions) {
            item.subscriptions = item.subscriptions.filter(subscription => subscription.id !== item.id);
        }
        if (item.publishers) {
            item.publishers = item.publishers.filter(publisher => publisher.id !== item.id);
        }
        if (item.requisitions) {
            item.requisitions = item.requisitions.filter(requisition => requisition.id !== item.id);
        }

    };
}
