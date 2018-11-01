<template>
    <div class="side-bar-item">
        <a class="row no-gutters" href="#" style="text-decoration: none"
           @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false"
            >
            <div class="col-1">
                <div v-show="isMouseOver" class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                        <i class="material-icons">more_vert</i>
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item color-secondary" href="#" v-for="action in actions" :key="action.name" @click="action.click">{{action.name}}</a>
                    </div>
                </div>
            </div>
            <div :class="getTagClass() + ' col-2'">
                {{item.type}}
            </div>
            <div class="col">
                {{item.name}}
            </div>
            <div :class="getTagClass()">
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
                // eslint-disable-next-line
                console.log(message);
            };

            return {
                mouseIsOver: false,
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
        },
        methods: {
            getTagClass: function() {
                switch (this.tag.toUpperCase()) {
                    case 'REQ':
                        return 'pr-2 text-requisition tag';
                    case 'PUB':
                        return 'pr-2 text-publisher tag';
                    default: //case 'SUB':
                        return 'pr-2 text-subscription tag';
                }
            }
        }
    }
</script>

<style scoped>
    .text-publisher {
        color: var(--publisher-color)
    }

    .text-requisition {
        color: var(--requisition-color);
    }
    .text-subscription {
        color: var(--subscription-color);
    }

    .side-bar-item > a:hover {
        background-color: #323232;
        color: white;
        border-left: 4px solid;
    }

    .side-bar-item a:active {
        color: white;
    }

    .side-bar-item a {
        color: #bababa;
        height: inherit;
    }

    .side-bar-item {
        height: 30px;
        /*border-top: 1px solid #4d4d4d;*/
        padding-left: 1px;
        background-color: #2b2b2b;
        /*border-left: 8px solid;*/
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    /*.tag-leaf {*/
        /*background-color: #8f8f8f;*/
        /*font-size: 0.8em;*/
        /*text-transform: uppercase;*/
        /*font-weight: bold;*/
    /*}*/

    .tag {
        /*background-color: #2b2b2b;*/
        font-size: 0.8em;
        text-transform: uppercase;
        font-weight: bold;
    }

</style>
