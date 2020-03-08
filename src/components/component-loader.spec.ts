import * as fs from 'fs';
import {ComponentLoader} from '@/components/component-loader';

jest.mock('fs');

describe('ComponentLoader', () => {
    it('should read JSON file', () => {
        const fileContent = {
            name: 'grandRequisition',
            requisitions: [{
                name: 'requisition',
            }],
            publishers: [{
                name: 'publisher',
            }],
            subscriptions: [{
                name: 'subscription',
            }],
        };
        const buffered = Buffer.from(JSON.stringify(fileContent));
        // @ts-ignore
        fs.readFileSync.mockImplementationOnce(() => buffered);

        const requisition = ComponentLoader.importFile('filename');

        expect(requisition.carabinaMeta)
            .toEqual({
                collapsed: false,
                componentName: 'REQUISITION',
                selected: false
            });
        expect(requisition.delay).toBe(0);
        expect(requisition.id).toBeDefined();
        expect(requisition.ignore).toBeFalsy();
        expect(requisition.timeout).toBe(5000);
        expect(requisition.iterations).toBe(1);
        expect(requisition.name).toBe('grandRequisition');
        expect(requisition.parallel).toBeFalsy();
        expect(requisition.requisitions.length).toBe(1);
        expect(requisition.publishers.length).toBe(1);

        expect(requisition.requisitions[0].carabinaMeta.collapsed).toBeFalsy();
        expect(requisition.requisitions[0].carabinaMeta.componentName).toBe('REQUISITION');
        expect(requisition.requisitions[0].carabinaMeta.selected).toBeFalsy();
        expect(requisition.requisitions[0].carabinaMeta.parent.id).toBe(requisition.id);
        expect(requisition.requisitions[0].delay).toBe(0);
        expect(requisition.requisitions[0].id).toBeDefined();
        expect(requisition.requisitions[0].ignore).toBeFalsy();
        expect(requisition.requisitions[0].timeout).toBe(5000);
        expect(requisition.requisitions[0].iterations).toBe(1);
        expect(requisition.requisitions[0].name).toBe('requisition');
        expect(requisition.requisitions[0].parallel).toBeFalsy();
        expect(requisition.requisitions[0].requisitions.length).toBe(0);

        expect(requisition.publishers[0].carabinaMeta.collapsed).toBeFalsy();
        expect(requisition.publishers[0].carabinaMeta.componentName).toBe('PUBLISHER');
        expect(requisition.publishers[0].carabinaMeta.selected).toBeFalsy();
        expect(requisition.publishers[0].carabinaMeta.parent.id).toBe(requisition.id);
        expect(requisition.publishers[0].id).toBeDefined();
        expect(requisition.publishers[0].ignore).toBeFalsy();
        expect(requisition.publishers[0].name).toBe('publisher');

        expect(requisition.subscriptions[0].carabinaMeta.collapsed).toBeFalsy();
        expect(requisition.subscriptions[0].carabinaMeta.componentName).toBe('SUBSCRIPTION');
        expect(requisition.subscriptions[0].carabinaMeta.selected).toBeFalsy();
        expect(requisition.subscriptions[0].carabinaMeta.parent.id).toBe(requisition.id);
        expect(requisition.subscriptions[0].id).toBeDefined();
        expect(requisition.subscriptions[0].ignore).toBeFalsy();
        expect(requisition.subscriptions[0].name).toBe('subscription');
    });
});
