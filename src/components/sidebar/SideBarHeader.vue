<template>
    <div class="side-bar-header stacker-header"
            @mouseover="mouseIsOver = true"
            @mouseleave="mouseIsOver = false">
        <a href="#" style="text-decoration: none">
            <div class="row">
                <header class="col-10">
                    Stacker
                </header>
                <div class="col-1 align-self-end">
                    <div v-show="mouseIsOver" class="dropdown">
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
        font-size: 90px;
        color: #bbbbbb;
        text-align: center;
    }

    .dropdown-toggle::after {
        display: none !important;
    }


</style>
