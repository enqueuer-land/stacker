import Store from 'electron-store';
import *  as cp from 'child_process';
import {PluginsLoader} from '@/plugins/plugins-loader';

jest.mock('electron-store');
jest.mock('child_process');

describe('PluginsLoader', () => {
    beforeEach(() => {
        // @ts-ignore
        delete PluginsLoader.instance;
    });

    it('should begin with http pub and sub', () => {
        // @ts-ignore
        Store.mockImplementationOnce(() => {
            return {
                get: () => []
            }
        });

        const plugins = PluginsLoader.getInstance().getPlugins();

        expect(plugins).toEqual({
            publishers: {
                http: expect.anything()
            },
            subscriptions: {
                http: expect.anything()
            }
        });
    });

    it('should read from filesystem', async () => {
        const setMock = jest.fn();
        // @ts-ignore
        Store.mockImplementationOnce(() => {
            return {
                get: () => [],
                set: setMock
            }
        });

        // @ts-ignore
        cp.exec.mockImplementationOnce((command, cb) => cb());

        const pluginsLoader = PluginsLoader.getInstance();
        await pluginsLoader.loadFileFromFileSystem('plugins/shell-publisher.js');

        expect(pluginsLoader.getPlugins()).toEqual({
            publishers: {
                http: expect.anything(),
                exec: expect.anything()
            },
            subscriptions: {
                http: expect.anything()
            }
        });
        expect(setMock).toHaveBeenCalledWith('pluginsString', expect.any(Array));
    });

    it('should install enqueuer dependencies', async () => {
        // @ts-ignore
        Store.mockImplementationOnce(() => {
            return {
                get: () => [],
                set: () => {
                }
            }
        });

        const execMock = jest.fn((command, cb) => cb());
        // @ts-ignore
        cp.exec.mockImplementationOnce(execMock);

        const pluginsLoader = PluginsLoader.getInstance();
        await pluginsLoader.loadFileFromFileSystem('plugins/shell-publisher.js');
        const npmInstallCommand = execMock.mock.calls[0][0];

        expect(execMock).toHaveBeenCalledTimes(1);
        expect(execMock).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
        expect(npmInstallCommand).toContain('npm install');
        expect(npmInstallCommand).toContain('enqueuer-plugin-shell');
    });
});
