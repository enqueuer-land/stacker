import {ComponentCloner} from '@/components/component-cloner';

describe('ComponentCloner', () => {

    it('should clone root requisition', () => {
        const requisition = {
            id: 'id',
            name: 'name',
            requisitions: [],
            publishers: [],
            subscriptions: [],
            carabinaMeta: {
                property: true,
                collapsed: false
            }
        };

        const clone = ComponentCloner.cloneRequisition(requisition);

        expect(clone.name).toBe(requisition.name + ' - (copy)');
        expect(clone.id).not.toBe(requisition.id);
        expect(clone.carabinaMeta.property).toBeTruthy();
        expect(clone.carabinaMeta.collapsed).toBeFalsy();
    });

    it('should clone requisition with parent', () => {
        const parent = {
            id: 'id',
            name: 'parent',
            requisitions: [] as any,
            publishers: [],
            subscriptions: [],
            carabinaMeta: {
                property: true
            }
        };
        const requisition = {
            id: 'id',
            name: 'name',
            requisitions: [],
            publishers: [],
            subscriptions: [],
            carabinaMeta: {
                parent
            }
        };
        parent.requisitions.push(requisition);

        const clone = ComponentCloner.cloneRequisition(requisition, parent);

        expect(clone.carabinaMeta.parent).toEqual(parent);
        expect(parent.requisitions.length).toBe(2);
        expect(parent.requisitions[0]).toEqual(requisition);
        expect(parent.requisitions[1].name).toBe(clone.name);
        expect(parent.requisitions[1].id).toBe(clone.id);
    });

    it('should clone publisher', () => {
        const parent = {
            id: 'id',
            name: 'parent',
            requisitions: [],
            publishers: [] as any,
            subscriptions: [],
            carabinaMeta: {
                property: true
            }
        };
        const publisher = {
            id: 'id',
            name: 'name',
            carabinaMeta: {
                parent
            }
        };
        parent.publishers.push(publisher);

        const clone = ComponentCloner.clonePublisher(publisher, parent);

        expect(clone.carabinaMeta.parent).toEqual(parent);
        expect(parent.publishers.length).toBe(2);
        expect(parent.publishers[0]).toEqual(publisher);
        expect(parent.publishers[1].name).toBe(clone.name);
        expect(parent.publishers[1].id).toBe(clone.id);
    });

    it('should clone subscription', () => {
        const parent = {
            id: 'id',
            name: 'parent',
            requisitions: [],
            publishers: [],
            subscriptions: [] as any,
            carabinaMeta: {
                property: true
            }
        };
        const subscription = {
            id: 'id',
            name: 'name',
            carabinaMeta: {
                parent
            }
        };
        parent.subscriptions.push(subscription);

        const clone = ComponentCloner.cloneSubscription(subscription, parent);

        expect(clone.carabinaMeta.parent).toEqual(parent);
        expect(parent.subscriptions.length).toBe(2);
        expect(parent.subscriptions[0]).toEqual(subscription);
        expect(parent.subscriptions[1].name).toBe(clone.name);
        expect(parent.subscriptions[1].id).toBe(clone.id);
    });

    it('should prettify clone requisition name', () => {
        const parent = {
            id: 'id',
            name: 'parent',
            requisitions: [],
            publishers: [],
            subscriptions: [],
            carabinaMeta: {
                property: true
            }
        };

        const requisition = {
            id: 'id',
            name: 'name',
            requisitions: [],
            publishers: [],
            subscriptions: [],
            carabinaMeta: {
                parent
            }
        };

        const clone = ComponentCloner.cloneRequisition(requisition, parent);
        const clone1 = ComponentCloner.cloneRequisition(requisition, parent);
        const clone2 = ComponentCloner.cloneRequisition(requisition, parent);
        const clone3 = ComponentCloner.cloneRequisition(requisition, parent);

        const clone11 = ComponentCloner.cloneRequisition(clone1);

        expect(clone.name).toBe(requisition.name + ' - (copy)');
        expect(clone1.name).toBe(requisition.name + ' - (copy 1)');
        expect(clone2.name).toBe(requisition.name + ' - (copy 2)');
        expect(clone3.name).toBe(requisition.name + ' - (copy 3)');
        expect(clone11.name).toBe(requisition.name + ' - (copy 1) - (copy)');
    });


    it('should prettify publisher/subscription clone name', () => {
        const parent = {
            id: 'id',
            name: 'parent',
            requisitions: [],
            publishers: [],
            subscriptions: [],
        };

        const publisher = {
            name: 'name',
            carabinaMeta: {
                parent
            }
        };
        const subscription = {
            name: 'name',
            carabinaMeta: {
                parent
            }
        };

        const publisherClone = ComponentCloner.clonePublisher(publisher, parent);
        const publisherClone1 = ComponentCloner.clonePublisher(publisher, parent);
        const publisherClone2 = ComponentCloner.clonePublisher(publisher, parent);

        const subscriptionClone = ComponentCloner.cloneSubscription(subscription, parent);
        const subscriptionClone1 = ComponentCloner.cloneSubscription(subscription, parent);
        const subscriptionClone2 = ComponentCloner.cloneSubscription(subscription, parent);

        expect(publisherClone.name).toBe(publisher.name + ' - (copy)');
        expect(publisherClone1.name).toBe(publisher.name + ' - (copy 1)');
        expect(publisherClone2.name).toBe(publisher.name + ' - (copy 2)');
        expect(subscriptionClone.name).toBe(subscription.name + ' - (copy)');
        expect(subscriptionClone1.name).toBe(subscription.name + ' - (copy 1)');
        expect(subscriptionClone2.name).toBe(subscription.name + ' - (copy 2)');
    });

});
