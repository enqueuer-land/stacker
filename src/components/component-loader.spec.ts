import * as fs from 'fs';
import * as yaml from 'yamljs';
import {ComponentLoader} from '@/components/component-loader';

jest.mock('fs');
jest.mock('@/components/logger');

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
                selected: false,
                parent: undefined
            });
        expect(requisition.delay).toBe(0);
        expect(requisition.id).toBeDefined();
        expect(requisition.name).toBe('grandRequisition');
        expect(requisition.carabinaMeta.selected).toBeFalsy();
        expect(requisition.requisitions.length).toBe(1);
        expect(requisition.publishers.length).toBe(1);

        expect(requisition.requisitions[0].carabinaMeta.type).toBe('REQUISITION');
        expect(requisition.requisitions[0].carabinaMeta.selected).toBeFalsy();
        expect(requisition.requisitions[0].carabinaMeta.parent!.id).toBe(requisition.id);
        expect(requisition.requisitions[0].name).toBe('requisition');
        expect(requisition.requisitions[0].id).toBeDefined();
        expect(requisition.requisitions[0].requisitions.length).toBe(0);
        expect(requisition.requisitions[0].publishers.length).toBe(0);
        expect(requisition.requisitions[0].subscriptions.length).toBe(0);

        expect(requisition.publishers[0].carabinaMeta.type).toBe('PUBLISHER');
        expect(requisition.publishers[0].carabinaMeta.selected).toBeFalsy();
        expect(requisition.publishers[0].carabinaMeta.parent!.id).toBe(requisition.id);
        expect(requisition.publishers[0].id).toBeDefined();
        expect(requisition.publishers[0].name).toBe('publisher');

        expect(requisition.subscriptions[0].carabinaMeta.type).toBe('SUBSCRIPTION');
        expect(requisition.subscriptions[0].carabinaMeta.selected).toBeFalsy();
        expect(requisition.subscriptions[0].carabinaMeta.parent!.id).toBe(requisition.id);
        expect(requisition.subscriptions[0].id).toBeDefined();
        expect(requisition.subscriptions[0].name).toBe('subscription');
    });

    it('should read yml file', async () => {
        const fileContent = {
            name: 'grandRequisition',
            carabinaMeta: {
                collapsed: true,
                selected: true
            }
        };
        const buffered = Buffer.from(yaml.stringify(fileContent, 100, 2));
        // @ts-ignore
        fs.readFile.mockImplementationOnce((filename, cb) => cb(null, buffered));

        const requisition = await ComponentLoader.importFile('filename');

        expect(requisition)
            .toEqual({
                carabinaMeta: {
                    collapsed: true,
                    selected: false,
                    type: 'REQUISITION'
                },
                delay: 0,
                id: expect.any(String),
                ignore: false,
                iterations: 1,
                name: 'grandRequisition',
                parallel: false,
                publishers: [],
                requisitions: [],
                subscriptions: [],
                timeout: 5000
            });

    });

    it('should be able to read array requisitions', async () => {
        const fileContent = [{
            name: '1',
            publishers: [{
                name: 'publisher',
            }],
        },{
            name: '2',
            subscriptions: [{
                name: 'subscription',
            }],
        },];
        const buffered = Buffer.from(JSON.stringify(fileContent));
        // @ts-ignore
        fs.readFile.mockImplementationOnce((filename, cb) => cb(null, buffered));

        const filePath = '/home/user/dir/file.txt';
        const requisition = await ComponentLoader.importFile(filePath);

        expect(requisition)
            .toEqual({
                "carabinaMeta": {
                    "collapsed": false,
                    "selected": false,
                    "type": "REQUISITION"
                },
                "delay": 0,
                "id": expect.any(String),
                "ignore": false,
                "iterations": 1,
                "name": 'file',
                "parallel": false,
                "publishers": [],
                "requisitions": [
                    {
                        "carabinaMeta": {
                            "collapsed": false,
                            "parent": expect.anything(),
                            "selected": false,
                            "type": "REQUISITION"
                        },
                        "delay": 0,
                        "id": expect.any(String),
                        "ignore": false,
                        "iterations": 1,
                        "name": "1",
                        "parallel": false,
                        "publishers": [
                            {
                                "carabinaMeta": {
                                    "parent": expect.anything(),
                                    "selected": false,
                                    "type": "PUBLISHER"
                                },
                                "headers": {
                                    "content-type": "json/application"
                                },
                                "id": expect.any(String),
                                "ignore": false,
                                "method": "GET",
                                "name": "publisher",
                                "payload": "",
                                "type": "HTTP",
                                "url": "http://localhost:80/"
                            }
                        ],
                        "requisitions": [],
                        "subscriptions": [],
                        "timeout": 5000
                    },
                    {
                        "carabinaMeta": {
                            "collapsed": false,
                            "parent": expect.anything(),
                            "selected": false,
                            "type": "REQUISITION"
                        },
                        "delay": 0,
                        "id": expect.any(String),
                        "ignore": false,
                        "iterations": 1,
                        "name": "2",
                        "parallel": false,
                        "publishers": [],
                        "requisitions": [],
                        "subscriptions": [
                            {
                                "avoid": false,
                                "carabinaMeta": {
                                    "parent": expect.anything(),
                                    "selected": false,
                                    "type": "SUBSCRIPTION"
                                },
                                "endpoint": "/",
                                "id": expect.any(String),
                                "ignore": false,
                                "method": "GET",
                                "name": "subscription",
                                "port": 80,
                                "response": {
                                    "headers": {
                                        "content-type": "json/application"
                                    },
                                    "payload": "",
                                    "status": 200
                                },
                                "timeout": 3000,
                                "type": "HTTP"
                            }
                        ],
                        "timeout": 5000
                    }
                ],
                "subscriptions": [],
                "timeout": 5000
            });
    });
});
