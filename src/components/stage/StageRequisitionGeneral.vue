<template>
    <div class="stage-requisition-general container-fluid">
        <div class="row">
            <div class="col pr-2">
                <div class="row">
                    <div class="pl-3 pt-2" style="font-size: 0.8em; color: white">
                        Time out
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-3 pr-3">
                        <input v-model="getComponent().timeout" type="text" class="form-control"
                               style="background-color: transparent; color: white"
                               placeholder="5000">
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col pl-0 pr-2">
                <div class="row">
                    <div class="pl-3 pt-2" style="font-size: 0.8em; color: white">
                        Delay
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-3 pr-3">
                        <input v-model="getComponent().delay" type="text" class="form-control"
                               style="background-color: transparent; color: white"
                               placeholder="0">
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col pl-0">
                <div class="row">
                    <div class="pl-3 pt-2" style="font-size: 0.8em; color: white">
                        Iterations
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-3 pr-3">
                        <input v-model="getComponent().iterations" type="text" class="form-control"
                               style="background-color: transparent; color: white"
                               placeholder="1">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'StageRequisitionGeneral',
        data: function () {
            return {}
        },
        methods: {
            getComponent: function () {
                return this.$store.state.selectedItem
            }
        },
    }
</script>

<style scoped>
    .stage-requisition-general {

    }

</style>
