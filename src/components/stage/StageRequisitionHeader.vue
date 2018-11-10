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
                    <input v-model="getCurrentSelected().name" type="text" class="form-control"
                           style="background-color: transparent; color: white"
                           placeholder="Name">
                    <div class="input-group-append">
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
                        <a class="requisition-color" style="text-decoration: none;" href="#"
                           @click="$store.dispatch('runRequisition', breadCrumb)">
                            <i style="transform: scale(0.75); position: relative; top: calc(50% - 6px);"
                               class="material-icons">play_circle_outline</i>
                        </a>
                        <a class="requisition-color" style="text-decoration: none; font-size: 0.8em" href="#"
                           @click="breadCrumbSelected(breadCrumb)">
                            {{breadCrumb.name}}
                        </a>
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
    export default {
        name: 'StageRequisitionHeader',
        mounted: function () {
            this.tabSelected(this.$store.state.requisition.tabs[0], 0);
        },
        data: function () {
            return {
                id: this.getCurrentSelected().id,
                tabSelectedIndex: 0,
            }
        },
        methods: {
            runButtonClick: async function () {
                await this.$store.dispatch('runRequisition', this.getCurrentSelected());
            },
            getCurrentSelected: function () {
                return this.$store.state.selectedItem;
            },
            breadCrumbSelected: function (breadCrumb) {
                this.$store.commit('selectItem', {item: breadCrumb, router: this.$router, route: this.$route});
            },
            tabSelected: function (tab, index) {
                this.tabSelectedIndex = index;
                this.$router.push({path: '/requisition/' + this.getCurrentSelected().id + '/' + tab.path});
            }
        },
        watch: {
            '$route': function () {
                console.log('req detected route changed: ' + this.$route.path);
                let id = this.$route.path.split("/")[2];
                if (id !== this.id) {
                    this.id = id;
                    this.tabSelected(this.$store.state.requisition.tabs[0], 0);
                }
            }
        },
        computed: {
            getBreadCrumbs: function () {
                let breadCrumbs = [];
                let current = this.getCurrentSelected().parent;
                while (current !== undefined) {
                    breadCrumbs.unshift(current);
                    current = current.parent;
                }
                return breadCrumbs;
            },
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

    .breadcrumb-item a:focus {
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
