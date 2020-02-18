<template>
    <div id="stage" style="height: 100%">
        <StageHeaderRequisition style="height: var(--carabina-header-size)"></StageHeaderRequisition>
        <StageBodyRequisition style="height: var(--carabina-body-size)"></StageBodyRequisition>
        <StageFooter style="height: var(--carabina-footer-size)"></StageFooter>
    </div>
</template>

<script>
    import StageHeaderRequisition from '@/views/stage/stage-header-requisition'
    import StageBodyRequisition from '@/views/stage/stage-body-requisition'
    import StageFooter from '@/views/stage/stage-footer'
    import Vue from 'vue';

    export default Vue.extend({
        name: 'Stage',
        components: {StageHeaderRequisition, StageBodyRequisition, StageFooter},
        methods: {
            updateAttribute(attributeName, value) {
                console.log(attributeName, value);
            }
        }
    });
</script>

<style scoped>
</style>
