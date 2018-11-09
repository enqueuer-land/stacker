<template>
    <div class="stage">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'Stage',
        data: function () {
            return {}
        }
    }
</script>

<style scoped>
    .stage {
        height: 100vh;
        background-color: var(--stacker-background-color);
    }

</style>
