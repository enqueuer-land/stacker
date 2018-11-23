import {generateId} from "./id-generator";
import store from '../store'

const fs = window.remote.require('fs');
const path = require('path');

export default class ComponentManager {
    openRequisitionFile = (filename) => {
        const fileRequisition = JSON.parse(fs.readFileSync(filename).toString());

        if (Array.isArray(fileRequisition)) {
            const base = this.createRequisition({name: path.basename(filename), requisitions: fileRequisition});
            return new ComponentManager().createRequisition(base);
        }
        return new ComponentManager().createRequisition(fileRequisition);
    };
    createRequisition = (base, parent) => {
        const newRequisition = {
            ...base,
            id: base.id || generateId(),
            name: base.name || 'New Requisition',
            publishers: [],
            subscriptions: [],
            requisitions: [],
            parent: parent,
            component: "requisition"
        };
        newRequisition.publishers = (base.publishers || []).map(publisher => this.createPublisher(publisher, newRequisition));
        newRequisition.subscriptions = (base.subscriptions || []).map(subscription => this.createSubscription(subscription, newRequisition));
        newRequisition.requisitions = (base.requisitions || []).map(requisition => this.createRequisition(requisition, newRequisition));
        return newRequisition;
    };
    createPublisher = (base, parent) => {
        return {
            ...base,
            id: base.id || generateId(),
            name: base.name || 'New Publisher',
            type: base.type || "HTTP",
            parent: parent,
            component: "publisher"
        };
    };
    createSubscription = (base, parent) => {
        return {
            ...base,
            id: base.id || generateId(),
            name: base.name || 'New Subscription',
            type: base.type || "HTTP",
            parent: parent,
            component: "subscription"
        };
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

    isRequisitionValid(requisition) {
        return this.isComponentValid(requisition) &&
            (requisition.requisitions || []).every(requisition => this.isRequisitionValid(requisition)) &&
            (requisition.publishers || []).every(publisher => this.isComponentValid(publisher)) &&
            (requisition.subscriptions || []).every(subscription => this.isComponentValid(subscription));
    }

    isComponentValid(component) {
        return Object.keys(component.errors || {}).length === 0;
    }

    findItem(id) {
        return (store.state.requisitions || [])
            .map(requisition => this.findIdInRequisition(id, requisition))
            .filter(component => !!component)[0];
    }

    findIdInRequisition(id, requisition) {
        let result = requisition.id === id ? requisition : null;

        (requisition.requisitions || [])
            .forEach(requisition => result = this.findIdInRequisition(id, requisition));
        (requisition.publishers || [])
            .filter(publisher => publisher.id === id)
            .forEach(publisher => result = publisher);
        (requisition.subscriptions || [])
            .filter(subscription => subscription.id === id)
            .forEach(subscription => result = subscription);
        return result;
    }

    nodeFilter(node) {
        if (this.itemFilter(node)) {
            return true;
        }
        if (node.publishers.some(leaf => this.itemFilter(leaf))) {
            return true;
        }
        if (node.subscriptions.some(leaf => this.itemFilter(leaf))) {
            return true;
        }
        return node.requisitions.some(node => this.nodeFilter(node));

    }

    itemFilter(leaf) {
        const filter = store.state.filter.toLowerCase();
        if (leaf.type && leaf.type.toLowerCase().indexOf(filter) !== -1) {
            return true;
        }
        return leaf.name.toLowerCase().indexOf(filter) !== -1;
    }

}
