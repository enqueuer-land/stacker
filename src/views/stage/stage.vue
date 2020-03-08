<template>
    <div id="stage" style="height: 100%; background-color: var(--carabina-body-background-darker-color)">
        <template v-if="selectedComponent">
            <StageHeader :component="selectedComponent"
                         style="height: var(--carabina-header-size);"></StageHeader>
            <div class="pt-3" id="body-container">
                <template v-if="selectedComponent && selectedComponent.carabinaMeta">
                    <Hooks class="mb-4" :component="selectedComponent" :hooks="hooks"></Hooks>
                    <keep-alive>
                        <StageBodyRequisition v-if="selectedComponent.carabinaMeta.componentName === 'REQUISITION'"
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
            ...mapGetters('stage', ['plugins']),
            ...mapGetters('side-bar', ['selectedComponent']),
            componentBody: function () {
                if (this.selectedComponent && this.selectedComponent.carabinaMeta) {
                    if (this.selectedComponent.carabinaMeta.componentName === ComponentTypes.PUBLISHER) {
                        const publisher = this.plugins.publishers[this.selectedComponent.type.toLowerCase()];
                        console.log(this.selectedComponent, publisher);
                        return publisher;
                    } else if (this.selectedComponent.carabinaMeta.componentName === ComponentTypes.SUBSCRIPTION) {
                        const subscription = this.plugins.subscriptions[this.selectedComponent.type.toLowerCase()];
                        console.log(this.selectedComponent, subscription);
                        return subscription;
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
</style>
