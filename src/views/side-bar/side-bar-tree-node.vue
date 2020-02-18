<template>
    <div id="side-bar-tree-node" class="tree-node">
        <b-card no-body class="accordion-container" style="border: none">
            <b-button v-if="componentStylish.getChildrenLength() > 0" v-b-toggle="component.id"
                      class="accordion-button">
                <i :class="['fas fa-caret-right requisition-tree-indicator', !collapsed && 'expanded']"></i>
            </b-button>
            <SideBarTreeItem :component="component"/>
            <b-collapse :id="component.id" :class="['pl-4 py-0 px-0']" :visible="!collapsed"
                        v-if="componentStylish.getChildrenLength() > 0">
                <div>
                    <SideBarTreeNode v-for="requisition in component.requisitions" :key="requisition.id"
                                     :component="requisition"></SideBarTreeNode>
                    <SideBarTreeItem v-for="publisher in component.publishers" :key="publisher.id"
                                     :component="publisher"></SideBarTreeItem>
                    <SideBarTreeItem v-for="subscription in component.subscriptions" :key="subscription.id"
                                     :component="subscription"></SideBarTreeItem>
                </div>
            </b-collapse>
        </b-card>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {mapGetters} from 'vuex';
    import '@/styles/dimensions.css';
    import '@/styles/component-tree.css';
    import {ComponentStylish} from '@/components/component-stylish';
    import SideBarTreeItem from '@/views/side-bar/side-bar-tree-item';

    export default Vue.extend({
        name: 'SideBarTreeNode',
        components: {SideBarTreeItem},
        props: {
            component: Object
        },
        data: function () {
            return {
                componentStylish: new ComponentStylish(this.component),
                collapsed: this.component.carabinaMeta.collapsed,
            }
        },
        mounted() {
            this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
                if (this.component.id === collapseId) {
                    this.collapsed = !isJustShown;
                }
            })
        },
        computed: {
            ...mapGetters('side-bar', []),
        }
    });
</script>
<style type="text/css" scoped>
    #side-bar-tree-node {
    }

    .accordion-container {
        border-radius: 0;
        background-color: transparent;
    }

    .accordion-button {
        position: absolute;
        top: calc(var(--carabina-tree-node-item-height) / 2 - 10px);
        /*top: 15px;*/
        left: 20px;
        padding: 0;
        margin: 0;
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
    }

    .requisition-tree-indicator {
        font-size: 20px;
        text-align: center;
        color: var(--carabina-requisition-color);
        filter: brightness(0.85);
        transform: rotate(0deg) scale(0.85);
        transition: all ease 250ms;
    }

    #side-bar-tree-node:hover .requisition-tree-indicator, .requisition-tree-indicator:hover {
        filter: brightness(1);
        transform: rotate(45deg) scale(1);
    }

    .expanded {
        transform: rotate(90deg) scale(1.15);
        filter: brightness(1.15);
    }

</style>
