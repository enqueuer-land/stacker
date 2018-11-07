<template>
    <div class="stage-requisition container-fluid">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Time out
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <input v-model="component.timeout" type="text" class="form-control" style="background-color: transparent; color: white"
                       placeholder="5000">
                <div class="input-group-append">
                    <span class="input-group-text">ms</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Delay
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <input v-model="component.delay" type="text" class="form-control" style="background-color: transparent; color: white"
                       placeholder="0">
                <div class="input-group-append">
                    <span class="input-group-text">ms</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Iterations
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <input v-model="component.iterations" type="text" class="form-control" style="background-color: transparent; color: white"
                       placeholder="1">
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'StageRequisitionGeneral',
        data: function () {
            return {
                component: this.$store.state.sideBarSelectedItem
            }
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<style scoped>
    .stage-requisition {

    }

</style>
