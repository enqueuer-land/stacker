<template>
    <div class="carabina-text" id="plugin-display-panel">
        <b-row align-v="center" no-gutters class="mb-4">
            <b-col cols="auto" class="pr-3">
                <img v-if="loaded" :src="plugin.picture"
                     style="width: 70px;"
                     class="img-fluid">
            </b-col>
            <b-col cols>
                <b-row no-gutters align-v="center">
                    <b-col col>
                        <h2>{{plugin.name}}</h2>
                    </b-col>
                    <b-col cols="auto" class="px-3">
                        <small>{{plugin.version}}</small>
                    </b-col>
                    <b-col cols="auto">
                        <b-button v-if="loaded" size="sm" class="float-right" :disabled="isInstalled"
                                  variant="install-button"
                                  @click="() => $emit('install')">
                            Install
                        </b-button>
                    </b-col>
                </b-row>
                <b-row v-if="loaded" no-gutters align-h="between">
                    <b-col cols="auto" class="pl-1">
                        <small>@{{plugin.user}}</small>
                    </b-col>
                    <b-col cols="auto" class="pl-1">
                        <small>{{plugin.size}} Kib</small>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <div v-if="loaded" class="px-3 mt-5" v-html="plugin.readme"></div>
        <b-container v-else fluid style="height: 80%">
            <b-row style="height: 100%" align-h="center" align-v="center">
                <b-col cols="auto">
                    <b-spinner style="width: 10rem; height: 10rem; color: var(--carabina-theme-color)"
                               label="Loading"></b-spinner>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import pagedown from 'pagedown';
    import {HttpRequest} from '@/http/http-request';
    import {PluginsLoader} from '@/plugins/plugins-loader';

    const converter = new pagedown.Converter();
    const httpRequest = new HttpRequest();

    export default Vue.extend({
        name: 'PluginManagerItemDisplay',
        props: {
            plugin: Object
        },
        data: function () {
            return {
                loaded: false
            }
        },
        mounted: function () {
            this.loaded = false;
            this.loadData();
        },
        watch: {
            plugin: function () {
                this.loaded = false;
                this.loadData();
            }
        },
        computed: {
            //TODO move to stage.store
            isInstalled: function () {
                return PluginsLoader.getInstance().pluginIsInstalled(this.plugin);
            },
        },
        methods: {
            //TODO extract to a class
            loadData: async function () {
                if (!this.plugin.loaded) {
                    const repoUrl = this.plugin.repositoryUrl.split('/');
                    const user = repoUrl[repoUrl.length - 2];
                    const repo = repoUrl[repoUrl.length - 1];

                    const javascript = await httpRequest
                        .request(this.plugin.javascriptUrl);
                    const readme = await httpRequest
                        .request(`https://raw.githubusercontent.com/${user}/${repo}/master/README.md`);
                    const readMeHtmlized = converter.makeHtml(readme.data)
                        .replace(/<img/g, '<img class="img-fluid" ')
                        .replace(/<h(\d)/g, (match, level) => `<h${Math.min(level + 2, 6)}`)
                        .replace(/<a/g, '<a target="_blank"')
                        .replace(/src="([^"]*)/g, (match, url) => {
                            if (url.startsWith('http')) {
                                return match;
                            }
                            return `src="https://raw.githubusercontent.com/${user}/${repo}/master/${url}`;
                        });
                    this.plugin.user = user;
                    this.plugin.picture = `http://github.com/${user}.png`;
                    this.plugin.readme = readMeHtmlized;
                    this.plugin.javascript = javascript.data;
                    this.plugin.size = (javascript.data.length / 1024).toFixed(2);
                    this.plugin.loaded = true;
                }
                this.loaded = true;
            }
        }
    });
</script>
<style type="text/css">
    #plugin-display-panel {
        background-color: var(--carabina-header-background-darker-color);
        overflow-y: auto;
        height: 100%;
    }

    #plugin-display-panel pre {
        padding: 10px;
        background-color: var(--carabina-nav-bar-background-color);
    }

    #plugin-display-panel pre code {
        color: var(--carabina-text-color);
    }

    .btn-install-button {
        background-color: var(--carabina-theme-color);
        color: var(--carabina-header-background-darker-color);
    }

    .btn-install-button:hover:not(.disabled) {
        filter: brightness(1.15);
    }

</style>
