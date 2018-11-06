<template>
    <div class="stage">
        <stage-requisition-header v-if="$store.state.sideBarSelectedItem" :component="$store.state.sideBarSelectedItem"/>
    </div>
</template>

<script>
import StageRequisitionHeader from "./StageRequisitionHeader";

export default {
    name: 'Stage',
    components: {
        StageRequisitionHeader
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
