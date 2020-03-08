import {ComponentFactory} from '@/components/component-factory';
import {ComponentDecycler} from '@/components/component-decycler';
import {ComponentTypes} from "@/components/component-types";

describe('ComponentDecycler', () => {
    const componentFactory = new ComponentFactory();

    it('should remove from first level of requisition', () => {
        const parent = componentFactory.createRequisition();
        const requisition = componentFactory.createRequisition(parent);

        const decycled = new ComponentDecycler().decycle(requisition);

        expect(decycled.carabinaMeta.parent).toBeUndefined();
        expect(requisition.carabinaMeta.parent).toEqual(parent);
    });

    it('should remove from first level of subscription', () => {
        const parent = componentFactory.createRequisition();
        const subscription = componentFactory.createComponent(ComponentTypes.SUBSCRIPTION, parent);

        const decycled = new ComponentDecycler().decycle(subscription);

        expect(decycled.carabinaMeta.parent).toBeUndefined();
        expect(subscription.carabinaMeta.parent).toEqual(parent);
    });

    it('should remove from first level of publisher', () => {
        const parent = componentFactory.createRequisition();
        const publisher = componentFactory.createComponent(ComponentTypes.PUBLISHER, parent);

        const decycled = new ComponentDecycler().decycle(publisher);

        expect(decycled.carabinaMeta.parent).toBeUndefined();
        expect(publisher.carabinaMeta.parent).toEqual(parent);
    });

    it('should remove from every level of requisition', () => {
        const grandParent = componentFactory.createRequisition();
        const parent = componentFactory.createRequisition(grandParent);
        const requisition = componentFactory.createRequisition(parent);

        const decycled = new ComponentDecycler().decycle(grandParent);

        expect(grandParent.carabinaMeta.parent).toBeUndefined();
        expect(parent.carabinaMeta.parent).toEqual(grandParent);
        expect(requisition.carabinaMeta.parent).toEqual(parent);
        expect(decycled.carabinaMeta.parent).toBeUndefined();
        expect(decycled.requisitions[0].carabinaMeta.parent).toBeUndefined();
        expect(decycled.requisitions[0].requisitions[0].carabinaMeta.parent).toBeUndefined();
    });


});
