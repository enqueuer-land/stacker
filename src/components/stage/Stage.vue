<template>
    <div class="stage">
        <div class="stacker-header" v-if="!$store.state.selectedItem"></div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'Stage',
        data: function () {
            return {}
        },
        methods: {
        }
    }
</script>

<style scoped>
    .stage {
        height: 100vh;
        background-color: var(--stacker-background-color);
    }

</style>
