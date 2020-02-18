<template>
    <div id="stage" style="height: 100%">
        <StageHeader style="height: var(--carabina-header-size)"></StageHeader>
        <StageBody style="height: var(--carabina-body-size)"></StageBody>
        <StageFooter style="height: var(--carabina-footer-size)"></StageFooter>
    </div>
</template>

<script>
    import StageHeader from '@/views/stage/stage-header'
    import StageBody from '@/views/stage/stage-body'
    import StageFooter from '@/views/stage/stage-footer'
    import Vue from 'vue';

    export default Vue.extend({
        name: 'Stage',
        components: {StageHeader, StageBody, StageFooter}
    });
</script>

<style scoped>
</style>
