import {generateId} from "./id-generator";
import store from '../store'
import ObjectDecycler from "./object-decycler";
import MultipleObjectNotation from "./multiple-object-notation";

const fs = window.remote.require('fs');
import path from 'path';


//TODO split it in several several classes
export default class ComponentManager {
    openRequisitionsDirectory(filename) {
        const requisitionFiles = fs.readdirSync(filename)
            .map(file => filename + '/' + file)
            .filter(file => fs.lstatSync(file).isFile())
            .map(file => this.openRequisitionFile(file));
        return this.createRequisition({name: this.removeFilenameExtension(filename), requisitions: requisitionFiles});
    };

    openRequisitionFile(filename) {
        if (fs.lstatSync(filename).isDirectory()) {
            return this.openRequisitionsDirectory(filename);
        } else {
            const fileRequisition = new MultipleObjectNotation().loadFromFileSync(filename);
            let nameWithNoExtension = this.removeFilenameExtension(filename);
            if (Array.isArray(fileRequisition)) {
                return this.createRequisition({name: nameWithNoExtension, requisitions: fileRequisition});
            } else {
                if (!fileRequisition.name) {
                    fileRequisition.name = nameWithNoExtension;
                }
                return this.createRequisition(fileRequisition);
            }
        }
    };

    removeFilenameExtension(filename) {
        let nameWithNoExtension = path.basename(filename);
        const dotIndex = nameWithNoExtension.lastIndexOf(".");
        if (dotIndex !== -1) {
            nameWithNoExtension = nameWithNoExtension.substring(0, dotIndex);
        }
        return nameWithNoExtension;
    }

    saveFile(name, requisition) {
        delete requisition.parent;
        const decycle = new ObjectDecycler().decycle(requisition);
        fs.writeFileSync(name, JSON.stringify(decycle, null, 2));
    }

    createRequisition(base, parent) {
        let name = base.name;
        if (name === undefined) {
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
        new ComponentManager().propagateValidationToParents(item, true);

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
        if (component.invalidChildren && component.invalidChildren.length > 0) {
            return false;
        }
        return true;
    }

    isAbleToBePastedIn(parentItem) {
        try {
            const clipboard = electron.clipboard.readText();
            const parsedClipboard = new MultipleObjectNotation().parse(clipboard);
            if (!parentItem) {
                return parsedClipboard.component === 'requisition';
            } else {
                if (parentItem.component === 'requisition') {
                    return parsedClipboard.component === 'requisition' || parsedClipboard.component === 'publisher' || parsedClipboard.component === 'subscription';
                }
            }
        } catch (e) {
        }
        return false;
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

    itemFilter(node) {
        return this.decycledItemFilter(new ObjectDecycler().decycle(node));
    }

    decycledItemFilter(node) {
        const filter = store.state.filter.toLowerCase();
        if (node === undefined || node === null || filter.length < 1) {
            return true;
        }

        for (let key of Object.keys(node)) {
            const value = node[key];
            if (typeof value !== 'object') {
                if (value.toString().toLowerCase().indexOf(filter) !== -1) {
                    return true;
                }
            } else {
                if (Array.isArray(value)) {
                    for (let index in value) {
                        if (value[index]) {
                            if (this.decycledItemFilter(value[index])) {
                                return true;
                            }

                        }
                    }
                } else {
                    if (key !== 'parent') {
                        if (this.decycledItemFilter(value)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    propagateValidationToParents(item, valid) {
        let parent = item.parent;
        while (parent !== undefined) {
            parent.invalidChildren = parent.invalidChildren
                .filter(invalidChild => invalidChild.id !== item.id);
            if (!valid) {
                parent.invalidChildren.push(item);
            }
            parent = parent.parent;
        }
    }

    isItemIgnored(item) {
        if (item.ignore) {
            return true;
        }

        let parent = item.parent;
        while (parent !== undefined) {
            if (parent.ignore) {
                return true;
            }
            parent = parent.parent;
        }

        return false;
    }


}
