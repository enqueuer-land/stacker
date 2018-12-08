<template>
    <div :style="sideBarItemStyle">
        <a class="row no-gutters mainSideBarItem'"
           :id="item.id + 'SideBarItem'"
           style="height: 100%"
           @mouseenter="mouseEnterHeader"
           @click="itemSelected"
           @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false">
            <div class="col-1 align-self-center">
                <div v-show="mouseIsOver" class="dropdown">
                    <div data-toggle="dropdown" id="more-icon">
                        <i class="material-icons">more_vert</i>
                    </div>
                    <dropdown-component :value="actions" :args="[$store.commit, item, $router]"></dropdown-component>
                </div>
            </div>
            <div class="align-self-center col-md-auto tag" :style="typeStyle">
                <div v-if="isRequisition" class="dropdown">
                    <i v-if="!opened" style="color: var(--requisition-color)" class="material-icons">folder</i>
                    <i v-if="opened" style="color: var(--requisition-color)" class="material-icons">folder_open</i>
                    <span v-if="!opened"
                          style="position: relative; top: -6px; left: -22px; color: var(--stacker-background-color); font-weight: bold">
                        {{this.item.requisitions.length + this.item.subscriptions.length + this.item.publishers.length}}
                    </span>
                    <span v-if="opened"
                          style="position: relative; top: -6px; left: -20px; color: var(--requisition-color);">
                        {{this.item.requisitions.length + this.item.subscriptions.length + this.item.publishers.length}}
                    </span>
                </div>
                <div v-show="!isRequisition" class="pr-3" style="font-weight: bold">
                    {{item.type}}
                </div>
            </div>
            <div id="name" :class="['col align-self-center', nameClass]" :style="nameStyle">
                {{item.name}}
            </div>
            <div class="align-self-center tag pr-2" :style="tagStyle">
                {{tag}} #{{index}}
            </div>
        </a>

    </div>
</template>

<script>
    import DropdownComponent from "../inputs/DropdownComponent";
    import ComponentManager from "../../tests/component-manager";

    export default {
        name: 'SideBarItem',
        components: {DropdownComponent},
        props: {
            opened: {},
            index: {},
            item: {},
        },
        data: function () {
            const tag = this.item.component.substr(0, 3);
            const isRequisition = tag.toUpperCase().startsWith('REQ');
            const actions = this.$store.state[this.item.component].sideBarOptions;
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
                this.$emit('clicked');
                this.$store.commit('selectItem', {item: this.item, router: this.$router, route: this.$route});
            },
            isSelected: function () {
                const selectedItem = this.$store.state.selectedItem;
                return selectedItem && selectedItem.id === this.item.id;
            },
            mouseEnterHeader(event) {
                const errors = (this.item.invalidChildren || [])
                    .map(invalid => `<li><span style="color: var(--${invalid.component}-color);">${invalid.name + ': '}</span>${invalid.errors.join('; ')}</li>`)
                    .concat((this.item.errors || []).map(error => `<li>${error}</li>`))
                    .join('');

                const target = $('#' + event.target.id);
                if (errors.length > 0) {
                    target
                        .attr('data-html', true)
                        .attr('data-original-title', `<ul>${errors}</ul>`)
                        .tooltip('show');
                } else {
                    target.tooltip('hide');
                }
            }
        },
        watch: {},
        computed: {
            sideBarItemStyle: function () {
                const selectedItem = this.$store.state.selectedItem;
                let style = {
                    cursor: 'pointer',
                    height: '30px',
                    'font-size': '14px',
                    'font-weight': 'lighter',
                    'border-bottom': '1px solid var(--stacker-background-alternative-color)',
                    'background-color': 'var(--stacker-header-background-color)',
                    'color': 'var(--text-smooth-color)'
                };
                if (this.isSelected()) {
                    style['color'] = 'var(--text-color)';
                    style['background-color'] = 'var(--stacker-background-color)';
                    style['border-left'] = '2px var(--' + selectedItem.component + '-color) solid';
                    // style['border-top'] = '1px var(--' + selectedItem.component + '-color) solid';
                }
                if (this.mouseIsOver) {
                    // style['color'] = 'var(--text-color)';
                    style['background-color'] = 'var(--stacker-background-alternative-color)';
                    style['border-left'] = '4px var(--' + this.item.component + '-color) solid';
                }
                if (this.isRequisition && this.opened) {
                    style['border-left'] = '2px var(--requisition-color) solid';
                    // style['border-top'] = '1px var(--requisition-color) solid';
                }
                if (selectedItem && selectedItem.id !== this.item.id) {
                    // style['border-right'] = '2px var(--' + selectedItem.component + '-color) solid';
                }
                return style;
            },
            nameStyle() {
                // color: var(--text-color)
                let style = {
                    'white-space': 'nowrap',
                    'width': '100%',
                    'overflow': 'hidden',

                    'text-overflow': 'ellipsis',
                };
                if (this.isSelected()) {
                    style.color = 'var(--text-color)';
                }
                return style;
            },
            nameClass() {
                return {
                    'invalid-name': !new ComponentManager().isComponentValid(this.item)
                };
            },
            tagStyle: function () {
                return {
                    'color': 'var(--' + this.item.component + '-color)'
                }
            },
            typeStyle: function () {
                return {
                    'color': 'var(--' + this.item.component + '-color)',
                };
            }
        }
    }
</script>

<style scoped>

    .tag {
        text-decoration: none;
        font-size: 0.75em;
        text-transform: uppercase;
        /*font-weight: bolder;*/
    }

    #more-icon:hover {
        color: var(--text-color);
    }

</style>
