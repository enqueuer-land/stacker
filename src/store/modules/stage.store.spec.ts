import {PluginsLoader} from '@/plugins/plugins-loader';
import {EnqueuerLogParser} from '@/components/enqueuer-log-parser';

jest.mock('@/store');
jest.mock('@/plugins/plugins-loader');
jest.mock('@/components/enqueuer-log-parser');

describe('StageStore', () => {

    it('should initialize correctly', () => {
        const getPluginsMock = jest.fn(() => []);
        // @ts-ignore
        PluginsLoader.mockImplementationOnce(() => ({getPlugins: getPluginsMock}));
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
