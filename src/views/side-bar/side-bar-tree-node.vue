<template>
    <div id="side-bar-tree-node" class="tree-node">
        <b-card no-body class="accordion-container">
            <b-button block v-b-toggle="component.id" class="accordion-button">
                <SideBarTreeItem :component="component" :collapsed="collapsed"/>
            </b-button>
            <b-collapse :id="component.id" class="pl-4 py-0 px-0"
                        v-if="componentStylish.getChildrenLength() > 0">
                <div>
                    <SideBarTreeNode v-for="requisition in component.requisitions" :key="requisition.id"
                                     :component="requisition"></SideBarTreeNode>
                    <SideBarTreeItem v-for="publisher in component.publishers" :key="publisher.id"
                                     :component="publisher"></SideBarTreeItem>
                    <SideBarTreeItem v-for="subscription in component.subscriptions" :key="subscription.id"
                                     :component="subscription"></SideBarTreeItem>
                    <div class="bottom-line"></div>
                </div>
            </b-collapse>
        </b-card>
    </div>
</template>
<script>
    import '@/styles/component-tree.css';
    import Vue from 'vue';
    import SideBarTreeItem from '@/views/side-bar/side-bar-tree-item';
    import {mapGetters} from 'vuex';
    import {ComponentStylish} from "@/components/component-stylish";

    export default Vue.extend({
        name: 'SideBarTreeNode',
        components: {SideBarTreeItem},
        props: {
            component: Object
        },
        data: function () {
            return {
                componentStylish: new ComponentStylish(this.component),
                collapsed: true,
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

    .bottom-line {
        position: relative;
        left: 10%;
        width: 80%;
        border-bottom: 1px solid var(--carabina-header-background-lighter-color);
    }

    .accordion-container {
        border-radius: 0;
        background-color: transparent;
    }

    .accordion-button {
        padding: 0;
        margin: 0;
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
    }

</style>
