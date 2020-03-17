<template>
    <div id="side-bar-tree-node" class="tree-node">
        <b-card no-body class="accordion-container" style="border: none">
            <b-button v-if="componentStylish.getChildrenLength() > 0" @click="collapsed = !collapsed"
                      :class="['accordion-button requisition-tree-indicator', !collapsed && 'expanded']">
                <i class="fas fa-caret-right"></i>
            </b-button>
            <SideBarTreeItem :component="component" @dblclick.native="collapsed = !collapsed"/>
            <b-collapse :id="'collapsible' + component.id" :class="['ml-4 py-0 px-0']" :visible="!collapsed"
                        class="collapse-body"
                        v-if="componentStylish.getChildrenLength() > 0 && !collapsed">
                <draggable :value="component.requisitions" group="component"
                           v-for="requisition in component.requisitions" :key="requisition.id"
                           :id="requisition.id"
                           @end="drag => componentDragAndDrop({drag, component: requisition})">
                    <SideBarTreeNode :component="requisition"></SideBarTreeNode>
                </draggable>
                <draggable :value="component.publishers" group="component"
                           v-for="publisher in component.publishers" :key="publisher.id"
                           :id="publisher.id"
                           @end="drag => componentDragAndDrop({drag, component: publisher})">
                    <SideBarTreeItem :component="publisher"></SideBarTreeItem>
                </draggable>
                <draggable :value="component.subscriptions" group="component"
                           v-for="subscription in component.subscriptions" :key="subscription.id"
                           :id="subscription.id"
                           @end="drag => componentDragAndDrop({drag, component: subscription})">
                    <SideBarTreeItem :component="subscription"></SideBarTreeItem>
                </draggable>
            </b-collapse>
        </b-card>
    </div>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/dimensions.css';
    import {mapMutations} from 'vuex';
    import '@/styles/component-tree.css';
    import draggable from 'vuedraggable';
    import {ComponentStylish} from '@/components/component-stylish';
    import SideBarTreeItem from '@/views/side-bar/side-bar-tree-item';

    export default Vue.extend({
        name: 'SideBarTreeNode',
        components: {
            SideBarTreeItem, draggable
        },
        props: {
            component: Object
        },
        data: function () {
            return {
                componentStylish: new ComponentStylish(this.component),
                collapsed: this.component.carabinaMeta.collapsed
            }
        },
        watch: {
            collapsed() {
                const carabinaMeta = {...this.component.carabinaMeta};
                carabinaMeta.collapsed = this.collapsed;
                this.changeAttributeOfComponent({
                    component: this.component,
                    attributeName: 'carabinaMeta',
                    value: carabinaMeta
                });
            }
        },
        methods: {
            ...mapMutations('side-bar', ['changeAttributeOfComponent', 'componentDragAndDrop']),
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
        left: 20px;
        padding: 0;
        margin: 0;
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
    }

    .requisition-tree-indicator {
        position: absolute;
        top: 15px;
        left: 22px;
        font-size: 15px;
        text-align: center;
        color: var(--carabina-requisition-color);
        filter: brightness(0.85);
        transform: rotate(0deg) scale(1);
        transition: all ease 250ms;
    }

    .requisition-tree-indicator:hover {
        transform: rotate(45deg) scale(1);
        filter: brightness(1);
    }

    .expanded {
        transform: rotate(90deg) scale(1.05);
        filter: brightness(1.15);
    }

    .collapse-body {
        border-left: 1px solid var(--carabina-body-background-color);
    }

</style>
