<template>
    <div>
        <div class="stacker-header container-fluid">
            <div class="row" style="min-height: 30px">
                <ol class="breadcrumb my-0 py-0 pl-1" style="background-color: transparent;">
                    <li :class="['breadcrumb-item', index === getBreadCrumbs.length - 1 ? 'active' : '']"
                        v-for="(breadCrumb, index) in getBreadCrumbs" :key="index">
                        <a href="#"
                           @click="$store.dispatch('runRequisition', breadCrumb)"
                           :style="breadcrumbStyle">
                            <i style="transform: scale(0.75); position: relative; top: calc(50% - 7px); color: var(--requisition-color)"
                               class="material-icons">play_circle_filled</i>
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
                    <input v-model="item.name" type="text" class="form-control"
                           style="background-color: transparent; border-color: var(--stacker-background-alternative-color); color: var(--text-color)"
                           placeholder="Name">
                    <div v-if="!isRequisition()" class="input-group-append stage-header-main-dropdown">
                        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown"
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
                        <button class="btn pl-4 pr-4"
                                id="runButton"
                                style="border: 1px var(--requisition-color) solid; background-color: var(--requisition-color); color: var(--stacker-header-background-color)"
                                @click="runButtonClick"
                                type="button">RUN
                        </button>
                    </div>
                </div>
            </div>
            <!--<div class="">-->
                <stage-events :item="item"
                              :color="'var(--' + item.component + '-color)'"
                              :events="[{label: 'On Initialization', name: 'onInit'},
                                                                        {label: 'On MessageReceived', name: 'onMessageReceived'},
                                                                        {label: 'On Finish', name: 'onFinish'},]" ></stage-events>
            <!--</div>-->
        </div>
        <router-view @input="stageBodyChanged" class="pt-2"/>
    </div>
</template>

<script>
    import StageEvents from "./StageEvents";
    export default {
        name: 'StageHeader',
        components: {StageEvents},
        props: ['item', 'id'],
        mounted: function () {
            console.log('Mounted: ' + this.item.component + '/' + this.item.id);
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
                // tabSelectedIndex: 0,
                // tabs: this.refreshAvailableTabs(firstProtocol),
                selectedProtocol: firstProtocol
            }
        },
        methods: {
            stageBodyChanged({attribute, payload, errors}) {
                const itemId = this.item.component + '_' + this.selectedProtocol;
                const item = $('#' + itemId);
                if (errors) {
                    item.addClass('invalid-input');
                } else {
                    item.removeClass('invalid-input');
                }

                if (attribute) {
                    this.item[attribute] = payload;
                } else {
                    this.item = Object.assign(this.item, payload, {validation: errors});
                }
            },
            runButtonClick: async function () {
                await this.$store.dispatch('runRequisition', this.item);
            },
            // refreshAvailableTabs: function (protocol) {
            //     let config = this.$store.state[this.item.component];
            //     let regularTabs = config.tabs.concat([]);
            //     if (this.isRequisition()) {
            //         return regularTabs;
            //     }
            //     const protocolTab = {name: protocol.toUpperCase(), path: protocol};
            //     if (this.isPublisher()) {
            //         if (this.$store.state[this.item.component].protocols[protocol].sync) {
            //             regularTabs.push(this.$store.state[this.item.component].syncTab);
            //         }
            //     }
            //     return [protocolTab].concat(regularTabs);
            // },
            selectProtocol: function (protocol) {
                this.selectedProtocol = protocol;
                this.item.type = protocol;
                if (this.isRequisition()) {
                    console.log('Going to: ' + '/' + this.item.component + '/' + this.item.id + '/general');
                    this.$router.push({
                        path: '/' + this.item.component + '/' + this.item.id + '/general',
                        props: {
                            item: this.item
                        }
                    });
                }
                else {
                    console.log('Going to: ' + '/' + this.item.component + '/' + this.item.id + '/' + this.selectedProtocol);
                    this.$router.push({
                        path: '/' + this.item.component + '/' + this.item.id + '/' + this.selectedProtocol,
                        props: {
                            item: this.item
                        }
                    });
                }
            },
            breadCrumbSelected: function (breadCrumb) {
                this.$store.commit('selectItem', {item: breadCrumb, router: this.$router, route: this.$route});
            },
            // tabSelected: function (tab, index) {
            //     this.tabSelectedIndex = index;
            //     console.log('going to: ' + '/' + this.item.component + '/' + this.item.id + '/' + tab.path);
            //     this.$router.push({
            //         path: '/' + this.item.component + '/' + this.item.id + '/' + tab.path,
            //         props: {
            //             item: this.item,
            //             eventName: tab.path
            //         }
            //     });
            // },
            isRequisition() {
                return this.item.component.toUpperCase().startsWith("REQ");
            },
            isPublisher() {
                return this.item.component.toUpperCase().startsWith("PUB");
            },
            getContent() {
                if (this.isRequisition()) {
                    this.$router.push({
                        path: '/' + this.item.component + '/' + this.item.id + '/general',
                        props: {
                            item: this.item
                        }
                    });
                }
                else {
                    console.log('Item protocol: ' + this.item.type);
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
                console.log('Item changed');
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
            }
        }
    }
</script>

<style scoped>

    .breadcrumb-item::before {
        content: '›';
        padding-right: 3px;
    }

    .breadcrumb-item a:hover {
        color: var(--text-color);
    }

    .breadcrumb-item a:focus {
        color: var(--text-color);
    }

    .breadcrumb-item:nth-child(1)::before {
        display: none;
    }

</style>
