<template>
    <b-modal :visible="pluginManagerModal" busy size="xl"
             no-fade centered hide-header-close hide-header
             body-bg-variant="plugin-manager"
             @hidden="setPluginManagerModalVisibility(false)"
             footer-class="plugin-manager-footer-class">
        <b-container fluid class="p-0 m-0" style="user-select: none">
            <b-container v-if="installingPluginModal" id="installing-plugin-modal" fluid>
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
                <b-col cols="auto" class="align-self-center" @click="loadPluginsFromFileSystem">
                    <i style="font-size: 30px" class="fas fa-folder-open carabina-icon"></i>
                </b-col>
            </b-row>
            <b-row no-gutters style="height: 70vh">
                <b-col cols="4" class="pr-2" style="overflow-y: auto;">
<!--                    <stacker-input placeholder="Filter" type="text"-->
<!--                                   @input="filterChanged"-->
<!--                                   trim-->
<!--                                   :value="filter" class="text-input carabina-text mx-1 mb-3">-->
<!--                    </stacker-input>-->
                    <plugin-manager-item v-for="(plugin, index) in filteredPlugins" :key="index"
                                         :item="plugin" :selected="selectedIndex === index"
                                         :justInstalled="justInstalledIndex.includes(index)"
                                         @click.native="selectItem(index)">
                    </plugin-manager-item>
                </b-col>
                <b-col cols="8" class="carabina-text px-3 py-1"
                       style="border-left: 1px solid var(--carabina-header-background-lighter-color)">
                    <plugin-manager-item-display v-if="selectedIndex !== null"
                                                 :justInstalled="justInstalledIndex.includes(selectedIndex)"
                                                 :plugin="plugins[selectedIndex]"
                                                 @install="installPlugin(plugins[selectedIndex], selectedIndex)">
                    </plugin-manager-item-display>
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
    import Store from 'electron-store';
    import {Logger} from '@/components/logger';
    import {HttpRequest} from '@/http/http-request';
    import {FileDialog} from '@/renderer/file-dialog';
    import {PluginsLoader} from '@/plugins/plugins-loader';
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import PluginManagerItem from '@/views/plugin/plugin-manager-item';
    import PluginManagerItemDisplay from '@/views/plugin/plugin-manager-item-display';
    import {RendererMessageCommunicator} from '@/renderer/renderer-message-communicator';

    const httpRequest = new HttpRequest();
    const store = new Store({name: 'plugins-cache'});

    export default Vue.extend({
        name: 'PluginManager',
        components: {
            PluginManagerItem,
            PluginManagerItemDisplay
        },
        data: function () {
            return {
                filter: '',
                plugins: [],
                justInstalledIndex: [],
                selectedIndex: null,
                installingPluginModal: true,
            }
        },
        mounted: async function () {
            try {
                const pluginsList = await httpRequest
                    .request('https://raw.githubusercontent.com/enqueuer-land/stacker-plugins/master/plugins.json', {timeout: 3000});
                if (pluginsList.statusCode === 200) {
                    this.plugins = JSON.parse(pluginsList.data);
                    if (this.plugins.length > 0) {
                        store.set('list', this.plugins);
                        this.selectItem(0);
                    }
                }
            } catch (e) {
                this.plugins = store.get('list', []);
                console.log(e);
            }
            this.installingPluginModal = false;
        },
        methods: {
            ...mapMutations('stage', ['setPluginManagerModalVisibility']),
            ...mapActions('stage', ['loadPlugin']),
            filterChanged: function (value) {
                this.filter = value;
            },
            selectItem: function (index) {
                this.selectedIndex = index;
            },
            installPlugin: async function (plugin, selectedIndex) {
                this.installingPluginModal = true;
                await this.loadPlugin(plugin);
                this.justInstalledIndex.push(selectedIndex);
                this.installingPluginModal = false;
            },
            loadPluginsFromFileSystem: async function () {
                const pickedFiles = await FileDialog.showOpenDialog();
                if (pickedFiles.length > 0) {
                    this.installingPluginModal = true;
                    //TODO move this to stage.store
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
            }
        },
        computed: {
            ...mapGetters('stage', ['pluginManagerModal']),
            filteredPlugins: function () {
                return this.plugins
                    .filter(plugin => JSON.stringify(plugin).includes(this.filter));
            }
        }
    });
</script>
<style type="text/css">
    #plugin-manager {
    }

    .plugin-manager-title {
        user-select: none;
    }

    .bg-plugin-manager {
        padding: 10px;
    }

    .plugin-manager-footer-class {
        border-top: 1px solid var(--carabina-header-background-lighter-color);
    }

    .btn-plugin-manager-ok-button {
        padding-left: 20px;
        padding-right: 20px;
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
