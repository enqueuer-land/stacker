<template>
    <div class="stage-header stacker-header container-fluid">
        <div class="row">
            <div :class="[colorClass, 'pl-2 pt-1']" style="font-size: 0.8em">
                Name
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <input type="text" class="form-control btn-outline-secondary" style="background-color: transparent"
                       placeholder="Requisition name">
                <div class="input-group-append">
                    <button class="btn" style="border: 1px var(--requisition-color) solid; color: var(--requisition-color); background-color: transparent" type="button">Run</button>
                </div>
            </div>
        </div>
        <div class="row">
                <ol class="breadcrumb mb-0 pl-0" style="background-color: transparent">
                    <li :class="['breadcrumb-item', index === getBreadCrumbs().length - 1 ? 'active' : '']" v-for="(breadCrumb, index) in getBreadCrumbs()" :key="index">
                        <a :class="[colorClass]" style="text-decoration: none; font-size: 0.8em" href="#">{{breadCrumb.name}}</a>
                    </li>
                </ol>
        </div>
        <div class="row">
            <ul class="nav" id="tabs">
                <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                    <a :class="[colorClass, 'nav-link pb-1', index === 0 ? 'show' : '']" href="#">{{tab}}</a>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>

    export default {
        name: 'StageHeader',
        props: {
            component: {}
        },
        data: function () {
            return {
                tabs: ["General", "onInit", "onFinish"]
            }
        },
        methods: {
            getBreadCrumbs: function() {
                let breadCrumbs = [];
                let current = this.component;
                while (current !== undefined) {
                    breadCrumbs.unshift(current);
                    current = current.parent;
                }
                return breadCrumbs;
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
    .stage-header {

    }

    #tabs {
    }

    .breadcrumb-item::before {
        /*display: none !important;*/
        content: ' › ';
    }

    .breadcrumb-item a:hover {
        /*display: none !important;*/
        color: white;
    }

    #tabs a:hover {
        color: white;
        border-left: 8px var(--requisition-color) solid;
    }

    #tabs a:focus {
        color: white;
        border-left: 8px var(--requisition-color) solid;
        background-color: var(--stacker-background-color);
    }

    .dropdown-toggle::after {
        display: none !important;
    }


</style>
