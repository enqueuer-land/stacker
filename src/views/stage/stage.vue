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
        <template v-if="selectedComponent">
            <StageHeader :component="selectedComponent"
                         style="height: var(--carabina-header-size);"></StageHeader>
            <div class="pt-3" id="body-container">
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
        </template>
        <div v-else style="height: calc(var(--carabina-header-size) + var(--carabina-body-size))"></div>
        <StageFooter id="stage-footer"></StageFooter>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '@/styles/scrollbar.css';
    import Hooks from '@/views/stage/hooks'
    import {mapGetters, mapMutations} from 'vuex';
    import StageFooter from '@/views/stage/stage-footer'
    import StageHeader from '@/views/stage/stage-header'
    import StageBodyRequisition from '@/views/stage/stage-body-requisition'
    import {ComponentTypes} from "@/components/component-types";

    export default Vue.extend({
        name: 'Stage',
        components: {StageHeader, Hooks, StageBodyRequisition, StageFooter},
        methods: {
            ...mapMutations('side-bar', ['currentSelectedComponentChanged']),
            async updateAttribute(attributeName, value) {
                this.currentSelectedComponentChanged({attributeName, value});
            }
        },
        computed: {
            ...mapGetters('stage', ['plugins', 'installingPluginModal']),
            ...mapGetters('side-bar', ['selectedComponent']),
            componentIsRequisition: function() {
                return this.selectedComponent.carabinaMeta.componentName === ComponentTypes.REQUISITION;
            },
            componentBody: function () {
                if (this.selectedComponent && this.selectedComponent.carabinaMeta) {
                    if (this.selectedComponent.carabinaMeta.componentName === ComponentTypes.PUBLISHER) {
                        return this.plugins.publishers[this.selectedComponent.type.toLowerCase()];
                    } else if (this.selectedComponent.carabinaMeta.componentName === ComponentTypes.SUBSCRIPTION) {
                        return this.plugins.subscriptions[this.selectedComponent.type.toLowerCase()];
                    }
                }
                return undefined;
            },
            hooks: function () {
                let hooks = ['onInit'];
                const plugin = this.componentBody;
                if (plugin) {
                    hooks = hooks.concat(plugin.hooks)
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

    #stage-footer {
        height: var(--carabina-footer-size);
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
