<template>
    <div>
        <div class="stacker-header container-fluid">
            <div class="row">
                <div class="pl-2 pt-1" :style="nameStyle">
                    Name
                </div>
            </div>
            <div class="row">
                <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                    <input v-model="item.name" type="text" class="form-control"
                           style="background-color: transparent; color: white"
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
                                style="border: 1px var(--requisition-color) solid; color: var(--requisition-color); background-color: transparent"
                                @click="runButtonClick"
                                type="button">Run
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <ol class="breadcrumb mb-0 pl-2" style="background-color: transparent; height: 48px">
                    <li :class="['breadcrumb-item', index === getBreadCrumbs.length - 1 ? 'active' : '']"
                        v-for="(breadCrumb, index) in getBreadCrumbs" :key="index">
                        <a href="#"
                           @click="$store.dispatch('runRequisition', breadCrumb)">
                            <i style="transform: scale(0.75); position: relative; top: calc(50% - 6px);"
                               class="material-icons">play_circle_outline</i>
                        </a>
                        <a style="text-decoration: none; font-size: 0.8em;" href="#"
                           @click="breadCrumbSelected(breadCrumb)">
                            {{breadCrumb.name}}
                        </a>
                    </li>
                </ol>
            </div>
            <div class="row pt-2" style="position: relative; left: -2px">
                <ul class="nav nav-fill" role="tablist" id="tab-collection">
                    <li class="nav-item" v-for="(tab, index) in tabs" :key="index" id="tab-item">
                        <a class="nav-link pb-1" :style="tabStyle(index)"
                           data-toggle="tab" role="tab"
                           @click="tabSelected(tab, index)"
                           :href="'#'">{{tab.name}}</a>
                    </li>
                </ul>
                <!--<nav class="nav nav-fill" role="tablist" id="tab-collection">-->
                        <!--<a class="nav-link pb-1 nav-item" :style="tabStyle(index)" v-for="(tab, index) in tabs" :key="index" id="tab-item"-->
                           <!--data-toggle="tab" role="tab"-->
                           <!--@click="tabSelected(tab, index)"-->
                           <!--:href="'#'">{{tab.name}}</a>-->
                <!--</nav>-->

            </div>
        </div>
        <router-view @input="stageBodyChanged"/>
    </div>
</template>

<script>
    export default {
        name: 'StageHeader',
        props: ['item', 'id'],
        mounted: function () {
            console.log('Mounted: ' + this.item.component + '/' + this.item.id);
            if (this.isRequisition()) {
                this.tabSelected(this.$store.state.requisition.tabs[0], 0);
            }
            else {
                const firstProtocol = Object.keys(this.$store.state[this.item.component].protocols).filter((key, index) => index === 0)[0];
                this.tabSelected({path: firstProtocol}, 0);
            }
        },
        data: function () {
            let firstProtocol = null;
            if (!this.isRequisition()) {
                firstProtocol = Object.keys(this.$store.state[this.item.component].protocols).filter((key, index) => index === 0)[0];
            }
            return {
                tabSelectedIndex: 0,
                tabs: this.refreshAvailableTabs(firstProtocol),
                selectedProtocol: firstProtocol
            }
        },
        methods: {
            stageBodyChanged({attribute, payload}) {
                if (attribute) {
                    this.item[attribute] = payload;
                } else {
                    this.item = Object.assign(this.item, payload);
                }
            },
            runButtonClick: async function () {
                await this.$store.dispatch('runRequisition', this.item);
            },
            refreshAvailableTabs: function (protocol) {
                let config = this.$store.state[this.item.component];
                let regularTabs = config.tabs.concat([]);
                if (this.isRequisition()) {
                    return regularTabs;
                }
                const protocolTab = {name: protocol.toUpperCase(), path: protocol};
                if (this.isPublisher()) {
                    if (this.$store.state[this.item.component].protocols[protocol].sync) {
                        regularTabs.push(this.$store.state[this.item.component].syncTab);
                    }
                }
                return [protocolTab].concat(regularTabs);
            },
            selectProtocol: function (protocol) {
                this.selectedProtocol = protocol;
                this.tabs = this.refreshAvailableTabs();
            },
            breadCrumbSelected: function (breadCrumb) {
                this.$store.commit('selectItem', {item: breadCrumb, router: this.$router, route: this.$route});
            },
            tabSelected: function (tab, index) {
                this.tabSelectedIndex = index;
                console.log('going to: ' + '/' + this.item.component + '/' + this.item.id + '/' + tab.path);
                this.$router.push({
                    path: '/' + this.item.component + '/' + this.item.id + '/' + tab.path,
                    props: {
                        item: this.item,
                        eventName: tab.path
                    }
                });
            },
            isRequisition() {
                return this.item.component.toUpperCase().startsWith("REQ");
            },
            isPublisher() {
                return this.item.component.toUpperCase().startsWith("PUB");
            },
            getContent() {
                if (this.isRequisition()) {
                    this.tabs = this.refreshAvailableTabs();
                    this.tabSelected(this.$store.state.requisition.tabs[0], 0);
                }
                else {
                    const firstProtocol = Object.keys(this.$store.state[this.item.component].protocols).filter((key, index) => index === 0)[0];
                    this.selectedProtocol = firstProtocol;
                    this.tabs = this.refreshAvailableTabs(firstProtocol);
                    this.tabSelected({path: firstProtocol}, 0);
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
            tabStyle() {
                return function (index) {
                    if (this.tabSelectedIndex === index) {
                        return {
                            'color': 'white',
                            'background-color': 'var(--stacker-background-color)',
                            'border-left': '3px ' + 'var(--' + this.item.component + '-color)' + ' solid',
                        };
                    }
                    return {
                        'color': 'var(--' + this.item.component + '-color)',
                        'border-bottom': '1px ' + 'var(--stacker-background-alternative-color)' + ' solid'
                    }
                };
            }
        }
    }
</script>

<style scoped>

    .breadcrumb-item::before {
        content: '›';
    }

    .breadcrumb-item a {
        color: var(--requisition-color);
        text-decoration: none;
    }

    .breadcrumb-item a:hover {
        color: white;
    }

    .breadcrumb-item a:focus {
        color: white;
    }

    .breadcrumb-item:nth-child(1)::before {
        display: none;
    }

    #tab-item a:hover {
        background-color: var(--stacker-background-color);
    }

    .stage-header-main-dropdown a:hover {
        color: white;
    }

</style>
