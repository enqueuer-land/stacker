<template>
    <div>
        <div class="stage-requisition-header stacker-header container-fluid">
            <div class="row">
                <div :class="[colorClass, 'pl-2 pt-1']" style="font-size: 0.8em">
                    Name
                </div>
            </div>
            <div class="row">
                <div class="input-group mb-1 ml-2 mr-2">
                    <input v-model="component.name" type="text" class="form-control" style="background-color: transparent; color: white"
                           placeholder="Requisition name">
                    <div class="input-group-append">
                        <button class="btn"
                                style="border: 1px var(--requisition-color) solid; color: var(--requisition-color); background-color: transparent"
                                type="button">Run
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <ol class="breadcrumb mb-0 pl-0" style="background-color: transparent">
                    <li :class="['breadcrumb-item', index === getBreadCrumbs().length - 1 ? 'active' : '']"
                        v-for="(breadCrumb, index) in getBreadCrumbs()" :key="index">
                        <a :class="[colorClass]" style="text-decoration: none; font-size: 0.8em" href="#">{{breadCrumb.name}}</a>
                    </li>
                </ol>
            </div>
            <div class="row">
                <ul class="nav" id="tabs" role="tablist">
                    <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                        <a :class="[colorClass, 'nav-link pb-1', tabSelectedIndex === index ? 'tab-selected' : '']" data-toggle="tab" role="tab"
                           @click="tabSelected(tab, index)"
                           :href="'#' + tab.name">{{tab.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'StageRequisitionHeader',
        // mounted: function() {
        //     this.tabSelected(this.tabs[0], 0);
        // },
        props: {
            component: {}
        },
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
            getBreadCrumbs: function () {
                let breadCrumbs = [{name: ''}];
                let current = this.component.parent;
                while (current !== undefined) {
                    breadCrumbs.unshift(current);
                    current = current.parent;
                }
                return breadCrumbs;
            },
            tabSelected: function(tab, index) {
                this.tabSelectedIndex = index;
                this.$router.push({
                    path: this.component.id + '/' + tab.path,
                    params: {
                        id: this.component.id,
                        component: this.component
                    }
                });


            }
        },
        computed: {
            colorClass: function () {
                return {
                    'requisition-color': true
                }
            }
        }
    }
</script>

<style scoped>
    .stage-requisition-header {

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
        /*border-left: 8px var(--requisition-color) solid;*/
    }

    .tab-selected {
        color: white;
        border-left: 8px var(--requisition-color) solid;
        background-color: var(--stacker-background-color);
    }

    .dropdown-toggle::after {
        display: none !important;
    }


</style>
