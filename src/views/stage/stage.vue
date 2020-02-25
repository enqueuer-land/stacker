<template>
    <div id="stage" style="height: 100%; background-color: var(--carabina-body-background-darker-color)">
        <template v-if="selectedComponent !== null">
            <StageHeader :component="selectedComponent"
                         style="height: var(--carabina-header-size);"></StageHeader>
            <div class="pt-3" style="overflow-y: scroll; height: var(--carabina-body-size)">
                <HooksBody class="mb-4" :component="selectedComponent" :hooks="hooks"></HooksBody>
                <keep-alive>
                    <StageBodyRequisition v-if="selectedComponent.carabinaMeta.componentName === 'REQUISITION'"
                                          :component="selectedComponent"></StageBodyRequisition>
                    <component v-else-if="body" :is="body" v-bind="{component: selectedComponent}"></component>
                    <div v-else></div>
                </keep-alive>
            </div>
            <StageFooter style="height: var(--carabina-footer-size)"></StageFooter>
        </template>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex';
    import StageFooter from '@/views/stage/stage-footer'
    import StageBodyRequisition from '@/views/stage/stage-body-requisition'
    import StageHeader from '@/views/stage/stage-header'
    import HooksBody from '@/views/stage/hooks-body'
    import PluginsLoader from "@/plugins/plugins-loader";

    export default Vue.extend({
        name: 'Stage',
        components: {StageHeader, HooksBody, StageBodyRequisition, StageFooter},
        methods: {
            ...mapMutations('side-bar', ['currentSelectedComponentChanged']),
            async updateAttribute(attributeName, value) {
                this.currentSelectedComponentChanged({attributeName, value});
            }
        },
        computed: {
            ...mapGetters('side-bar', ['selectedComponent']),
            body: function () {
                const pluginsLoader = PluginsLoader.getInstance();
                return pluginsLoader.getPlugin(this.selectedComponent.carabinaMeta.componentName, this.selectedComponent.type);
            },
            hooks: function () {
                let hooks = ['onInit'];
                const plugin = this.body;
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
</style>
