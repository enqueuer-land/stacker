<template>
    <div class="side-bar-header stacker-header"
            @mouseover="mouseIsOver = true"
            @mouseleave="mouseIsOver = false">
        <a href="#">
            <header>
                Stacker
            </header>
        </a>
        <div class="row">
            <div class="col offset-11">
                <p>oi</p>
                <div v-show="mouseIsOver" class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">
                        <i class="material-icons">more_vert</i>
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item color-secondary" href="#" v-for="action in actions" :key="action.name" @click="action.click">{{action.name}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SideBarHeader',
        data: function () {
            return {
                mouseIsOver: false,
                actions: [{
                    name: "Open requisition"
                }, {
                    name: "Add requisition"
                }]
            }
        },
    }
</script>

<style scoped>

    header {
        font-size: 80px;
        color: #bbbbbb;
        text-align: center;
    }


</style>
