<template>
    <div class="stage">
        <stage-header v-if="$store.state.sideBarSelectedItem" :component="$store.state.sideBarSelectedItem"/>
    </div>
</template>

<script>
import StageHeader from "./StageHeader";

export default {
    name: 'Stage',
    components: {
        StageHeader
    }
}
</script>

<style scoped>
    .stage {
        height: 100vh;
        background-color: var(--stacker-background-color);
        border-left: 1px solid var(--stacker-background-alternative-color);
    }

</style>
