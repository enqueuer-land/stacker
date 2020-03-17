import * as fs from 'fs';
import {ComponentLoader} from '@/components/component-loader';

jest.mock('fs');

describe('ComponentLoader', () => {
    it('should read JSON file', async () => {
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
            carabinaMeta: {
                collapsed: true,
                selected: true
            }
        };
        const buffered = Buffer.from(JSON.stringify(fileContent));
        // @ts-ignore
        fs.readFile.mockImplementationOnce((filename, cb) => cb(null, buffered));

        const requisition = await ComponentLoader.importFile('filename');

        expect(requisition.carabinaMeta)
            .toEqual({
                collapsed: true,
                type: 'REQUISITION',
                selected: true,
                parent: undefined
            });
        expect(requisition.delay).toBe(0);
        expect(requisition.id).toBeDefined();
        expect(requisition.name).toBe('grandRequisition');
        expect(requisition.requisitions.length).toBe(1);
        expect(requisition.publishers.length).toBe(1);

        expect(requisition.requisitions[0].carabinaMeta.type).toBe('REQUISITION');
        expect(requisition.requisitions[0].carabinaMeta.parent.id).toBe(requisition.id);
        expect(requisition.requisitions[0].name).toBe('requisition');
        expect(requisition.requisitions[0].id).toBeDefined();
        expect(requisition.requisitions[0].requisitions.length).toBe(0);
        expect(requisition.requisitions[0].publishers.length).toBe(0);
        expect(requisition.requisitions[0].subscriptions.length).toBe(0);

        expect(requisition.publishers[0].carabinaMeta.type).toBe('PUBLISHER');
        expect(requisition.publishers[0].carabinaMeta.parent.id).toBe(requisition.id);
        expect(requisition.publishers[0].id).toBeDefined();
        expect(requisition.publishers[0].name).toBe('publisher');

        expect(requisition.subscriptions[0].carabinaMeta.type).toBe('SUBSCRIPTION');
        expect(requisition.subscriptions[0].carabinaMeta.parent.id).toBe(requisition.id);
        expect(requisition.subscriptions[0].id).toBeDefined();
        expect(requisition.subscriptions[0].name).toBe('subscription');
    });
});
