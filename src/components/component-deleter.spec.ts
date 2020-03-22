import {ComponentTypes} from '@/components/component-types';
import {ComponentDeleter} from '@/components/component-deleter';

describe('ComponentDeleter', () => {
    it('should do nothing when it has no parent', () => {
        const component: any = {
            id: '1',
            carabinaMeta: {
                type: ComponentTypes.REQUISITION
            }
        };

        new ComponentDeleter(component).delete();
    });

    it('should delete requisition', () => {
        const parent: any = {};
        const component: any = {
            id: '1',
            carabinaMeta: {
                parent,
                type: ComponentTypes.REQUISITION
            }
        };
        parent.requisitions = [component];

        expect(parent.requisitions.length).toBe(1);
        new ComponentDeleter(component).delete();
        expect(parent.requisitions.length).toBe(0);
    });

    it('should delete publisher', () => {
        const parent: any = {};
        const component: any = {
            id: '1',
            carabinaMeta: {
                parent,
                type: ComponentTypes.PUBLISHER
            }
        };
        parent.publishers = [component];

        expect(parent.publishers.length).toBe(1);
        new ComponentDeleter(component).delete();
        expect(parent.publishers.length).toBe(0);
    });

    it('should delete subscription', () => {
        const parent: any = {};
        const component: any = {
            id: '1',
            carabinaMeta: {
                parent,
                type: ComponentTypes.SUBSCRIPTION
            }
        };
        parent.subscriptions = [component];

        expect(parent.subscriptions.length).toBe(1);
        new ComponentDeleter(component).delete();
        expect(parent.subscriptions.length).toBe(0);
    });
});
