// @ts-ignore
import * as pagedown from 'pagedown';
import {HttpRequest} from '@/http/http-request';

export type PluginData = {
        readme: string;
        user: string;
        picture: string;
        javascript: string;
        size: string;
    }

//TODO test it
export class PluginDataFetcher {
    private readonly httpRequest = new HttpRequest();
    private readonly converter = new pagedown.Converter();
    private readonly plugin: any;
    private readonly user: string;
    private readonly repo: string;

    public constructor(plugin: any) {
        this.plugin = plugin;
        const repoUrl = this.plugin.repositoryUrl.split('/');
        this.user = repoUrl[repoUrl.length - 2];
        this.repo = repoUrl[repoUrl.length - 1];
    }

    public async fetch(): Promise<PluginData> {
        const javascript = await this.httpRequest
            .request(this.plugin.javascriptUrl);

        return {
            readme: await this.fetchReadme(),
            user: this.user,
            picture: `http://github.com/${this.user}.png`,
            javascript: javascript.data,
            size: (javascript.data.length / 1024).toFixed(2),
        }
    }

    private async fetchReadme() {
        const readme: string = (await this.httpRequest
            .request(`https://raw.githubusercontent.com/${this.user}/${this.repo}/master/README.md`)).data;

        return this.converter.makeHtml(readme)
            .replace(/<img/g, '<img class="img-fluid" ')
            .replace(/<h(\d)/g, (match: string, level: number) => `<h${Math.min(level + 2, 6)}`)
            .replace(/<a/g, '<a target="_blank"')
            .replace(/src="([^"]*)/g, (match: string, url: string) => {
                if (url.startsWith('http')) {
                    return match;
                }
                return `src="https://raw.githubusercontent.com/${this.user}/${this.repo}/master/${url}`;
            });
    }
}
