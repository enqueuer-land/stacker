<template>
    <div :class="sideBarItemClass">
        <a class="row no-gutters" href="#" style="text-decoration: none"
           @click="$store.commit('sideBarItemSelected', item)"
           @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false"
            >
            <div class="col-1 align-self-center">
                <div v-show="mouseIsOver" class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">
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
                        <!--<i v-if="item.selected" style="color: var(&#45;&#45;requisition-color)" class="material-icons">folder_open</i>-->
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

    export default {
        name: 'SideBarItem',
        props: {
            index: {},
            item: {},
        },
        data: function () {
            const tag = this.item.component.substr(0, 3);
            const isRequisition = tag.toUpperCase().startsWith('REQ');
            let actions = [];
            actions.push({
                name: "Delete",
                click: () => {
                    this.$store.commit('deleteComponent', this.item);
                }
            });
            if (isRequisition) {
                actions.push({
                    name: "Add requisition",
                    click: () => {
                        this.$store.commit('addRequisition', this.item);
                    }
                });
                actions.push({
                    name: "Add publisher",
                    click: () => {
                        this.$store.commit('addPublisher', this.item);
                    }
                });
                actions.push({
                    name: "Add subscription",
                    click: () => {
                        this.$store.commit('addSubscription', this.item);
                    }
                });
            }
            return {
                mouseIsOver: false,
                tag: tag,
                actions: actions,
                isRequisition: isRequisition,
                isPublisher: tag.toUpperCase().startsWith('PUB'),
                isSubscription: tag.toUpperCase().startsWith('SUB'),
            }
        },
        computed: {
            sideBarItemClass: function() {
                return {
                    'side-bar-item': true,
                    'requisition-side-bar-hover': this.isRequisition && this.mouseIsOver,
                    'publisher-side-bar-hover': this.isPublisher && this.mouseIsOver,
                    'subscription-side-bar-hover': this.isSubscription && this.mouseIsOver,
                    'requisition-side-bar-selected': this.isRequisition && this.$store.state.sideBarSelectedItem.id === this.item.id,
                    'publisher-side-bar-selected': this.isPublisher && this.$store.state.sideBarSelectedItem.id === this.item.id,
                    'subscription-side-bar-selected': this.isSubscription && this.$store.state.sideBarSelectedItem.id === this.item.id,
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

    .requisition-side-bar-selected {
        color: white;
        border-left: 8px var(--requisition-color) solid;
    }

    .publisher-side-bar-selected {
        color: white;
        border-left: 8px var(--publisher-color) solid;
        margin-right: 8px var(--stacker-background-color) solid;
    }

    .subscription-side-bar-selected {
        color: white;
        border-left: 8px var(--subscription-color) solid;
    }

    .requisition-side-bar-hover {
        color: white;
        border-left: 8px var(--requisition-color) solid;
    }

    .publisher-side-bar-hover {
        color: white;
        border-left: 8px var(--publisher-color) solid;
    }

    .subscription-side-bar-hover {
        color: white;
        border-left: 8px var(--subscription-color) solid;
    }

    .side-bar-item > a {
        color: var(--index-color);
        /*height: inherit;*/
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    .tag {
        font-size: 0.6em;
        text-transform: uppercase;
        font-weight: bold;
    }

</style>
