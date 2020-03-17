import {ComponentTypes} from '@/components/component-types';
import {ComponentFactory} from '@/components/component-factory';

describe('ComponentFactory', () => {

    it('should createRequisition with no parent', () => {
        const requisition = new ComponentFactory().createRequisition();

        expect(requisition.carabinaMeta.collapsed).toBeFalsy();
        expect(requisition.carabinaMeta.selected).toBeFalsy();
        expect(requisition.carabinaMeta.type).toBe(ComponentTypes.REQUISITION);
        expect(requisition.carabinaMeta.parent).toBeUndefined();

        expect(requisition.id).toBeDefined();
        expect(requisition.name).toBeDefined();
        expect(requisition.requisitions).toEqual([]);
        expect(requisition.publishers).toEqual([]);
        expect(requisition.subscriptions).toEqual([]);
    });

    it('should createRequisition with parent', () => {
        const parent = {id: 'parent', requisitions: []};
        const requisition = new ComponentFactory().createRequisition(parent);

        expect(requisition.carabinaMeta.collapsed).toBeFalsy();
        expect(requisition.carabinaMeta.selected).toBeFalsy();
        expect(requisition.carabinaMeta.type).toBe(ComponentTypes.REQUISITION);
        expect(requisition.carabinaMeta.parent).toEqual(parent);

        expect(requisition.id).toBeDefined();
        expect(requisition.name).toBeDefined();
        expect(requisition.requisitions).toEqual([]);
        expect(requisition.publishers).toEqual([]);
        expect(requisition.subscriptions).toEqual([]);

        expect(parent.requisitions[0]).toEqual(requisition);
    });

    it('should create requisition from createComponent', () => {
        const parent = {id: 'parent', requisitions: []};
        const requisition = new ComponentFactory().createComponent(ComponentTypes.REQUISITION, parent);

        expect(requisition.carabinaMeta.collapsed).toBeFalsy();
        expect(requisition.carabinaMeta.selected).toBeFalsy();
        expect(requisition.carabinaMeta.type).toBe(ComponentTypes.REQUISITION);
        expect(requisition.carabinaMeta.parent).toEqual(parent);

        expect(requisition.id).toBeDefined();
        expect(requisition.name).toBeDefined();
        expect(requisition.requisitions).toEqual([]);
        expect(requisition.publishers).toEqual([]);
        expect(requisition.subscriptions).toEqual([]);

        expect(parent.requisitions[0]).toEqual(requisition);
    });

    it('should create publisher from createComponent', () => {
        const parent = {id: 'parent', publishers: []};
        const publisher = new ComponentFactory().createComponent(ComponentTypes.PUBLISHER, parent);

        expect(publisher.carabinaMeta.selected).toBeFalsy();
        expect(publisher.carabinaMeta.type).toBe(ComponentTypes.PUBLISHER);
        expect(publisher.carabinaMeta.parent).toEqual(parent);

        expect(publisher.id).toBeDefined();
        expect(publisher.name).toBeDefined();

        expect(parent.publishers[0]).toEqual(publisher);
    });

    it('should create subscription from createComponent', () => {
        const parent = {id: 'parent', subscriptions: []};
        const subscription = new ComponentFactory().createComponent(ComponentTypes.SUBSCRIPTION, parent);

        expect(subscription.carabinaMeta.selected).toBeFalsy();
        expect(subscription.carabinaMeta.type).toBe(ComponentTypes.SUBSCRIPTION);
        expect(subscription.carabinaMeta.parent).toEqual(parent);

        expect(subscription.id).toBeDefined();
        expect(subscription.name).toBeDefined();

        expect(parent.subscriptions[0]).toEqual(subscription);
    });

});
