<template>
    <div id="stage" style="height: 100%; background-color: var(--carabina-body-background-darker-color)">
        <b-container v-if="installingPluginModal" id="installing-plugin-modal" fluid="">
            <b-row style="height: 100%" align-h="center" align-v="center">
                <b-col cols="auto">
                    <b-spinner style="width: 10rem; height: 10rem; color: var(--carabina-theme-color)"
                               label="Loading plugin"></b-spinner>
                </b-col>
            </b-row>
        </b-container>
        <div style="height: var(--carabina-header-size);">
            <StageHeader v-if="selectedComponent" :component="selectedComponent"></StageHeader>
        </div>
        <div id="stage-panel-container" class="wrapper"
             style="height: calc(100% - var(--carabina-header-size)) !important;">
            <div id="body-container" class="pt-3" style="height: var(--carabina-body-size);">
                <template v-if="selectedComponent && selectedComponent.carabinaMeta">
                    <Hooks class="mb-4" :component="selectedComponent" :hooks="hooks"></Hooks>
                    <keep-alive>
                        <StageBodyRequisition v-if="componentIsRequisition"
                                              :component="selectedComponent"></StageBodyRequisition>
                        <component v-else-if="componentBody" :is="componentBody"
                                   v-bind="{component: selectedComponent}"></component>
                    </keep-alive>
                </template>
            </div>
            <StageFooter @expandWindow="expandLogWindow" @compressWindow="compressWindow" id="footer-container"
                         style="background-color: var(--carabina-nav-bar-background-color)" class="pt-2"></StageFooter>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import split from 'split.js';
    import '@/styles/scrollbar.css';
    import '@/styles/color-palette.css';
    import Hooks from '@/views/stage/hooks'
    import {mapGetters, mapMutations} from 'vuex';
    import StageFooter from '@/views/stage/stage-footer'
    import StageHeader from '@/views/stage/stage-header'
    import {ComponentTypes} from '@/components/component-types';
    import StageBodyRequisition from '@/views/stage/stage-body-requisition'
    import {RendererMessageCommunicator} from '@/renderer/renderer-message-communicator';

    export default Vue.extend({
        name: 'Stage',
        components: {
            StageHeader,
            Hooks,
            StageBodyRequisition,
            StageFooter
        },
        mounted: function () {
            RendererMessageCommunicator.on('expandLogWindow', () => this.expandLogWindow());
            RendererMessageCommunicator.on('collapseLogWindow', () => this.compressWindow());
            this.adjustStageLength();
            document.addEventListener('resize', () => {
                this.adjustStageLength();
            });
        },
        data: function () {
            return {
                footerHeightInPixels: 40,
                splitter: undefined
            }
        },
        methods: {
            ...mapMutations('side-bar', ['currentSelectedComponentChanged']),
            expandLogWindow: function () {
                this.adjustStageLength(90);
            },
            compressWindow: function () {
                this.adjustStageLength(1);
            },
            adjustStageLength: function (footerRelativeHeight) {
                const wrapper = document.getElementById('stage-panel-container');
                const gutterHeight = 6;
                if (!footerRelativeHeight) {
                    footerRelativeHeight = (100 * this.footerHeightInPixels) / wrapper.offsetHeight;
                }
                const bodyRelativeHeight = 100 - footerRelativeHeight;
                if (this.splitter) {
                    this.splitter.destroy();
                }

                this.splitter = split(['#body-container', '#footer-container'], {
                    gutterSize: gutterHeight,
                    direction: 'vertical',
                    sizes: [bodyRelativeHeight, footerRelativeHeight],
                    minSize: [100 - gutterHeight / 2, 40 - gutterHeight / 2],
                    gutterStyle: () => ({
                        position: 'relative',
                        height: '2px',
                        'background-color': 'var(--carabina-body-background-color)'
                    }),
                    onDragEnd: (data) => {
                        this.footerHeightInPixels = (data[1] * wrapper.offsetHeight / 100);
                        console.log(this.footerHeightInPixels);
                    }
                });

            },
            updateAttribute: async function (attributeName, value) {
                this.currentSelectedComponentChanged({attributeName, value});
            }
        },
        computed: {
            ...mapGetters('stage', ['plugins', 'installingPluginModal']),
            ...mapGetters('side-bar', ['selectedComponent']),
            componentIsRequisition: function () {
                return this.selectedComponent.carabinaMeta.type === ComponentTypes.REQUISITION;
            },
            componentBody: function () {
                if (this.selectedComponent && this.selectedComponent.carabinaMeta) {
                    if (this.selectedComponent.carabinaMeta.type === ComponentTypes.PUBLISHER) {
                        return this.plugins.publishers[this.selectedComponent.type.toLowerCase()];
                    } else if (this.selectedComponent.carabinaMeta.type === ComponentTypes.SUBSCRIPTION) {
                        return this.plugins.subscriptions[this.selectedComponent.type.toLowerCase()];
                    }
                }
                return undefined;
            },
            hooks: function () {
                let hooks = ['onInit'];
                const plugin = this.componentBody;
                if (plugin) {
                    hooks = hooks.concat(plugin.hooks || [])
                }
                hooks.push('onFinish');
                return hooks;
            }
        },
    });
</script>

<style scoped>
    #body-container {
        overflow-y: scroll;
        background-color: var(--carabina-header-background-darker-color);
        height: var(--carabina-body-size);
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

    #footer-container:active, #footer-container:focus {
        box-shadow: none !important;
        outline: none !important;
    }
</style>
