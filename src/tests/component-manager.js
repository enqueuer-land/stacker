import {generateId} from "./id-generator";
import store from '../store'
// import fs from 'fs';

export default class ComponentManager {
    openRequisitionFile = (filename) => {
        console.log(`Should be opening '${filename}' but I don't know how to do it`)
        // console.log(fs.readFileSync(filename).toString());
        const fileRequisition = {
            "timeout": 3000,
            "name": "opened from file req",
            "delay": 9090,
            "iterations": 69,
            "publishers": [
                {
                    "timeout": 123,
                    "name": "opened from file pub",
                    "type": "http",
                    "url": "http://localhost:23068/basic",
                    "method": "POST",
                    "payload": "basic auth",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "onMessageReceived": {
                        "assertions": [
                            {
                                "expect": "body",
                                "toBeEqualTo": "`basic auth response`"
                            }
                        ]
                    }
                }
            ],
            "subscriptions": [
                {
                    "name": "opened from file sub",
                    "type": "http",
                    "endpoint": "/basic",
                    "port": 23068,
                    "method": "POST",
                    "avoid": true,
                    "timeout": 10000,
                    "response": {
                        "headers": {
                            "key": 123
                        },
                        "status": 200,
                        "payload": "basic auth response"
                    },
                    "onMessageReceived": {
                        "assertions": [
                            {
                                "name": "Payload",
                                "expect": "message.body",
                                "toBeEqualTo": "`basic auth`"
                            }
                        ]
                    },
                    "onFinish": {
                        script: 'I am a script',
                        "assertions": [
                            {
                                "name": "Payload",
                                "expect": "message.body",
                                "toBeGreaterThan": "`basic auth`"
                            }
                        ]
                    }
                }
            ]
        };


        // console.log(fs.statSync(filename).toString())

        // let fileRequisitionsArray = [fileRequisition, fileRequisition];
        // if (Array.isArray(fileRequisitionsArray)) {
        //     const base = this.createRequisition({name: filename, requisitions: fileRequisitionsArray});
        //     return new ComponentManager().createRequisition(base);
        // }
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
}
