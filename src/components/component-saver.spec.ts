import * as fs from 'fs';
import * as yaml from 'yamljs';
import {ComponentSaver} from '@/components/component-saver';
import {ComponentTypes} from '@/components/component-types';

jest.mock('fs');

const writeFileMock = jest.fn((name, item, cb) => cb());
// @ts-ignore
fs.writeFile.mockImplementation(writeFileMock);

describe('ComponentSaver', () => {
    beforeEach(() => {
        writeFileMock.mockClear();
    });

    it('should decycle object', async () => {
        const item: any = {
            name: 'requisition',
            carabinaMeta: {
                type: ComponentTypes.REQUISITION
            }
        };
        item.carabinaMeta.parent = {
            requisitions: item
        };

        const filename = 'filename';

        await new ComponentSaver().save(item, filename);

        delete item.carabinaMeta.parent;
        const yamlizedItem = yaml.stringify(item, 100, 2);
        expect(writeFileMock).toHaveBeenCalledWith(filename, yamlizedItem, expect.any(Function));
    });

    it('should save requisition as is', async () => {
        const filename = 'filename';
        const item: any = {
            name: 'requisition',
            carabinaMeta: {
                type: ComponentTypes.REQUISITION,
                filename
            }
        };

        const yamlizedItem = yaml.stringify(item, 100, 2);

        await new ComponentSaver().save(item, filename);

        expect(writeFileMock).toHaveBeenCalledWith(filename, yamlizedItem, expect.any(Function));
    });

    it('should create requisition wrapper to save publisher', async () => {
        const filename = 'filename';
        const item: any = {
            name: 'publisher',
            carabinaMeta: {
                type: ComponentTypes.PUBLISHER
            }
        };

        await new ComponentSaver().save(item, filename);
        const mockCall = writeFileMock.mock.calls[0];

        const itemSaved = yaml.parse(mockCall[1]);

        expect(mockCall[0]).toBe(filename);
        expect(itemSaved.publishers[0].carabinaMeta.filename).toBe(filename);
        expect(itemSaved).toEqual({
            publishers: [item],
            name: item.name,
            id: expect.any(String),
            carabinaMeta: {
                collapsed: false,
                parent: null,
                selected: false,
                type: 'REQUISITION',
                filename
            },
            delay: 0,
            ignore: false,
            iterations: 1,
            parallel: false,
            requisitions: [],
            subscriptions: [],
            timeout: -1
        });
        expect(mockCall[2]).toEqual(expect.any(Function));
    });

    it('should create requisition wrapper to save subscription', async () => {
        const filename = 'filename';
        const item: any = {
            name: 'subscription',
            carabinaMeta: {
                type: ComponentTypes.SUBSCRIPTION,
            }
        };

        await new ComponentSaver().save(item, filename);
        const mockCall = writeFileMock.mock.calls[0];

        const itemSaved = yaml.parse(mockCall[1]);

        expect(mockCall[0]).toBe(filename);
        expect(itemSaved.subscriptions[0].carabinaMeta.filename).toBe(filename);
        expect(itemSaved).toEqual({
            timeout: -1,
            subscriptions: [item],
            name: item.name,
            id: expect.any(String),
            carabinaMeta: {
                collapsed: false,
                parent: null,
                selected: false,
                type: 'REQUISITION',
                filename
            },
            delay: 0,
            ignore: false,
            iterations: 1,
            parallel: false,
            publishers: [],
            requisitions: [],
        });
        expect(mockCall[2]).toEqual(expect.any(Function));
    });
});
