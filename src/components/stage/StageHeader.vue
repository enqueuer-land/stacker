<template>
    <div>
        <div class="stage-header stacker-header container-fluid">
            <div class="row">
                <div :class="[colorClass, 'pl-2 pt-1']" style="font-size: 0.8em">
                    Name
                </div>
            </div>
            <div class="row">
                <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                    <input v-model="getCurrentSelected().name" type="text" class="form-control" style="background-color: transparent; color: white"
                           placeholder="Name">
                    <div class="input-group-append">
                        <button v-if="isRequisition()" class="btn"
                                style="border: 1px var(--requisition-color) solid; color: var(--requisition-color); background-color: transparent"
                                type="button">Run
                        </button>
                        <button v-if="isPublisher()" class="btn dropdown-toggle" type="button" data-toggle="dropdown"
                                style="border: 1px var(--publisher-color) solid; color: var(--publisher-color); background-color: transparent">HTTP</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">AMQP</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <ol class="breadcrumb mb-0 pl-0" style="background-color: transparent">
                    <li :class="['breadcrumb-item', index === getBreadCrumbs().length - 1 ? 'active' : '']"
                        v-for="(breadCrumb, index) in getBreadCrumbs()" :key="index">
                        <a class="requisition-color" style="text-decoration: none; font-size: 0.8em" href="#">{{breadCrumb.name}}</a>
                    </li>
                </ol>
            </div>
            <div class="row pt-2">
                <ul class="nav" id="tabs" role="tablist">
                    <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                        <a :class="[colorClass,
                                    'nav-link pb-1',
                                    tabSelectedIndex === index ? 'tab-selected' : '',
                                    tabSelectedIndex === index && isRequisition() ? 'border-requisition-color': '',
                                    tabSelectedIndex === index && isPublisher()   ? 'border-publisher-color': '']"
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
        name: 'StageHeader',
        data: function () {
            return {
                tabSelectedIndex: 0,
                tabs: [{
                    name: "General",
                    path: 'general'
                }, {
                    name: "onInit",
                    path: 'onInit'
                }, {
                    name: "onFinish",
                    path: 'onFinish'
                }]
            }
        },
        methods: {
            getCurrentSelected: function() {
                return this.$store.state.sideBarSelectedItem;
            },
            isRequisition: function() {
                return this.getCurrentSelected().component.toUpperCase().startsWith('REQ');
             },
            isPublisher: function() {
                return this.getCurrentSelected().component.toUpperCase().startsWith('PUB');
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
            tabSelected: function (tab, index) {
                this.tabSelectedIndex = index;
                console.log(JSON.stringify(tab));
                this.$router.replace({path: this.$store.state.sideBarSelectedItem.component + '/' + tab.path});
            }
        },
        computed: {
            colorClass: function () {
                return {
                    'requisition-color': this.isRequisition(),
                    'publisher-color': this.isPublisher()
                }
            }
        }
    }
</script>

<style scoped>
    .stage-header {

    }

    #tabs {
    }

    .breadcrumb-item::before {
        /*display: none !important;*/
        content: '›';
    }

    .breadcrumb-item a:hover {
        /*display: none !important;*/
        color: white;
    }

    #tabs a:hover {
        color: white;
    }

    .tab-selected {
        color: white;
        background-color: var(--stacker-background-color);
    }

    .border-requisition-color {
        border-left: 8px var(--requisition-color) solid;
    }

    .border-publisher-color {
        border-left: 8px var(--publisher-color) solid;
    }

    .dropdown-toggle::after {
        /*display: none !important;*/
    }


</style>
