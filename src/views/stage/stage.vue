<template>
    <div id="stage" style="height: 100%; background-color: var(--carabina-body-background-darker-color)">
        <template v-if="selectedComponent !== null">
            <StageHeader :component="selectedComponent"
                         style="height: var(--carabina-header-size);"></StageHeader>
            <keep-alive>
                <StageBodyRequisition v-if="selectedComponent.carabinaMeta.componentName === 'REQUISITION'" class="pt-3"
                                      :component="selectedComponent"
                                      style="height: var(--carabina-body-size)"></StageBodyRequisition>
                <component v-else-if="body" :is="body" v-bind="{component: selectedComponent}"
                           class="pt-3" style="height: var(--carabina-body-size)"></component>
                <div v-else style="height: var(--carabina-body-size)"></div>
            </keep-alive>
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
    import PluginsLoader from "@/plugins/plugins-loader";

    export default Vue.extend({
        name: 'Stage',
        components: {StageHeader, StageBodyRequisition, StageFooter},
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
            }
        },
    });
</script>

<style scoped>
</style>
