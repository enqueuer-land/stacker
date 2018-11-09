<template>
    <div>
        <div class="stage-requisition-header stacker-header container-fluid">
            <div class="row">
                <div :class="['requisition-color', 'pl-2 pt-1']" style="font-size: 0.8em">
                    Name
                </div>
            </div>
            <div class="row">
                <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                    <input v-model="getCurrentSelected().name" type="text" class="form-control" style="background-color: transparent; color: white"
                           placeholder="Name">
                    <div class="input-group-append">
                        <button class="btn"
                                style="border: 1px var(--requisition-color) solid; color: var(--requisition-color); background-color: transparent"
                                @click="runButtonClick"
                                type="button">Run
                        </button>
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
                    <li class="nav-item" v-for="(tab, index) in $store.state.requisition.tabs" :key="index">
                        <a :class="['requisition-color',
                                    'nav-link pb-1',
                                    tabSelectedIndex === index ? 'tab-selected' : '',
                                    tabSelectedIndex === index ? 'border-requisition-color': '']"
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
    import ObjectDecycler from "../../tests/object-decycler";

    export default {
        name: 'StageRequisitionHeader',
        mounted: function() {
            this.tabSelected(this.$store.state.requisition.tabs[0], 0);
        },
        data: function () {
            return {
                id: this.getCurrentSelected().id,
                tabSelectedIndex: 0,
            }
        },
        methods: {
            runButtonClick: function() {
                console.log('Requisition to be ran: ' + JSON.stringify(new ObjectDecycler().decycle(this.getCurrentSelected())));
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
                this.tabSelectedIndex = index;
                console.log('Req tab selected: ' + '/requisition/' + this.getCurrentSelected().id + '/' + tab.path);
                this.$router.push({path: '/requisition/' + this.getCurrentSelected().id + '/' + tab.path});
            }
        },
        watch: {
            '$route': function() {
                let id = this.$route.path.split("/")[2];
                console.log('Id: ' + id);
                if (id !== this.id) {
                    console.log('Different: ' + id);
                    this.id = id;
                    this.tabSelected(this.$store.state.requisition.tabs[0], 0);
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

    .border-requisition-color {
        border-left: 8px var(--requisition-color) solid;
    }

</style>
