import * as fs from 'fs';
import * as os from 'os';
import Store from 'electron-store';
import {exec} from 'child_process';
import {Logger} from '@/components/logger';
import requireFromString from 'require-from-string';
import httpPublisher from '@/plugins/built-in/http-publisher';
import httpSubscription from '@/plugins/built-in/http-subscription';

export class PluginsLoader {
    private static instance: PluginsLoader;
    private readonly pluginsRepository: any;
    private readonly plugins: any;
    private readonly pluginsString: string[];
    private installedPlugins: string[];

    private constructor() {
        this.pluginsRepository = new Store({name: 'installed-plugins'});
        this.installedPlugins = this.pluginsRepository.get('installedPluginsIds', []);
        this.plugins = {
            publishers: {http: httpPublisher.publishers.http},
            subscriptions: {http: httpSubscription.subscriptions.http}
        };
        this.pluginsString = this.pluginsRepository.get('pluginsString', []);
        this.pluginsString
            .forEach((pluginString: string) => this.loadStringPlugin(pluginString));
    }

    public static getInstance(): PluginsLoader {
        if (!PluginsLoader.instance) {
            PluginsLoader.instance = new PluginsLoader();
        }
        return PluginsLoader.instance;
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

    public pluginIsInstalled(plugin: { name: string; version: string }): boolean {
        return this.installedPlugins.includes(`${plugin.name}/${plugin.version}`);
    }

    public addInstalledPlugin(plugin: { name: string; version: string }): void {
        this.installedPlugins.push(`${plugin.name}/${plugin.version}`);
        this.installedPlugins = Array.from(new Set(this.installedPlugins));
        this.pluginsRepository.set('installedPluginsIds', this.installedPlugins);
    }

    public async loadPlugin(fileContent: string): Promise<any> {
        const plugin = this.loadStringPlugin(fileContent);
        await this.installDependencies(plugin);
        this.pluginsString.push(fileContent);
        this.pluginsRepository.set('pluginsString', this.pluginsString);
        return plugin;
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
