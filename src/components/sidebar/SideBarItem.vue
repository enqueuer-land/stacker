<template>
    <div class="side-bar-item">
        <a class="row no-gutters" href="#" style="text-decoration: none"
           @mouseover="isMouseOver = true"
           @mouseleave="isMouseOver = false"
            >
            <div class="col-1">
                <div v-show="isMouseOver" class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown" style="background-color: aqua">
                        <i class="material-icons">more_vert</i>
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item color-secondary" href="#" v-for="action in actions" :key="action.name" @click="action.click">{{action.name}}</a>
                    </div>
                </div>
            </div>
            <div class="col-3">
                {{item.type}}
            </div>
            <div class="col">
                {{item.name}}
            </div>
            <div class="col-2">
                {{tag}}
            </div>
        </a>

    </div>
</template>

<script>

    export default {
        name: 'SideBarItem',
        props: {
            item: {},
            tag: {}
        },
        data: function () {
            const print = function(message) {
                // debugger;
                // eslint-disable-next-line
                console.log(message);
            };

            return {
                isMouseOver: false,
                actions: [{
                    name: "Delete",
                    click: function(e) {
                        print('delete');
                        e.preventDefault();
                    }
                }, {
                    name: "Add requisition",
                    click: function() {
                        print('Add');
                    }
                }]
            }
        }
    }
</script>

<style scoped>
    .side-bar-item {
        border: 2px blue solid;
        border-left: 8px pink solid;
    }

    .dropdown-toggle::after {
        display: none !important;
    }
</style>
