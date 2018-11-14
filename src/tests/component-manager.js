import {generateId} from "./id-generator";

export default class ComponentManager {
    createRequisition = (base, parent) => {
        const requisition = {
            ...base,
            id: base.id || generateId(),
            name: base.name || 'New Requisition',
            publishers: [],
            subscriptions: [],
            requisitions: [],
            parent: parent,
            component: "requisition"
        };
        requisition.publishers = (base.publishers || []).map(publisher => this.createPublisher(publisher, requisition));
        requisition.subscriptions = (base.subscriptions || []).map(subscription => this.createSubscription(subscription, requisition));
        requisition.requisitions = (base.requisitions || []).map(requisition => this.createRequisition(requisition, requisition));
        return requisition;
    };
    createPublisher = (base, parent) => {
        const newComponent = {
            ...base,
            id: base.id || generateId(),
            name: base.name || 'New Publisher',
            type: base.type || "HTTP",
            parent: parent,
            component: "publisher"
        };
        return newComponent;
    };
    createSubscription = (base, parent) => {
        const newComponent = {
            ...base,
            id: base.id || generateId(),
            name: base.name || 'New Subscription',
            type: base.type || "HTTP",
            parent: parent,
            component: "subscription"
        };
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
    findById(requisition, id) {
        let result = requisition.id === id ? requisition: null;

        (requisition.requisitions || [])
            .filter(requisition => requisition.id === id)
            .forEach(requisition => result = requisition);
        (requisition.publishers || [])
            .filter(publisher => publisher.id === id)
            .forEach(publisher => result = publisher);
        (requisition.subscriptions || [])
            .filter(subscription => subscription.id === id)
            .forEach(subscription => result = subscription);
        return result;
    }
}
