<template>
    <div :style="sideBarItemStyle">
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
                        <div v-for="action in actions" :key="action.name">
                            <a v-if="action.name !== null" class="dropdown-item" href="#" @click="action.click">{{action.name}}</a>
                            <div v-else class="dropdown-divider"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="typeClass">
                <div v-if="isRequisition" class="dropdown">
                    <i v-if="!opened" style="color: var(--requisition-color)" class="material-icons">folder</i>
                    <i v-if="opened" style="color: var(--requisition-color)" class="material-icons">folder_open</i>
                    <span v-if="!opened"
                          style="position: relative; top: -6px; left: -22px; color: var(--stacker-background-color);">
                        {{this.item.requisitions.length + this.item.subscriptions.length + this.item.publishers.length}}
                    </span>
                    <span v-if="opened"
                          style="position: relative; top: -6px; left: -22px; color: var(--requisition-color);">
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
                actions.push({
                    name: null,
                    click: () => null
                });
                actions.push({
                    name: "Save",
                    click: () => {
                    }
                });
                actions.push({
                    name: "Expand all",
                    click: () => {
                    }
                });
                actions.push({
                    name: null,
                    click: () => null
                });
            }
            actions.push({
                name: "Delete",
                click: () => {
                    this.$store.commit('deleteComponent', {item: this.item, router: this.$router});
                }
            });
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
            sideBarItemStyle: function () {
                const selectedItem = this.$store.state.selectedItem;
                let style = {
                    // 'border-bottom': '1px solid var(--stacker-background-alternative-color)',
                    'background-color': 'var(--stacker-header-background-color)'
                };
                if (this.mouseIsOver) {
                    style.color = 'white';
                    style['border-left'] = '6px var(--' + selectedItem.component + '-color) solid';
                    if (this.isRequisition && !this.isSelected()) {
                        style.color = 'var(--index-color)';
                    }
                }
                if (this.isSelected()) {
                    style = {
                        ...style,
                        color: 'white',
                        'background-color': 'var(--stacker-background-color)',
                        'border-left': '6px var(--' + selectedItem.component + '-color) solid',
                        'border-top': '2px var(--' + selectedItem.component + '-color) solid',
                        'border-bottom': '2px var(--' + selectedItem.component + '-color) solid',
                    }
                }
                if (selectedItem.id !== this.item.id) {
                    style['border-right'] = '3px var(--' + selectedItem.component + '-color) solid';
                }
                return style;
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

    #name:hover {
        color: white;
    }

    a {
        color: var(--index-color);
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
