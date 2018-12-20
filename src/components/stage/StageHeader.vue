<template>
    <div>
        <div class="stacker-header container-fluid">
            <div class="row scroll-div" style="height: 35px">
                <ol class="breadcrumb my-0 pb-0 pt-0 pl-1" style="background-color: transparent;">
                    <li :class="['breadcrumb-item', { 'active' : index === getBreadCrumbs.length - 1}]"
                        v-for="(breadCrumb, index) in getBreadCrumbs" :key="index">
                        <i :style="breadcrumbIconStyle(breadCrumb)"
                           @click="runClick(breadCrumb)"
                           class="material-icons stacker-icon">play_circle_outline</i>
                        <span :style="breadcrumbStyle"
                              @click="breadCrumbSelected(breadCrumb)">
                            {{breadCrumb.name}}
                        </span>
                    </li>
                </ol>
            </div>
            <div class="row pt-1">
                <div class="pl-2 p1-2" :style="nameStyle">
                    Name
                </div>
            </div>
            <div class="row pt-1">
                <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                    <!--<input v-model="item.name" type="text" class="form-control stacker-input"-->
                           <!--placeholder="Name">-->
                    <stacker-input v-model="item.name" class="form-control" placeholder="Name"></stacker-input>
                    <div v-if="!isRequisition()" class="input-group-append">
                        <button class="btn dropdown-toggle select-protocol-button" type="button" data-toggle="dropdown"
                                :style="protocolsListStyle">
                            {{selectedProtocol}}
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#"
                               v-for="(protocol, index) in $store.state[item.component].protocols"
                               :key="index" style="text-transform: uppercase"
                               @click="selectProtocol(protocol)"
                            >{{protocol.protocolName}}</a>
                        </div>
                    </div>
                    <div v-else class="input-group-append">
                        <button :class="[runButtonClass, 'run-button']"
                                style="border: 1px var(--requisition-color) solid; background-color: var(--requisition-color); color: var(--stacker-header-background-color)"
                                @click="runClick(item)"
                                type="button">RUN
                        </button>
                    </div>
                </div>
            </div>
            <stage-events :item="item"
                          :color="'var(--' + item.component + '-color)'"
                          :events="events"></stage-events>
        </div>
        <router-view @input="stageBodyChanged" class="pt-2 scroll-div" style="max-height: calc(100vh - 150px)"/>
    </div>
</template>

