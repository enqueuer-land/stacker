import * as fs from 'fs';
import * as os from 'os';
import Store from 'electron-store';
import {exec} from 'child_process';
import {Logger} from '@/components/logger';
import requireFromString from 'require-from-string';
import httpPublisher from '@/plugins/built-in/http-publisher';
import httpSubscription from '@/plugins/built-in/http-subscription';

export class PluginsLoader {
    private readonly pluginsRepository: any;
    private readonly plugins: any;
    private readonly pluginsString: {
        [pluginNameSlahVersion: string]: string;
    };

    public constructor() {
        this.pluginsRepository = new Store({name: 'installed-plugins'});
        this.plugins = {
            publishers: {http: httpPublisher.publishers.http},
            subscriptions: {http: httpSubscription.subscriptions.http}
        };
        this.pluginsString = this.pluginsRepository.get('pluginsString', {});
        Object.keys(this.pluginsString)
            .forEach((key: string) => {
                const plugin = requireFromString(this.pluginsString[key]);
                this.addPlugin(plugin);
            });
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
                        await this.loadPlugin(fileContent);
                        resolve();
                    }
                } catch (e) {
                }
                reject(`Error loading plugin '${filename}'`);
            });
        });
    }

    public getPluginsNames(): string[] {
        return Object.keys(this.pluginsString);
    }

    public async loadPlugin(fileContent: string): Promise<any> {
        const plugin = requireFromString(fileContent);
        this.addPlugin(plugin);
        this.pluginsString[`${plugin.name}/${plugin.version}`] = fileContent;
        await this.installDependencies(plugin);
        this.pluginsRepository.set('pluginsString', this.pluginsString);
        return plugin;
    }

    //TODO test it
    public async removePlugin(javascript: string): Promise<void> {
        const plugin = requireFromString(javascript);
        delete this.pluginsString[`${plugin.name}/${plugin.version}`];
        this.unloadPlugin(plugin);
        await this.uninstallDependencies(plugin);
        this.pluginsRepository.set('pluginsString', this.pluginsString);
        return plugin;
    }

    private async installDependencies(plugin: any): Promise<void> {
        const dependencies = PluginsLoader.getDependencies(plugin);
        return new Promise(resolve => {
            Logger.info(`Installing [${dependencies.join(', ')}]`);
            exec(`npm install --prefix ${os.homedir()}/.nqr ${dependencies.join(' ')}`, ((error, stdout, stderr) => {
                if (error) {
                    Logger.error(`[${dependencies.join(', ')}] installation: ${stderr}`);
                } else {
                    Logger.info(`[${dependencies.join(', ')}] installation: ${stdout}`);
                }
                resolve();
            }));
        });
    }

    private async uninstallDependencies(plugin: any): Promise<void> {
        const dependencies = PluginsLoader.getDependencies(plugin);
        return new Promise(resolve => {
            Logger.info(`Uninstalling [${dependencies.join(', ')}]`);
            exec(`npm uninstall --prefix ${os.homedir()}/.nqr ${dependencies.join(' ')}`, ((error, stdout, stderr) => {
                if (error) {
                    Logger.error(`[${dependencies.join(', ')}] removal: ${stderr}`);
                } else {
                    Logger.info(`[${dependencies.join(', ')}] removal: ${stdout}`);
                }
                resolve();
            }));
        });
    }

    private addPlugin(plugin: any): void {
        this.plugins.publishers = {
            ...this.plugins.publishers,
            ...plugin.publishers
        };
        this.plugins.subscriptions = {
            ...this.plugins.subscriptions,
            ...plugin.subscriptions
        };
    }

    private unloadPlugin(plugin: any): void {
        Object.keys(plugin.publishers || {})
            .forEach(key => delete this.plugins.publishers[key]);
        Object.keys(plugin.subscriptions || {})
            .forEach(key => delete this.plugins.subscriptions[key]);
    }

    private static getDependencies(plugin: any): string[] {
        const publisherDependencies = Object
            .keys(plugin.publishers || {})
            .reduce((acc, key) => acc.concat(plugin.publishers[key].dependencies || []), []);
        const subscriptionDependencies = Object
            .keys(plugin.subscriptions || {})
            .reduce((acc, key) => acc.concat(plugin.subscriptions[key].dependencies || []), []);
        return publisherDependencies
            .concat(subscriptionDependencies)
            .filter(name => name);
    }

}
