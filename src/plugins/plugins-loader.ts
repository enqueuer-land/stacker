import * as fs from 'fs';
import * as os from 'os';
import * as path from "path";
import {remote} from "electron";
import Store from 'electron-store';
import {execSync} from 'child_process';
import requireFromString from 'require-from-string';
import * as httpPublisher from '@/plugins/http-publisher';
import * as httpSubscription from '@/plugins/http-subscription';

const pluginsRepository = new Store({name: 'plugins'});

//TODO test it
export class PluginsLoader {
    private readonly plugins: any;
    private readonly pluginsString: string[];

    constructor() {
        this.plugins = {
            publishers: {http: httpPublisher.default.publishers.http},
            subscriptions: {http: httpSubscription.default.subscriptions.http}
        };
        this.pluginsString = pluginsRepository.get('pluginsString', []);
        this.pluginsString
            .forEach((pluginString: string) => this.loadStringPlugin(pluginString));
        this.tellEnqueuerToAddModules();
    }

    public getPlugins(): object {
        return this.plugins;
    }

    public loadPlugins(): void {
        (remote.dialog.showOpenDialogSync({properties: ['openFile', 'openDirectory', 'multiSelections']}) || [])
            .forEach(file => this.load(file));
        this.tellEnqueuerToAddModules();
    }

    private load(file: string): void {
        const stats = fs.statSync(file);
        if (stats.isDirectory()) {
            this.loadDirectory(file);
        }
        this.loadFromFileSystem(file);
    }

    private loadDirectory(dirname: string): void {
        fs.readdirSync(dirname)
            .map(file => this.loadFromFileSystem(path.join(dirname, file)));
    }

    private loadFromFileSystem(filename: string): void {
        try {
            const fileContent = fs.readFileSync(filename).toString();
            const plugin = this.loadStringPlugin(fileContent);
            this.installEnqueuerPlugins(plugin);
            this.pluginsString.push(fileContent);
            pluginsRepository.set('pluginsString', this.pluginsString);
        } catch (e) {
            console.log(e);
        }
    }

    private loadStringPlugin(pluginString: string): any {
        try {
            const plugin = requireFromString(pluginString);
            this.addPlugin(plugin);
            return plugin;
        } catch (e) {
            console.log(e);
        }
    }

    private tellEnqueuerToAddModules() {
        remote.getGlobal('eventEmitter')
            .emit('addPlugins', PluginsLoader.getEnqueuerDependencies(this.plugins));
    }

    private installEnqueuerPlugins(plugin: any): string[] {
        const enqueuerDependencies = PluginsLoader.getEnqueuerDependencies(plugin);
        return enqueuerDependencies
            .filter(enqueuerPlugin => enqueuerPlugin)
            .map(enqueuerPlugin => {
                console.log(`npm install --prefix ${os.homedir()}/.nqr '${enqueuerPlugin}'`);
                const executed = execSync(`npm install --prefix ${os.homedir()}/.nqr ${enqueuerPlugin}`).toString();
                console.log(`Installing plugin '${enqueuerPlugin}' ${executed}`);
                return enqueuerPlugin;
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
            .map(key => plugin.publishers[key].enqueuerPlugin);
        return publisherPlugins
            .concat(subscriptionPlugins)
            .filter(name => name);
    }
}
