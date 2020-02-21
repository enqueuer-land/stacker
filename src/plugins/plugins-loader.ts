import {remote} from 'electron'
import requireFromString from "require-from-string";
import {ComponentTypes} from "@/components/component-types";
import * as fs from 'fs';

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
            instance.loadPlugins();
            PluginsLoader.instance = instance;
        }
        return PluginsLoader.instance;
    }

    public getPlugin(componentType: ComponentTypes, type: string): Plugin | undefined {
        switch (componentType) {
            case ComponentTypes.PUBLISHER:
                return this.plugins.publishers.find((publisher: any) => publisher.type.toLowerCase() === type.toLowerCase());
            case ComponentTypes.SUBSCRIPTION:
                return this.plugins.publishers.find((publisher: any) => publisher.type === type);
            default:
                return undefined;
        }
    }

    public getProtocols(componentType: ComponentTypes): string[] {
        switch (componentType) {
            case ComponentTypes.PUBLISHER:
                return this.plugins.publishers.map((publisher: any) => publisher.type.toUpperCase());
            case ComponentTypes.SUBSCRIPTION:
                return this.plugins.subscriptions.map((publisher: any) => publisher.type.toUpperCase());
        }
        return [];
    }

    private loadPlugins(): void {
        fs.readdirSync('./plugins').forEach(filename => {
            try {
                const file = fs.readFileSync('./plugins/' + filename).toString();
                const plugin = requireFromString(file);
                this.plugins.publishers = this.plugins.publishers.concat(plugin.publishers || []);

            } catch (e) {
                console.error(e);
            }
        });
    }
}
