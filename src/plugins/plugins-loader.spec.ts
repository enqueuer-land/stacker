import Store from 'electron-store';
import {PluginsLoader} from '@/plugins/plugins-loader';
import *  as cp from 'child_process';

jest.mock('electron-store');
jest.mock('child_process');

const stringifiedPlugin =
    `const plugin = {
            publishers: {
                exec: {
                    enqueuerPlugin: 'enqueuer-plugin-shell',
                    hooks: ['onCommandExecuted'],
                }
            }
        }
    module.exports = plugin;`;

describe('PluginsLoader', () => {

    it('should begin with http pub and sub', () => {
        // @ts-ignore
        Store.mockImplementationOnce(() => {
            return {
                get: () => []
            }
        });

        const plugins = new PluginsLoader().getPlugins();

        expect(plugins).toEqual({
            publishers: {
                http: expect.anything()
            },
            subscriptions: {
                http: expect.anything()
            }
        });
    });

    it('should load persisted plugins', () => {
        // @ts-ignore
        Store.mockImplementationOnce(() => {
            return {
                get: () => [stringifiedPlugin]
            }
        });

        const plugins = new PluginsLoader().getPlugins();

        expect(plugins).toEqual({
            publishers: {
                http: expect.anything(),
                exec: {
                    enqueuerPlugin: 'enqueuer-plugin-shell',
                    hooks: ['onCommandExecuted']
                }
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

        const pluginsLoader = new PluginsLoader();
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
                set: () => {}
            }
        });

        const execMock = jest.fn((command, cb) => cb());
        // @ts-ignore
        cp.exec.mockImplementationOnce(execMock);

        const pluginsLoader = new PluginsLoader();
        await pluginsLoader.loadFileFromFileSystem('plugins/shell-publisher.js');

        expect(execMock).toHaveBeenCalledWith('npm install --prefix /Users/guilherme.moraes/.nqr enqueuer-plugin-shell', expect.any(Function));
    });
});
