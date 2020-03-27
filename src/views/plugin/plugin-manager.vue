<template>
    <b-modal :visible="pluginManagerModal" busy size="xl"
             no-fade centered hide-header-close hide-header
             body-bg-variant="plugin-manager"
             @hidden="setPluginManagerModalVisibility(false)"
             footer-class="plugin-manager-footer-class">
        <b-container fluid class="p-0 m-0" style="user-select: none">
            <b-container v-if="installingPluginModal" id="installing-plugin-modal" fluid="">
                <b-row style="height: 100%" align-h="center" align-v="center">
                    <b-col cols="auto">
                        <b-spinner style="width: 10rem; height: 10rem; color: var(--carabina-theme-color)"
                                   label="Loading"></b-spinner>
                    </b-col>
                </b-row>
            </b-container>
            <b-row class="py-2 m-0 mb-2 carabina-text plugin-manager-title">
                <b-col style="font-size: 30px">
                    Manage Plugin
                </b-col>
                <b-col cols="auto" @click="loadPluginsFromFileSystem">
                    <i class="fas fa-folder-open carabina-icon"></i>
                </b-col>
            </b-row>
            <b-row no-gutters style="height: 70vh">
                <b-col cols="4" id="plugins-list-panel">
                    <div v-for="(plugin, index) in plugins" :key="index" :style="itemStyle(index)"
                         class="carabina-text p-2 plugin-manager-item"
                         @click="renderPlugin(index)">
                        <b-row class="pb-1">
                            <b-col col style="font-weight: bold; color: var(--carabina-text-color);">
                                {{plugin.name}}
                            </b-col>
                            <b-col cols="auto">
                                <b-button size="sm" class="float-right" variant="install-button"
                                          @click="installPlugin(plugin.javascript)">
                                    Install
                                </b-button>
                            </b-col>
                        </b-row>
                        <span class="pl-2">
                            {{plugin.description}}
                        </span>
                    </div>
                </b-col>
                <b-col cols="8" class="carabina-text px-4 py-1" id="plugin-display-panel">
                    <template v-if="selectedIndex !== null">
                        <div class="carabina-text" style="font-size: 48px">{{plugins[selectedIndex].name}}</div>
                        <div v-html="plugins[selectedIndex].readme"></div>
                    </template>
                </b-col>
            </b-row>
        </b-container>

        <template v-slot:modal-footer="{ ok }">
            <b-button size="sm" variant="plugin-manager-ok-button" @click="ok()">
                OK
            </b-button>
        </template>

    </b-modal>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import pagedown from 'pagedown';
    import {Logger} from '@/components/logger';
    import {HttpRequest} from '@/http/http-request';
    import {FileDialog} from '@/renderer/file-dialog';
    import {PluginsLoader} from '@/plugins/plugins-loader';
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import {RendererMessageCommunicator} from '@/renderer/renderer-message-communicator';

    const converter = new pagedown.Converter();
    const httpRequest = new HttpRequest();

    export default Vue.extend({
        name: 'PluginManager',
        data: function () {
            return {
                plugins: [],
                selectedIndex: null,
                installingPluginModal: true,
            }
        },
        mounted: async function () {
            const pluginsList = await httpRequest
                .request('https://raw.githubusercontent.com/enqueuer-land/stacker-plugins/master/plugins.json');
            if (pluginsList.statusCode === 200) {
                this.plugins = JSON.parse(pluginsList.data);
                if (this.plugins.length > 0) {
                    this.renderPlugin(0);
                }
            }
            this.installingPluginModal = false;
        },
        methods: {
            ...mapMutations('stage', ['setPluginManagerModalVisibility']),
            ...mapActions('stage', ['loadPlugin']),
            installPlugin: async function (javascript) {
                this.installingPluginModal = true;
                await this.loadPlugin(javascript);
                RendererMessageCommunicator.emit('restartEnqueuer');
                this.installingPluginModal = false;
            },
            loadPluginsFromFileSystem: async function () {
                const pickedFiles = await FileDialog.showOpenDialog();
                if (pickedFiles.length > 0) {
                    this.installingPluginModal = true;
                    const pluginsLoader = PluginsLoader.getInstance();
                    try {
                        await Promise
                            .all(pickedFiles
                                .map(async file => await pluginsLoader.loadFileFromFileSystem(file)));
                    } catch (e) {
                        Logger.error(e);
                    }
                    RendererMessageCommunicator.emit('restartEnqueuer');
                    this.installingPluginModal = false;
                }
            },
            renderPlugin: async function (index) {
                const plugin = this.plugins[index];
                if (!plugin.loaded) {
                    const repoUrl = plugin.repositoryUrl.split('/');
                    const user = repoUrl[repoUrl.length - 2];
                    const repo = repoUrl[repoUrl.length - 1];

                    const javascript = await httpRequest
                        .request(plugin.javascriptUrl);
                    const readme = await httpRequest
                        .request(`https://raw.githubusercontent.com/${user}/${repo}/master/README.md`, {});
                    const readMeHtmlized = converter.makeHtml(readme.data)
                        .replace(/<img/g, '<img class="img-fluid" ')
                        .replace(/src="([^"]*)/g, (match, url) => {
                            if (url.startsWith('http')) {
                                return match;
                            }
                            return `src="https://raw.githubusercontent.com/${user}/${repo}/master/${url}`;
                        })
                        .replace(/<a/g, '<a target="_blank"');
                    plugin.readme = readMeHtmlized;
                    plugin.javascript = javascript.data;
                    plugin.loaded = true;
                }
                this.selectedIndex = index;
            }
        },
        computed: {
            ...mapGetters('stage', ['pluginManagerModal']),
            itemStyle: function () {
                return function (index) {
                    const style = {
                        height: '80px',
                        cursor: 'pointer',
                        overflow: 'hidden'
                    };
                    if (index === this.selectedIndex) {
                        style.color = 'var(--carabina-text-color)';
                        style['background-color'] = 'var(--carabina-header-background-color)';
                    }
                    return style;
                }
            }
        }
    });
</script>
<style type="text/css">
    #plugin-manager {
    }

    .plugin-manager-title {
        user-select: none;
        border-bottom: 1px solid var(--carabina-header-background-lighter-color);
    }

    .bg-plugin-manager {
        padding: 10px;
    }

    .plugin-manager-item {
        border-bottom: 1px solid var(--carabina-header-background-lighter-color);
    }

    .plugin-manager-item:hover {
        color: var(--carabina-text-color);
    }

    #plugins-list-panel {
        background-color: var(--carabina-header-background-darker-color);
        height: 100%;
        overflow-y: auto;
    }

    #plugin-display-panel {
        background-color: var(--carabina-header-background-darker-color);
        overflow-y: auto;
        height: 100%;
        border-left: 1px solid var(--carabina-header-background-lighter-color);
    }

    .plugin-manager-footer-class {
        border-top: 1px solid var(--carabina-header-background-lighter-color);
    }

    .btn-plugin-manager-ok-button {
        background-color: var(--carabina-theme-color);
    }

    .btn-plugin-manager-ok-button:hover {
        filter: brightness(1.1);
    }

    #plugin-display-panel pre {
        padding: 10px;
        background-color: var(--carabina-nav-bar-background-color);
    }

    #plugin-display-panel pre code {
        color: var(--carabina-text-color);
    }

    .btn-install-button {
        border: 1px solid var(--carabina-theme-color);
        color: var(--carabina-theme-color);
    }

    .btn-install-button:hover {
        background-color: var(--carabina-theme-color);
        color: var(--carabina-text-color);
    }

    #installing-plugin-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.5);
    }

</style>
