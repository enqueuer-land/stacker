import requireFromString from 'require-from-string';
import {ComponentTypes} from '@/components/component-types';
import * as httpPublisher from '@/plugins/http-publisher';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

export type Plugin = {
    stacker: {
        type: string;
        component: ComponentTypes;
    };
    template: string;
    props: {
        component: string;
    };
};


//TODO test it
export default class PluginsLoader {
    private static instance: PluginsLoader;
    private readonly plugins: any;

    private constructor() {
        this.plugins = {
            publishers: [],
            subscriptions: []
        };
    }

    public static getInstance(): PluginsLoader {
        if (!PluginsLoader.instance) {
            const instance = new PluginsLoader();
            instance.loadPluginsFromFolders('./plugins', os.homedir() + '/.nqr/stacker/plugins');
            instance.loadPlugin(httpPublisher.default);
            PluginsLoader.instance = instance;
        }
        return PluginsLoader.instance;
    }

    public getPlugin(componentType: ComponentTypes, type: string): Plugin | undefined {
        switch (componentType) {
            case ComponentTypes.PUBLISHER:
                return this.plugins.publishers.find((publisher: any) => publisher.type.toLowerCase() === type.toLowerCase());
            case ComponentTypes.SUBSCRIPTION:
                return this.plugins.subscriptions.find((subscription: any) => subscription.type.toLowerCase() === type.toLowerCase());
            default:
                return undefined;
        }
    }

    public getProtocols(componentType: ComponentTypes): string[] {
        switch (componentType) {
            case ComponentTypes.PUBLISHER:
                return this.plugins.publishers.map((publisher: any) => publisher.type.toUpperCase());
            case ComponentTypes.SUBSCRIPTION:
                return this.plugins.subscriptions.map((subscription: any) => subscription.type.toUpperCase());
        }
        return [];
    }

    private loadPluginsFromFolders(...directories: string[]): void {
        directories.forEach(directory => {
            console.log(`Reading plugins from ${directory}`);
            try {
                fs.readdirSync(directory)
                    .forEach(filename => {
                        try {
                            const file = fs.readFileSync(path.join(directory, filename)).toString();
                            const plugin = requireFromString(file);
                            this.loadPlugin(plugin);
                        } catch (e) {
                            console.log(e);
                        }
                    });
            } catch (e) {
                console.log(e);
            }
        });
    }

    private loadPlugin(plugin: any) {
        this.plugins.publishers = this.plugins.publishers.concat(plugin.publishers || []);
        this.plugins.subscriptions = this.plugins.subscriptions.concat(plugin.subscriptions || []);
    }
}