<script>
    import StageEvents from "./StageEvents";
    import ComponentManager from "../../tests/component-manager";
    import StackerIcon from "../inputs/StackerIcon";
    import StackerInput from "../inputs/StackerInput";

    export default {
        name: 'StageHeader',
        components: {StackerInput, StackerIcon, StageEvents},
        props: ['item', 'id'],
        mounted: function () {
            this.$store.state.eventEmitter.on('ignoreComponent', (payload) => {
                ++this.forceRecomputeCounter;
            });
            if (this.isRequisition()) {
                this.$router.push({
                    path: '/' + this.item.component + '/' + this.item.id + '/general',
                    props: {
                        item: this.item
                    }
                });
            }
            else {
                const firstProtocol = this.$store.state[this.item.component].protocols[0];
                this.$router.push({
                    path: '/' + this.item.component + '/' + this.item.id + '/' + firstProtocol.name,
                    props: {
                        item: this.item
                    }
                });
            }
        },
        data: function () {
            let firstProtocol = null;
            if (this.isRequisition()) {
                this.$router.push({
                    path: '/' + this.item.component + '/' + this.item.id + '/general',
                    props: {
                        item: this.item
                    }
                });
            }
            else {
                const firstProtocol = this.$store.state[this.item.component].protocols[0];
                this.$router.push({
                    path: '/' + this.item.component + '/' + this.item.id + '/' + firstProtocol.name,
                    props: {
                        item: this.item
                    }
                });
            }
            return {
                forceRecomputeCounter: 0,
                events: this.getEvents(),
                selectedProtocol: firstProtocol
            }
        },
        methods: {
            stageBodyChanged(payload) {
                const valid = payload.errors === undefined || payload.errors.length === 0;
                if (valid) {
                    this.item.errors = [];
                } else {
                    this.$store.state.eventEmitter.emit('statusInformation', payload.errors.join())
                }
                this.item = Object.assign(this.item, payload);
                new ComponentManager().propagateValidationToParents(this.item, valid);
            },
            runClick: async function (item) {
                if (new ComponentManager().isComponentValid(item) && !new ComponentManager().isItemIgnored(item)) {
                    await this.$store.dispatch('runRequisition', item);
                }
            },
            getEvents() {
                let storeComponent = this.$store.state[this.item.component];
                let protocol = undefined;
                if (storeComponent.protocols) {
                    protocol = storeComponent.protocols.find(protocol => protocol.name === this.item.type.toLowerCase());
                    if (!protocol) {
                        protocol = storeComponent.protocols[0];
                    }
                }
                return storeComponent.getEvents(protocol).concat([]);
            },
            selectProtocol: function (protocol) {
                this.selectedProtocol = protocol.name;
                if (this.isRequisition()) {
                    this.$router.push({
                        path: '/' + this.item.component + '/' + this.item.id + '/general',
                        props: {
                            item: this.item
                        }
                    });
                }
                else {
                    this.$router.push({
                        path: '/' + this.item.component + '/' + this.item.id + '/' + this.selectedProtocol,
                        props: {
                            item: this.item
                        }
                    });
                    this.events = this.getEvents();
                }
            },
            breadCrumbSelected: function (breadCrumb) {
                this.$store.commit('selectItem', {item: breadCrumb, router: this.$router, route: this.$route});
            },
            isRequisition() {
                return this.item.component.toUpperCase().startsWith("REQ");
            },
            isPublisher() {
                return this.item.component.toUpperCase().startsWith("PUB");
            },
            getContent() {
                this.events = this.getEvents();
                if (this.isRequisition()) {
                    this.$router.push({
                        path: '/' + this.item.component + '/' + this.item.id + '/general',
                        props: {
                            item: this.item
                        }
                    });
                }
                else {
                    this.selectedProtocol = this.item.protocolName || this.item.type;
                    if (!this.selectedProtocol) {
                        this.selectedProtocol = this.$store.state[this.item.component].protocols[0];
                    }
                    this.$router.push({
                        path: '/' + this.item.component + '/' + this.item.id + '/' + this.selectedProtocol,
                        props: {
                            item: this.item
                        }
                    });
                }
            }
        },
        watch: {
            item: function () {
            },
            id: function () {
                this.getContent();
            }
        },
        computed: {
            nameStyle() {
                return {
                    'font-size': '0.8em',
                    // 'color': 'var(--' + this.item.component + '-color)'
                    // 'color': 'var(--text-smooth-color)'
                    'color': 'var(--enqueuer-color)'
                }
            },
            runButtonClass() {
                this.forceRecomputeCounter;
                return {
                    'btn pl-4 pr-4': true,
                    disabled: !new ComponentManager().isComponentValid(this.item) || new ComponentManager().isItemIgnored(this.item)
                }
            },
            protocolsListStyle() {
                return {
                    border: '1px var(--' + this.item.component + '-color) solid',
                    color: 'var(--' + this.item.component + '-color)',
                    'background-color': 'transparent',
                    'text-transform': 'uppercase'
                }
            },
            getBreadCrumbs: function () {
                let breadCrumbs = [];
                let current = this.item.parent;
                while (current !== undefined) {
                    breadCrumbs.unshift(current);
                    current = current.parent;
                }
                return breadCrumbs;
            },
            breadcrumbStyle() {
                return {
                    'text-decoration': 'none',
                    'font-size': '0.8em',
                    // color: 'var(--' + this.item.component + '-color)',
                    color: 'var(--enqueuer-color)',
                    cursor: 'pointer',
                }
            },
            breadcrumbIconStyle() {
                this.forceRecomputeCounter;
                return function (item) {
                    const style = {
                        position: 'relative',
                        top: 'calc(50% - 8px)',
                        padding: '0 3px',
                        // color: 'var(--requisition-color)',
                        color: 'var(--enqueuer-color)',
                        cursor: 'pointer',
                    };
                    if (!new ComponentManager().isComponentValid(item) || item.ignore) {
                        style.color = 'var(--text-smooth-color) !important';
                        style.cursor = 'default';
                    }
                    return style

                }
            },
        }
    }
</script>

<style scoped>

    .breadcrumb-item::before {
        content: '̷';
        padding-right: 3px;
        top: 2px;
        position: relative;
        color: var(--text-smooth-color);
    }

    .breadcrumb-item :hover, .breadcrumb-item .hover, .breadcrumb-item :focus, .breadcrumb-item .focus {
        color: var(--text-color) !important;
    }

    .breadcrumb-item:nth-child(1)::before {
        display: none;
    }

    .run-button:focus, .run-button.focus,
    .run-button:hover, .run-button.hover,
    .select-protocol-button:focus, .select-protocol-button.focus,
    .select-protocol-button:hover, .select-protocol-button.hover {
        outline: 0;
        box-shadow: 0 0 15px var(--enqueuer-color);
    }

</style>
