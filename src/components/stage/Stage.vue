<template>
    <div class="stage">
        <stage-event/>
        <!--<stage-requisition-header v-if="$store.state.sideBarSelectedItem" :component="$store.state.sideBarSelectedItem"/>-->
        <!--<router-view />-->
        <!--<router-view name="body" />-->
        <!--<router-view name="stage-body"></router-view>-->
    </div>
</template>

<script>
    import StageEvent from "./StageEvent";
    export default {
        name: 'Stage',
        components: {StageEvent}
    }
</script>

<style scoped>
    .stage {
        height: 100vh;
        background-color: var(--stacker-background-color);
        border-left: 1px solid var(--stacker-background-alternative-color);
    }

</style>
