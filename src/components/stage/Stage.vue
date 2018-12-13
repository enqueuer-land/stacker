<template>
    <div class="stage">
        <div v-if="!$store.state.selectedItem">
            <div class="stacker-header" style="background-color: var(--stacker-header-background-color)" ></div>
            <div style="height: calc(100vh - 190px);"></div>
        </div>
        <router-view v-else class="stage-body"/>
        <stage-footer></stage-footer>
    </div>
</template>

<script>
    import StageFooter from "./StageFooter";
    export default {
        name: 'Stage',
        components: {StageFooter},
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

    .stage-body {
        height: calc(100vh - 40px);
    }

</style>
