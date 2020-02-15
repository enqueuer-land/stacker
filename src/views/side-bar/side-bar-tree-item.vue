<template>
    <div id="side-bar-tree-item">
        <b-container fluid class="px-1 carabina-text" style="height: 100%">
            <b-row style="width: 100%; height: 100%" no-gutters class="m-0 pl-1 tree-item">
                <b-col cols="1" class="align-self-center mx-1">
                    <span v-if="componentStylish.shouldPrintType()" class="component-name-tag px-1" :style="componentNameTagStyle">{{componentStylish.getType()}}</span>
                    <div v-else class="px-1 requisition-type">
<!--                        <i class="fas fa-check-circle"></i>-->
                        <i class="fas fa-folder"></i>
<!--                        {{component.requisitions && component.requisitions.length || 0}}-->
                    </div>
                </b-col>
                <b-col cols class="align-self-center pl-3">
                    {{component.name}}
                </b-col>
                <b-col cols="auto" class="align-self-center">
                    <span class="component-name-tag px-2" :style="componentNameTagStyle">{{componentNameTag}}</span>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import '@/styles/tree.css';
    import Vue from 'vue';
    import {mapMutations, mapGetters} from 'vuex';
    import {ComponentStylish} from "@/components/component-stylish";

    export default Vue.extend({
        name: 'SideBarTreeItem',
        props: {
            component: Object
        },
        data: function () {
            return {
                componentStylish: new ComponentStylish(this.component)
            }
        },
        computed: {
            ...mapGetters('side-bar', []),
            componentNameTag: function () {
                return this.componentStylish.getComponentTag();
            },
            componentNameTagStyle: function () {
                return this.componentStylish.componentNameTagStyle();
            }
        },
        methods: {
            ...mapMutations('side-bar', [])
        }

    });
</script>
<style type="text/css" scoped>
    #side-bar-tree-item {
        height: 100%;
    }

    .requisition-type {
        text-align: center;
        color: var(--carabina-requisition-color);
    }
</style>
