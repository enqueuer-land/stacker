<template>
    <div class="stage">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'Stage',
        components: {}
    }
</script>

<style scoped>
    .stage {
        height: 100vh;
        background-color: var(--stacker-background-color);
        border-left: 1px solid var(--stacker-background-alternative-color);
    }

</style>
