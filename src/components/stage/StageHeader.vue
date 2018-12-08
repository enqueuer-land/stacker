<template>
    <div>
        <div class="stacker-header container-fluid">
            <div class="row scroll-div" style="height: 30px">
                <ol class="breadcrumb my-0 pb-0 pt-1 pl-1" style="background-color: transparent;">
                    <li :class="['breadcrumb-item', index === getBreadCrumbs.length - 1 ? 'active' : '']"
                        v-for="(breadCrumb, index) in getBreadCrumbs" :key="index">
                        <a style="cursor: pointer;"
                           @click="runClick(breadCrumb)">
                            <i :style="breadcrumbIconStyle(breadCrumb)" class="material-icons">play_circle_outline</i>
                        </a>
                        <a :style="breadcrumbStyle" href="#"
                           @click="breadCrumbSelected(breadCrumb)">
                            {{breadCrumb.name}}
                        </a>
                    </li>
                </ol>
            </div>

            <div class="row pt-2">
                <div class="pl-2 p1-2" :style="nameStyle">
                    Name
                </div>
            </div>
            <div class="row pt-1">
                <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                    <input v-model="item.name" type="text" class="form-control stacker-input"
                           placeholder="Name">
                    <div v-if="!isRequisition()" class="input-group-append stage-header-main-dropdown">
                        <button class="btn dropdown-toggle select-protocol-button" type="button" data-toggle="dropdown"
                                :style="protocolsListStyle">
                            {{selectedProtocol}}
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#"
                               v-for="protocol in Object.keys($store.state[item.component].protocols)"
                               :key="protocol" style="text-transform: uppercase"
                               @click="selectProtocol(protocol)"
                            >{{protocol}}</a>
                        </div>
                    </div>
                    <div v-else class="input-group-append stage-header-main-dropdown">
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

    export default {
        name: 'StageHeader',
        components: {StageEvents},
        props: ['item', 'id'],
        mounted: function () {
            if (this.isRequisition()) {
                this.$router.push({
                    path: '/' + this.item.component + '/' + this.item.id + '/general',
                    props: {
                        item: this.item
                    }
                });
            }
            else {
                const firstProtocol = Object.keys(this.$store.state[this.item.component].protocols).filter((key, index) => index === 0)[0];
                this.$router.push({
                    path: '/' + this.item.component + '/' + this.item.id + '/' + firstProtocol,
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
                const firstProtocol = Object.keys(this.$store.state[this.item.component].protocols).filter((key, index) => index === 0)[0];
                this.$router.push({
                    path: '/' + this.item.component + '/' + this.item.id + '/' + firstProtocol,
                    props: {
                        item: this.item
                    }
                });
            }
            return {
                events: this.getEvents(),
                selectedProtocol: firstProtocol
            }
        },
        methods: {
            stageBodyChanged(payload) {
                const valid = payload.errors === undefined || payload.errors.length === 0;
                if (valid) {
                    this.item.errors = [];
                }
                this.item = Object.assign(this.item, payload);
                new ComponentManager().propagateValidationToParents(this.item, valid);
            },
            runClick: function (item) {
                if (new ComponentManager().isComponentValid(item)) {
                    this.$store.dispatch('runRequisition', item);
                }
            },
            getEvents() {
                let storeComponent = this.$store.state[this.item.component];
                let protocol = undefined;
                if (storeComponent.protocols) {
                    protocol = storeComponent.protocols[this.item.type.toLowerCase()];
                    if (!protocol) {
                        protocol = Object.keys(storeComponent.protocols)[0];
                    }
                }
                return storeComponent.getEvents(protocol).concat([]);
            },
            selectProtocol: function (protocol) {
                this.selectedProtocol = protocol;
                this.item.type = protocol;
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
                    this.selectedProtocol = this.item.type;
                    if (!this.selectedProtocol) {
                        const firstProtocol = Object.keys(this.$store.state[this.item.component].protocols).filter((key, index) => index === 0)[0];
                        this.selectedProtocol = firstProtocol;
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
                console.log('Id changed');
                this.getContent();
            }
        },
        computed: {
            nameStyle() {
                return {
                    'font-size': '0.8em',
                    'color': 'var(--' + this.item.component + '-color)'
                }
            },
            runButtonClass() {
                return {
                    'btn pl-4 pr-4': true,
                    disabled: !new ComponentManager().isComponentValid(this.item)
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
                    'color': 'var(--' + this.item.component + '-color)'
                }
            },
            breadcrumbIconStyle() {
                return function (item) {
                    const style = {
                        'transform': 'scale(1.5)',
                        'position': 'relative',
                        'top': 'calc(50% - 10px)',
                        padding: '0 3px',
                        color: 'var(--requisition-color)',
                        'text-decoration': 'none',
                        'font-size': '0.8em',
                        cursor: 'pointer',
                    };
                    if (!new ComponentManager().isComponentValid(item)) {
                        style.color = 'var(--text-smooth-color)';
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
        content: '›';
        padding-right: 3px;
        color: var(--text-color);
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
        box-shadow: 0 0 15px var(--text-color);
    }

</style>
