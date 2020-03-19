import * as fs from 'fs';
import * as os from 'os';
import Store from 'electron-store';
import {exec} from 'child_process';
import {Logger} from '@/components/logger';
import requireFromString from 'require-from-string';
import * as httpPublisher from '@/plugins/http-publisher';
import * as httpSubscription from '@/plugins/http-subscription';


//TODO test it
export class PluginsLoader {
    private readonly pluginsRepository: any;
    private readonly plugins: any;
    private readonly pluginsString: string[];

    constructor() {
        this.pluginsRepository = new Store({name: 'plugins'});
        this.plugins = {
            publishers: {http: httpPublisher.default.publishers.http},
            subscriptions: {http: httpSubscription.default.subscriptions.http}
        };
        this.pluginsString = this.pluginsRepository.get('pluginsString', []);
        this.pluginsString
            .forEach((pluginString: string) => this.loadStringPlugin(pluginString));
    }

    public getPlugins(): object {
        return this.plugins;
    }

    public loadFileFromFileSystem(filename: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, async (err, data) => {
                try {
                    if (!err) {
                        const fileContent = data.toString();
                        const plugin = this.loadStringPlugin(fileContent);
                        await this.installEnqueuerPlugins(plugin);
                        this.pluginsString.push(fileContent);
                        this.pluginsRepository.set('pluginsString', this.pluginsString);
                        resolve();
                        return;
                    }
                } catch (e) {
                }
                reject(`Error loading plugin '${filename}'`);
            });
        });
    }

    private loadStringPlugin(pluginString: string): any {
        try {
            const plugin = requireFromString(pluginString);
            this.addPlugin(plugin);
            return plugin;
        } catch (e) {
            Logger.error(`Error loading plugin: ${e}`);
        }
    }

    private async installEnqueuerPlugins(plugin: any): Promise<void> {
        const enqueuerDependencies = PluginsLoader.getEnqueuerDependencies(plugin);
        await Promise.all(enqueuerDependencies
            .filter(enqueuerPlugin => enqueuerPlugin)
            .map(async enqueuerPlugin => await this.install(enqueuerPlugin)));
    }

    private async install(enqueuerPlugin: string): Promise<void> {
        return new Promise(resolve => {
            Logger.info(`Installing '${enqueuerPlugin}'`);
            exec(`npm install --prefix ${os.homedir()}/.nqr ${enqueuerPlugin}`, ((error, stdout, stderr) => {
                if (error) {
                    Logger.error(`'${enqueuerPlugin}' installation: ${stderr}`);
                } else {
                    Logger.info(`'${enqueuerPlugin}' installation: ${stdout}`);
                }
                resolve();
            }));
        });
    }

    private addPlugin(plugin: any) {
        this.plugins.publishers = {
            ...this.plugins.publishers,
            ...plugin.publishers
        };
        this.plugins.subscriptions = {
            ...this.plugins.subscriptions,
            ...plugin.subscriptions
        };
    }

    private static getEnqueuerDependencies(plugin: any) {
        const publisherPlugins = Object
            .keys(plugin.publishers || {})
            .map(key => plugin.publishers[key].enqueuerPlugin);
        const subscriptionPlugins = Object
            .keys(plugin.subscriptions || {})
            .map(key => plugin.subscriptions[key].enqueuerPlugin);
        return publisherPlugins
            .concat(subscriptionPlugins)
            .filter(name => name);
    }
}
