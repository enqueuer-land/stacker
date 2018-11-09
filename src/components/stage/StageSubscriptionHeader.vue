<template>
    <div>
        <div class="stage-subscription-header stacker-header container-fluid">
            <div class="row">
                <div :class="['subscription-color', 'pl-2 pt-1']" style="font-size: 0.8em">
                    Name
                </div>
            </div>
            <div class="row">
                <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                    <input v-model="getCurrentSelected().name" type="text" class="form-control" style="background-color: transparent; color: white"
                           placeholder="Name">
                    <div class="input-group-append">
                        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown"
                                style="border: 1px var(--subscription-color) solid; color: var(--subscription-color); background-color: transparent; text-transform: uppercase">{{selectedProtocol}}</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" v-for="protocol in Object.keys($store.state.subscription.protocols)"
                               :key="protocol" style="text-transform: uppercase"
                               @click="selectProtocol(protocol)"
                            >{{protocol}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <ol class="breadcrumb mb-0 pl-2" style="background-color: transparent; height: 48px">
                    <li :class="['breadcrumb-item', index === getBreadCrumbs().length - 1 ? 'active' : '']"
                        v-for="(breadCrumb, index) in getBreadCrumbs()" :key="index">
                        <a class="requisition-color" style="text-decoration: none; font-size: 0.8em" href="#" @click="breadCrumbSelected(breadCrumb)">{{breadCrumb.name}}</a>
                    </li>
                </ol>
            </div>
            <div class="row pt-2">
                <ul class="nav" id="tabs" role="tablist">
                    <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                        <a :class="['subscription-color',
                                    'nav-link pb-1',
                                    tabSelectedIndex === index ? 'tab-selected' : '',
                                    tabSelectedIndex === index ? 'border-subscription-color': '']"
                           data-toggle="tab" role="tab"
                           @click="tabSelected(tab, index)"
                           :href="'#'">{{tab.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'StageSubscriptionHeader',
        mounted: function() {
            const firstProtocol = Object.keys(this.$store.state[this.getCurrentSelected().component].protocols).filter((key, index) => index === 0)[0];
            this.tabSelected({path: firstProtocol}, 0);
        },
        data: function () {
            const firstProtocol = Object.keys(this.$store.state[this.getCurrentSelected().component].protocols).filter((key, index) => index === 0)[0];
            return {
                tabSelectedIndex: 0,
                id: this.getCurrentSelected().id,
                tabs: this.refreshAvailableTabs(firstProtocol),
                selectedProtocol: firstProtocol,
            }
        },
        methods: {
            refreshAvailableTabs: function(protocol) {
                const protocolTab = {name: protocol.toUpperCase(), path: protocol};
                let config = this.$store.state[this.getCurrentSelected().component];
                let regularTabs = config.tabs;
                let additionalTabs = config.protocols[protocol].additionalTabs;
                if (additionalTabs) {
                    regularTabs = regularTabs.concat(additionalTabs);
                }
                return [protocolTab].concat(regularTabs);
            },
            selectProtocol: function(protocol) {
                this.selectedProtocol = protocol;
                this.tabs = this.refreshAvailableTabs(protocol);
                if (this.tabSelectedIndex === 0) {
                    this.tabSelected({path: protocol}, 0);
                }
            },
            getCurrentSelected: function() {
                return this.$store.state.selectedItem;
            },
            getBreadCrumbs: function () {
                let breadCrumbs = [{name: ''}];
                let current = this.getCurrentSelected().parent;
                while (current !== undefined) {
                    breadCrumbs.unshift(current);
                    current = current.parent;
                }
                return breadCrumbs;
            },
            breadCrumbSelected: function(breadCrumb) {
                this.$store.commit('selectItem', {item: breadCrumb, router: this.$router, route: this.$route});
            },
            tabSelected: function (tab, index) {
                console.log('tab selected ' + tab.path);
                this.tabSelectedIndex = index;
                this.$router.push({path: '/' + this.getCurrentSelected().component + '/' + this.getCurrentSelected().id + '/' + tab.path});
            }
        },
        watch: {
            '$route': function() {
                let id = this.$route.path.split("/")[2];
                if (id !== this.id) {
                    console.log('route changed ');
                    this.id = id;
                    const firstProtocol = Object.keys(this.$store.state[this.getCurrentSelected().component].protocols).filter((key, index) => index === 0)[0];
                    this.tabSelected({path: firstProtocol}, 0);
                    console.log('route: ' + firstProtocol);
                }
            }
        }
    }
</script>

<style scoped>
    .stage-subscription-header {

    }

    #tabs {
    }

    .breadcrumb-item::before {
        content: '›';
    }

    .breadcrumb-item a:hover {
        color: white;
    }

    .breadcrumb-item:nth-child(1)::before {
        display: none;
    }

    #tabs a:hover {
        color: white;
    }

    .tab-selected {
        color: white;
        background-color: var(--stacker-background-color);
    }

    .border-subscription-color {
        border-left: 8px var(--subscription-color) solid;
    }

</style>
