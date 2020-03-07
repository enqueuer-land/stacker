import * as fs from 'fs';
import * as path from "path";
import {remote} from "electron";
import Store from 'electron-store';
import requireFromString from 'require-from-string';
import * as httpPublisher from '@/plugins/http-publisher';

const pluginsRepository = new Store({name: 'plugins'});

//TODO test it
export class PluginsLoader {
    private readonly plugins: any;
    private readonly pluginsString: string[];

    constructor() {
        this.plugins = {
            publishers: {http: httpPublisher.default.publishers.http},
            subscriptions: {}
        };
        this.pluginsString = pluginsRepository.get('pluginsString', []);
        this.pluginsString.forEach((pluginString: string) => this.loadStringPlugin(pluginString));
    }

    public getPlugins() {
        return this.plugins;
    }


    public loadPlugins() {
        (remote.dialog.showOpenDialogSync({properties: ['openFile', 'openDirectory', 'multiSelections']}) || [])
            .map(file => this.load(file));
        return this.plugins;
    }

    private load(file: string) {
        const stats = fs.statSync(file);
        if (stats.isDirectory()) {
            return this.loadDirectory(file);
        }
        return this.loadFromFileSystem(file);
    }

    private loadDirectory(dirname: string) {
        return fs.readdirSync(dirname)
            .map(file => this.loadFromFileSystem(path.join(dirname, file)));
    }

    private loadFromFileSystem(filename: string): void {
        try {
            const fileContent = fs.readFileSync(filename).toString();
            this.loadStringPlugin(fileContent);
            this.pluginsString.push(fileContent);
            pluginsRepository.set('pluginsString', this.pluginsString);
        } catch (e) {
            console.log(e);
        }
    }

    private loadStringPlugin(pluginString: string) {
        try {
            const plugin = requireFromString(pluginString);
            this.loadPlugin(plugin);
        } catch (e) {
            console.log(e);
        }
    }

    private loadPlugin(plugin: any) {
        this.plugins.publishers = {
            ...this.plugins.publishers,
            ...plugin.publishers
        };
        this.plugins.subscriptions = {
            ...this.plugins.subscriptions,
            ...plugin.subscriptions
        };
    }
}
