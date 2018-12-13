<template>
    <div :style="sideBarItemStyle">
        <div class="row no-gutters"
             style="height: 100%"
             :id="item.id + 'SideBarItem'"
             @mouseenter="mouseEnterHeader"
             @click="itemSelected"
             @mouseover="mouseIsOver = true"
             @mouseleave="mouseIsOver = false">
            <div class="col-1 align-self-center">
                <div v-show="mouseIsOver" class="dropdown">
                    <div data-toggle="dropdown">
                        <stacker-icon name="more_vert"></stacker-icon>
                    </div>
                    <dropdown-component :value="actions"
                                        :args="{commit: $store.commit, item: item, router: $router, store: $store}"></dropdown-component>
                </div>
            </div>
            <div class="align-self-center col-md-auto tag" :style="typeStyle">
                <div v-if="isRequisition" class="dropdown">
                    <stacker-icon
                            class="pl-0 pr-2"
                            disabled-color="var(--requisition-color)"
                            color="var(--requisition-color)"
                            :name="opened? 'folder_open' : 'folder'">
                    </stacker-icon>
                </div>
                <div v-show="!isRequisition" class="pr-3" style="font-weight: bold">
                    {{item.type}}
                </div>
            </div>
            <div id="name" :class="['col align-self-center pr-2', nameClass]" :style="nameStyle">
                {{item.name}}
            </div>
            <div class="align-self-center tag pr-2" :style="tagStyle">
                {{tag}} #{{index}}
            </div>
        </div>

    </div>
</template>

<script>
    import DropdownComponent from "../inputs/DropdownComponent";
    import ComponentManager from "../../tests/component-manager";
    import StackerIcon from "../inputs/StackerIcon";

    export default {
        name: 'SideBarItem',
        components: {StackerIcon, DropdownComponent},
        props: {
            opened: {},
            index: {},
            item: {},
        },
        mounted() {
            this.$store.state.eventEmitter.on('ignoreComponent', (payload) => {
                ++this.forceRecomputeCounter;
            });
        },
        data() {
            const tag = this.item.component.substr(0, 3);
            const isRequisition = tag.toUpperCase().startsWith('REQ');
            const actions = this.$store.state[this.item.component].sideBarOptions;
            return {
                forceRecomputeCounter: 0,
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
        computed: {
            childrenIcon() {
                const childrenNum = this.item.requisitions.length + this.item.subscriptions.length + this.item.publishers.length;
                if (childrenNum > 9) {
                    return "filter_9_plus";
                }
                if (childrenNum === 0) {
                    return "filter_none"
                }
                return `filter_${childrenNum}`
            },
            sideBarItemStyle() {
                this.forceRecomputeCounter;
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
                if (this.mouseIsOver) {
                    style['background-color'] = 'var(--stacker-background-color)';
                    style['border-left'] = '4px var(--' + this.item.component + '-color) solid';
                }
                if (this.isRequisition && this.opened) {
                    style['border-left'] = '2px var(--enqueuer-color) solid';
                    style['background-color'] = 'var(--stacker-background-color)';
                }
                if (this.isSelected()) {
                    style['color'] = 'var(--text-color)';
                    style['background-color'] = 'var(--stacker-background-alternative-color)';
                    style['border-left'] = '2px var(--enqueuer-color) solid';
                }
                if (new ComponentManager().isItemIgnored(this.item)) {
                    style['background-color'] = 'var(--stacker-header-background-color)';
                    style['text-decoration'] = 'line-through var(--' + this.item.component + '-color) double';
                }

                if (selectedItem && selectedItem.id !== this.item.id) {
                    // style['border-right'] = '2px var(--' + selectedItem.component + '-color) solid';
                }
                return style;
            },
            nameStyle() {
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

</style>
