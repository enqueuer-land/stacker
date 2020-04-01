<template>
    <div class="carabina-text" id="plugin-display-panel">
        <b-row align-v="center" no-gutters class="mb-4">
            <b-col cols="auto" class="pr-3">
                <img v-if="loaded" :src="plugin.picture"
                     style="width: 70px; border-radius: 10px;"
                     class="img-fluid">
            </b-col>
            <b-col cols>
                <b-row no-gutters align-v="center">
                    <b-col col>
                        <h2 class="m-0">{{plugin.name}}</h2>
                    </b-col>
                    <b-col cols="auto">
                        <template v-if="loaded" class="float-right">
                            <template v-if="isInstalled">
                                <b-button size="sm"
                                          class="mx-2"
                                          variant="uninstall-button"
                                          @click="() => $emit('uninstall')">
                                    Uninstall {{currentVersion}}
                                </b-button>
                                <b-button v-if="isNewVersion" size="sm"
                                          variant="install-button"
                                          @click="() => $emit('install')">
                                    Upgrade to {{plugin.version}}
                                </b-button>
                            </template>
                            <b-button v-else size="sm"
                                      variant="install-button"
                                      @click="() => $emit('install')">
                                Install {{plugin.version}}
                            </b-button>
                        </template>
                    </b-col>
                </b-row>
                <b-row v-if="loaded" no-gutters>
                    <b-col cols="auto" class="pl-1">
                        <small>@{{plugin.author}}</small>
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
    import {mapGetters} from 'vuex';
    import {Logger} from '@/components/logger';
    import {PluginDataFetcher} from '@/plugins/plugin-data-fetcher';

    export default Vue.extend({
        name: 'PluginManagerItemDisplay',
        props: {
            plugin: Object,
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
            ...mapGetters('stage', ['pluginsNames']),
            isInstalled: function () {
                return this.pluginsNames.some(name => name.startsWith(`${this.plugin.name}/`));
            },
            currentVersion: function () {
                if (this.isInstalled) {
                    const installed = this.pluginsNames.find(name => name.startsWith(`${this.plugin.name}/`));
                    return installed.split('/')[1];
                }
                return '';
            },
            isNewVersion: function () {
                const installed = this.pluginsNames.find(name => name.startsWith(`${this.plugin.name}/`));
                const currentInstalledVersion = installed.split('/')[1];
                console.log(currentInstalledVersion, this.plugin.version);
                return currentInstalledVersion < this.plugin.version;
            },
        },
        methods: {
            loadData: async function () {
                if (!this.plugin.loaded) {
                    const data = await new PluginDataFetcher(this.plugin).fetch();
                    Logger.info(`Plugin ${this.plugin.name} data fetched`);
                    Object.keys(data)
                        .forEach(key => this.plugin[key] = data[key]);
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

    .btn-uninstall-button {
        background-color: var(--carabina-fail-theme-color);
        color: var(--carabina-header-background-darker-color);
    }

</style>
