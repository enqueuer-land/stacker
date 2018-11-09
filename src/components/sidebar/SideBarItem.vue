<template>
    <div :class="sideBarItemClass">
        <a class="row no-gutters" href="#" style="text-decoration: none"
           @click="itemSelected"
           @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false"
        >
            <div class="col-1 align-self-center">
                <div v-show="mouseIsOver" class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">
                        <i class="material-icons">more_vert</i>
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="action in actions" :key="action.name"
                           @click="action.click">{{action.name}}</a>
                    </div>
                </div>
            </div>
            <div :class="typeClass">
                <div v-if="isRequisition" class="dropdown">
                    <i v-if="!opened" style="color: var(--requisition-color)" class="material-icons">folder</i>
                    <i v-if="opened" style="color: var(--requisition-color)" class="material-icons">folder_open</i>
                    <span v-if="!opened" style="position: relative; top: -6px; left: -22px; color: var(--stacker-background-color);">
                        {{this.item.requisitions.length + this.item.subscriptions.length + this.item.publishers.length}}
                    </span>
                    <span v-if="opened" style="position: relative; top: -6px; left: -22px; color: var(--requisition-color);">
                        {{this.item.requisitions.length + this.item.subscriptions.length + this.item.publishers.length}}
                    </span>
                </div>
                <div v-show="!isRequisition">
                    {{item.type}}
                </div>
            </div>
            <div id="name" :class="['col align-self-center']" :style="isSelected() ? 'color: white' : ''">
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
            opened: {},
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
                    this.$store.commit('deleteComponent', {item: this.item, router: this.$router});
                }
            });
            if (isRequisition) {
                actions.push({
                    name: "Add requisition",
                    click: () => {
                        // e.stopPropagation();
                        this.$store.commit('addRequisition', {parent: this.item, router: this.$router});
                    }
                });
                actions.push({
                    name: "Add publisher",
                    click: () => {
                        this.$store.commit('addPublisher', {parent: this.item, router: this.$router});
                    }
                });
                actions.push({
                    name: "Add subscription",
                    click: () => {
                        this.$store.commit('addSubscription', {parent: this.item, router: this.$router});
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
        methods: {
            itemSelected: function () {
                this.$store.commit('selectItem', {item: this.item, router: this.$router, route: this.$route});
            },
            isSelected: function () {
                return this.$store.state.selectedItem.id === this.item.id;
            },
        },
        computed: {
            sideBarItemClass: function () {
                return {
                    'side-bar-item': true,
                    'requisition-side-bar-hover': this.isRequisition && this.mouseIsOver,
                    'publisher-side-bar-hover': this.isPublisher && this.mouseIsOver,
                    'subscription-side-bar-hover': this.isSubscription && this.mouseIsOver,
                    'requisition-side-bar-opened': this.isRequisition && this.opened && !this.isSelected(),
                    'requisition-side-bar-selected': this.isRequisition && this.isSelected(),
                    'publisher-side-bar-selected': this.isPublisher && this.isSelected(),
                    'subscription-side-bar-selected': this.isSubscription && this.isSelected(),
                }
            },
            tagClass: function () {
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
            typeClass: function () {
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
        background-color: var(--stacker-header-background-color);
    }

    #name:hover {
        color: white;
    }

    .requisition-side-bar-opened {
        color: var(--index-color);
        background-color: var(--stacker-background-alternative-color);
        /*border-left: 8px var(--requisition-color) solid;*/
        border-top: 2px var(--requisition-color) solid;
        border-bottom: 2px var(--requisition-color) solid;
    }

    .requisition-side-bar-selected {
        color: white;
        border-left: 8px var(--requisition-color) solid;
        border-top: 2px var(--requisition-color) solid;
        border-bottom: 2px var(--requisition-color) solid;
        background-color: var(--stacker-background-color);
    }

    .publisher-side-bar-selected {
        color: white;
        border-left: 8px var(--publisher-color) solid;
        border-top: 2px var(--publisher-color) solid;
        border-bottom: 2px var(--publisher-color) solid;
        background-color: var(--stacker-background-color);
    }

    .subscription-side-bar-selected {
        color: white;
        border-left: 8px var(--subscription-color) solid;
        border-top: 2px var(--subscription-color) solid;
        border-bottom: 2px var(--subscription-color) solid;
        background-color: var(--stacker-background-color);
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
        font-size: 0.7em;
        text-transform: uppercase;
        font-weight: bold;
    }

</style>
