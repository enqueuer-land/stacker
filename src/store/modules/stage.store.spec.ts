import {PluginsLoader} from '@/plugins/plugins-loader';
import * as stageStore from '@/store/modules/stage.store';
import {ComponentTypes} from '@/components/component-types';
import {EnqueuerLogParser} from '@/components/enqueuer-log-parser';

jest.mock('@/store');
jest.mock('@/plugins/plugins-loader');
jest.mock('@/components/enqueuer-log-parser');

describe('StageStore', () => {
    it('should prepare requisition to be ran', () => {
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
        expect(stageStore.prepareComponentToBeRan(requisition)).toEqual({
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
        expect(stageStore.prepareComponentToBeRan(publisher)).toEqual({
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
        expect(stageStore.prepareComponentToBeRan(subscription)).toEqual({
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

    it('should initialize correctly', () => {
        const getPluginsMock = jest.fn(() => []);
        // @ts-ignore
        PluginsLoader.mockImplementationOnce(() => ({getPlugins: getPluginsMock}));
        const logParserMock = jest.fn(() => 'logParser');
        // @ts-ignore
        EnqueuerLogParser.mockImplementationOnce(() => ({name: 'logParser'}));

        const stageStore = require('@/store/modules/stage.store').default();

        expect(stageStore.state).toEqual({
            plugins: [],
            enqueuerLogParser: {
                name: 'logParser'
            },
            installingPluginModal: false,
        });
    });
});
