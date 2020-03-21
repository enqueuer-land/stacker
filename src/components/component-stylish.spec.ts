import {ComponentTypes} from '@/components/component-types';
import {ComponentStylish} from '@/components/component-stylish';

describe('ComponentStylish', () => {
    it('should return publisher type', () => {
        const type = new ComponentStylish({
            type: 'http-protocol',
            carabinaMeta: {type: ComponentTypes.PUBLISHER}
        } as any).getType();
        expect(type).toBe('HTTP-PR');
    });

    it('should not return requisition type', () => {
        const type = new ComponentStylish({carabinaMeta: {type: ComponentTypes.REQUISITION}} as any).getType();
        expect(type).toBe('');
    });

    it('should return true when component is a requisition', () => {
        const isRequisition = new ComponentStylish({carabinaMeta: {type: ComponentTypes.REQUISITION}} as any).isRequisition();
        expect(isRequisition).toBeTruthy();
    });

    it('should return false when component is not a requisition', () => {
        const isRequisition = new ComponentStylish({carabinaMeta: {type: ComponentTypes.SUBSCRIPTION}} as any).isRequisition();
        expect(isRequisition).toBeFalsy();
    });

    it('should return amount of children 0 when it is not a requisition', () => {
        const children = new ComponentStylish({carabinaMeta: {type: ComponentTypes.SUBSCRIPTION}} as any).getChildrenLength();
        expect(children).toBe(0);
    });

    it('should return amount of children', () => {
        const requisition = {
            requisitions: [{name: 'req'}],
            publishers: [{name: 'pub'}, {name: 'pub2'}],
            subscriptions: [{name: 'sub'}, {name: 'sub2'}, {name: 'su3'}],
            carabinaMeta: {
                type: ComponentTypes.REQUISITION
            }
        } as any;
        const children = new ComponentStylish(requisition).getChildrenLength();
        expect(children).toBe(6);
    });

    it('should return component color', () => {
        expect(new ComponentStylish({carabinaMeta: {type: ComponentTypes.REQUISITION}} as any).getComponentColor())
            .toBe('var(--carabina-requisition-color)');
        expect(new ComponentStylish({carabinaMeta: {type: ComponentTypes.PUBLISHER}} as any).getComponentColor())
            .toBe('var(--carabina-publisher-color)');
        expect(new ComponentStylish({carabinaMeta: {type: ComponentTypes.SUBSCRIPTION}} as any).getComponentColor())
            .toBe('var(--carabina-subscription-color)');
    });

    it('should return component name style', () => {
        const nameStyle = new ComponentStylish({
            ignore: true,
            carabinaMeta: {
                type: ComponentTypes.SUBSCRIPTION,
                selected: true,
            }
        } as any).componentNameStyle();
        expect(nameStyle).toEqual({
            color: 'var(--carabina-text-color)',
            'text-decoration': 'line-through',
            'user-select': 'none'
        });
    });

    it('should return component name style (not selected nor ignored)', () => {
        const nameStyle = new ComponentStylish({
            carabinaMeta: {
                type: ComponentTypes.REQUISITION
            }
        } as any).componentNameStyle();
        expect(nameStyle).toEqual({
            'user-select': 'none'
        });
    });

    it('should return component style', () => {
        const style = new ComponentStylish({
            carabinaMeta: {
                type: ComponentTypes.SUBSCRIPTION,
                selected: true,
            }
        } as any).componentStyle();
        expect(style).toEqual({
            'background-color': 'var(--carabina-header-background-color)'
        });
    });

    it('should return component style (not selected)', () => {
        const style = new ComponentStylish({
            carabinaMeta: {
                type: ComponentTypes.REQUISITION,
            }
        } as any).componentStyle();
        expect(style).toEqual({});
    });

    it('should return component tag style', () => {
        const style = new ComponentStylish({
            ignore: true,
            carabinaMeta: {
                type: ComponentTypes.SUBSCRIPTION,
            }
        } as any).typeTagStyle();
        expect(style).toEqual({
            color: 'var(--carabina-subscription-color)',
            'text-decoration': 'line-through',
            'user-select': 'none'
        });
    });

    it('should return component tag style (not ignored)', () => {
        const style = new ComponentStylish({
            carabinaMeta: {
                type: ComponentTypes.PUBLISHER,
            }
        } as any).typeTagStyle();
        expect(style).toEqual({
            color: 'var(--carabina-publisher-color)',
            'user-select': 'none'
        });
    });

});
