<template>
    <div :class="sideBarItemClass">
        <a class="row no-gutters" href="#" style="text-decoration: none"
           @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false"
            >
            <div class="col-1 align-self-center">
                <div v-show="mouseIsOver" class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                        <i class="material-icons">more_vert</i>
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="action in actions" :key="action.name" @click="action.click">{{action.name}}</a>
                    </div>
                </div>
            </div>
            <div :class="typeClass">
                {{item.type}}
                <div v-show="isRequisition" class="dropdown">
                    <a href="#">
                        <i style="color: var(--requisition-color)" class="material-icons">folder</i>
                    </a>
                </div>
            </div>
            <div class="col align-self-center">
                {{item.name}}
            </div>
            <div :class="tagClass">
                {{tag}} #{{index}}
            </div>
        </a>

    </div>
</template>

<script>
    import $store from "../../store";

    export default {
        name: 'SideBarItem',
        props: {
            index: {},
            item: {},
            tag: {}
        },
        data: function () {
            const isRequisition = this.tag.toUpperCase().startsWith('REQ');
            let actions = [];
            actions.push({
                name: "Delete",
                click: () => {}
            });
            if (isRequisition) {
                actions.push({
                    name: "Add requisition",
                    click: () => {
                        $store.commit('addRequisition', this.item);
                    }
                });
                actions.push({
                    name: "Add publisher",
                    click: () => {}
                });
                actions.push({
                    name: "Add subscription",
                    click: () => {}
                });
            }
            return {
                mouseIsOver: false,
                actions: actions,
                isRequisition: isRequisition,
                isPublisher: this.tag.toUpperCase().startsWith('PUB'),
                isSubscription: this.tag.toUpperCase().startsWith('SUB'),
            }
        },
        computed: {
            sideBarItemClass: function() {
                return {
                    'side-bar-item': true,
                }
            },
            tagClass: function() {
                return {
                    pr2: true,
                    'align-self-center': true,
                    'requisition-color': this.isRequisition,
                    'publisher-color': this.isPublisher,
                    'subscription-color': this.isSubscription,
                    'tag': true,
                    'pr-1': true
                }
            },
            typeClass: function() {
                return {
                    pr2: true,
                    'align-self-center': true,
                    'col-2': true,
                    'requisition-color': this.isRequisition,
                    'publisher-color': this.isPublisher,
                    'subscription-color': this.isSubscription,
                    'tag': true
                };
            }
        }
    }
</script>

<style scoped>
    .side-bar-item {
        border-bottom: 1px solid var(--stacker-background-alternative-color);
        background-color: var(--stacker-background-color);
    }

    .side-bar-item > a:hover {
        color: white;
        border-left: 4px solid;
    }

    .side-bar-item a {
        color: #bababa;
        height: inherit;
    }

    /*.side-bar-item a:active {*/
        /*color: white;*/
    /*}*/

    .dropdown-toggle::after {
        display: none !important;
    }

    .tag {
        font-size: 0.6em;
        text-transform: uppercase;
        font-weight: bold;
    }

</style>
