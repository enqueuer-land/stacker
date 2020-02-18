<template>
    <div id="stage" style="height: 100%; background-color: var(--carabina-body-background-darker-color)">
        <template v-if="selectedComponent !== null">
            <StageHeaderRequisition v-if="selectedComponent.carabinaMeta.componentName==='REQUISITION'"
                                    :component="selectedComponent"
                                    style="height: var(--carabina-header-size)"></StageHeaderRequisition>
            <StageBodyRequisition :component="selectedComponent" style="height: var(--carabina-body-size)"></StageBodyRequisition>
            <StageFooter style="height: var(--carabina-footer-size)"></StageFooter>
        </template>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex';
    import StageFooter from '@/views/stage/stage-footer'
    import StageBodyRequisition from '@/views/stage/stage-body-requisition'
    import StageHeaderRequisition from '@/views/stage/stage-header-requisition'

    export default Vue.extend({
        name: 'Stage',
        components: {StageHeaderRequisition, StageBodyRequisition, StageFooter},
        mounted: function() {
            console.log(this.selectedComponent);
        },
        methods: {
            ...mapMutations('side-bar', ['currentSelectedComponentChanged']),
            updateAttribute(attributeName, value) {
                this.currentSelectedComponentChanged({attributeName, value});
            }
        },
        computed: {
            ...mapGetters('side-bar', ['selectedComponent'])
        },
    });
</script>

<style scoped>
</style>
