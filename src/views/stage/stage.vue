<template>
    <div id="stage" style="height: 100%; background-color: var(--carabina-body-background-darker-color)">
        <template v-if="selectedComponent !== null">
            <StageHeader :component="selectedComponent"
                         style="height: var(--carabina-header-size)"></StageHeader>
            <StageBodyRequisition :component="selectedComponent"
                                  style="height: var(--carabina-body-size)"></StageBodyRequisition>
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

    export default Vue.extend({
        name: 'Stage',
        components: {StageHeader, StageBodyRequisition, StageFooter},
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
