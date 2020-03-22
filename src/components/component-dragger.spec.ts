import {ComponentTypes} from '@/components/component-types';
import {ComponentDragger} from '@/components/component-dragger';

describe('ComponentDragger', () => {
    it('should not allow moving to root when it is not a requisition', () => {
        const dragged: any = {carabinaMeta: {type: ComponentTypes.PUBLISHER}};
        const draggedParent: any = {};
        expect(new ComponentDragger(dragged, draggedParent).moveToRoot()).toBeFalsy();
    });

    it('should allow moving to root when it is a requisition', () => {
        const dragged: any = {id: '1', carabinaMeta: {type: ComponentTypes.REQUISITION}};
        const draggedParent: any = {
            requisitions: [dragged]
        };
        dragged.carabinaMeta.parent = draggedParent;
        const allow = new ComponentDragger(dragged, draggedParent).moveToRoot();

        expect(allow).toBeTruthy();
        expect(dragged.carabinaMeta.parent).toBeUndefined();
        expect(draggedParent.requisitions.length).toBe(0);
    });

    it('should do nothing when dragged is parentish of target', () => {
        const dragged: any = {id: '1', carabinaMeta: {type: ComponentTypes.REQUISITION}};
        const draggedParent: any = {
            requisitions: [dragged]
        };
        dragged.carabinaMeta.parent = draggedParent;
        const target: any = {id: '2', carabinaMeta: {type: ComponentTypes.REQUISITION, parent: dragged}};

        new ComponentDragger(dragged, draggedParent).moveToComponent(target);

        expect(dragged.carabinaMeta.parent).toEqual(draggedParent);
    });

    it('should do nothing when dragged is the target', () => {
        const dragged: any = {id: '1', carabinaMeta: {type: ComponentTypes.REQUISITION}};
        const draggedParent: any = {
            requisitions: [dragged],
            carabinaMeta: {}
        };
        dragged.carabinaMeta.parent = draggedParent;

        new ComponentDragger(dragged, draggedParent).moveToComponent(dragged);

        expect(dragged.carabinaMeta.parent).toEqual(draggedParent);
    });

    it('should move requisition to target', () => {
        const draggedParent: any = {carabinaMeta: {}};
        const dragged: any = {id: 'dragged', carabinaMeta: {type: ComponentTypes.REQUISITION, parent: draggedParent}};
        draggedParent.requisitions = [dragged];
        const target: any = {id: 'target', carabinaMeta: {type: ComponentTypes.REQUISITION}, requisitions: []};

        new ComponentDragger(dragged, draggedParent).moveToComponent(target);

        expect(dragged.carabinaMeta.parent).toEqual(target);
        expect(target.requisitions).toEqual([dragged]);
        expect(draggedParent.requisitions).toEqual([]);
    });

    it('should move publisher to target', () => {
        const draggedParent: any = {carabinaMeta: {}};
        const dragged: any = {id: 'dragged', carabinaMeta: {type: ComponentTypes.PUBLISHER, parent: draggedParent}};
        draggedParent.publishers = [dragged];
        const target: any = {id: 'target', carabinaMeta: {type: ComponentTypes.REQUISITION}, publishers: []};

        new ComponentDragger(dragged, draggedParent).moveToComponent(target);

        expect(dragged.carabinaMeta.parent).toEqual(target);
        expect(target.publishers).toEqual([dragged]);
        expect(draggedParent.publishers).toEqual([]);
    });

    it('should move subscription to target', () => {
        const draggedParent: any = {carabinaMeta: {}};
        const dragged: any = {id: 'dragged', carabinaMeta: {type: ComponentTypes.SUBSCRIPTION, parent: draggedParent}};
        draggedParent.subscriptions = [dragged];
        const target: any = {id: 'target', carabinaMeta: {type: ComponentTypes.REQUISITION}, subscriptions: []};

        new ComponentDragger(dragged, draggedParent).moveToComponent(target);

        expect(dragged.carabinaMeta.parent).toEqual(target);
        expect(target.subscriptions).toEqual([dragged]);
        expect(draggedParent.subscriptions).toEqual([]);
    });
});
