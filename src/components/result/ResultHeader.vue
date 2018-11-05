<template>
    <div class="result-header stacker-header"
         @mouseover="mouseIsOver = true"
         @mouseleave="mouseIsOver = false">
        <a href="#" style="text-decoration: none;">
            <div class="row">
                <div class="col align-self-center">
                    <img src="../../../src/assets/fullLogo3.png" class="img-fluid mx-auto rounded d-block"
                         style="height: -webkit-fill-available">
                </div>
                <div class="col-1 align-self-end">
                    <div v-show="mouseIsOver" class="dropdown dropleft">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" v-for="action in actions" :key="action.name">{{action.name}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>


</template>

<script>

    export default {
        name: 'ResultHeader',
        components: {},
        data: function () {
            return {
                mouseIsOver: false,
                actions: [{
                    name: "Save"
                }]
            }
        },
    }
</script>

<style scoped>
    .result-header {

    }

    .dropdown-toggle::after {
        display: none !important;
    }

</style>
