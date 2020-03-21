import {ComponentTypes} from '@/components/component-types';
import {RequisitionWrapperCreator} from '@/components/requisition-wrapper-creator';

describe('RequisitionWrapperCreator', () => {
    it('should prepare requisitions', () => {
        const parent: any = {
            name: 'parent'
        };
        const requisition: any = {
            name: 'requisition',
            carabinaMeta: {
                parent,
                type: ComponentTypes.REQUISITION
            }
        };

        expect(new RequisitionWrapperCreator(requisition).create()).toEqual({
            name: 'requisition',
            carabinaMeta: {
                type: ComponentTypes.REQUISITION
            }
        });
    });

    it('should prepare publisher to be ran', () => {
        const parent: any = {
            name: 'parent'
        };
        const publisher: any = {
            name: 'publisher',
            carabinaMeta: {
                parent,
                type: ComponentTypes.PUBLISHER
            }
        };
        expect(new RequisitionWrapperCreator(publisher).create()).toEqual({
            carabinaMeta: {
                collapsed: false,
                selected: false,
                type: 'REQUISITION'
            },
            delay: 0,
            ignore: false,
            iterations: 1,
            parallel: false,
            requisitions: [],
            subscriptions: [],
            timeout: -1,
            id: expect.anything(),
            name: 'publisher',
            publishers: [
                {
                    carabinaMeta: {
                        type: 'PUBLISHER'
                    },
                    name: 'publisher'
                }
            ]
        });
    });

    it('should prepare subscription to be ran', () => {
        const parent: any = {
            name: 'parent'
        };
        const subscription: any = {
            name: 'subscription',
            carabinaMeta: {
                parent,
                type: ComponentTypes.SUBSCRIPTION
            }
        };
        expect(new RequisitionWrapperCreator(subscription).create()).toEqual({
            carabinaMeta: {
                collapsed: false,
                selected: false,
                type: 'REQUISITION'
            },
            delay: 0,
            ignore: false,
            iterations: 1,
            parallel: false,
            requisitions: [],
            publishers: [],
            timeout: -1,
            id: expect.anything(),
            name: 'subscription',
            subscriptions: [
                {
                    carabinaMeta: {
                        type: 'SUBSCRIPTION'
                    },
                    name: 'subscription'
                }
            ]
        });
    });

});
