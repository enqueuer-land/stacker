import {generateId} from "./id-generator";
import store from '../store'
import ObjectDecycler from "./object-decycler";
import MultipleObjectNotation from "./multiple-object-notation";

const fs = window.remote.require('fs');
import path from 'path';// const { parse } = path;

export default class ComponentManager {
    openRequisitionFile = (filename) => {
        const fileRequisition = new MultipleObjectNotation().loadFromFileSync(filename);

        if (Array.isArray(fileRequisition)) {
            let nameWithNoExtension = path.basename(filename);
            const dotIndex = nameWithNoExtension.lastIndexOf(".");
            if (dotIndex !== -1) {
                console.log(dotIndex)
                nameWithNoExtension = nameWithNoExtension.substring(0, dotIndex);
            }
            const base = this.createRequisition({name: nameWithNoExtension, requisitions: fileRequisition});
            return new ComponentManager().createRequisition(base);
        }
        return new ComponentManager().createRequisition(fileRequisition);
    };
    saveRequisitionFile(name, requisition) {
        const decycle = new ObjectDecycler().decycle(requisition);
        fs.writeFileSync(name, JSON.stringify(decycle, null, 2));
    }
    createRequisition = (base, parent) => {
        let name = base.name;
        if (!name) {
            if (parent !== undefined) {
              name = 'Requisition #' + parent.requisitions.length;
            } else {
                name = 'New Requisition';
            }
        }
        const newRequisition = {
            ...base,
            id: base.id || generateId(),
            name: name,
            publishers: [],
            subscriptions: [],
            requisitions: [],
            parent: parent,
            errors: [],
            invalidChildren: [],
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
            name: base.name || 'Publisher #' + parent.publishers.length,
            type: base.type || "HTTP",
            parent: parent,
            errors: [],
            component: "publisher"
        };
    };
    createSubscription = (base, parent) => {
        return {
            ...base,
            id: base.id || generateId(),
            name: base.name || 'Subscription #' + parent.subscriptions.length,
            type: base.type || "HTTP",
            parent: parent,
            errors: [],
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
        if (component.errors && component.errors.length > 0) {
            return false;
        }
        if (component.invalidChildren&& component.invalidChildren.length > 0) {
            return false;
        }
        return true;
    }

    findItem(id) {
        let any = (store.state.requisitions || [])
            .map(requisition => this.findIdInRequisition(id, requisition))
            .filter(component => !!component)[0];
        return any;
    }

    findIdInRequisition(id, requisition) {
        if (requisition.id === id) {
            return requisition;
        }

        const foundPublisher = (requisition.publishers || []).filter(publisher => publisher.id === id)[0];
        if (foundPublisher) {
            return foundPublisher;
        }
        const foundSubscription = (requisition.subscriptions || []).filter(subscription => subscription.id === id)[0];
        if (foundSubscription) {
            return foundSubscription;
        }

        return (requisition.requisitions || [])
            .map(requisition => this.findIdInRequisition(id, requisition))
            .filter(component => !!component)[0];
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
