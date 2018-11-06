<template>
    <div class="stage">
        <stage-header :component="$store.state.requisitions[0]"/>
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
