<template>
    <b-container fluid id="side-bar-tree" class="p-0 m-0" style="height: 100%">
        <draggable  style="height: 100%" group="component">
            <draggable :value="filteredRequisitions" group="component"
                       v-for="requisition in filteredRequisitions" :key="requisition.id"
                       :id="requisition.id"
                       @end="drag => reorderComponent({drag, component: requisition})">
                <SideBarTreeNode :component="requisition"></SideBarTreeNode>
            </draggable>
        </draggable>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/component-tree.css';
    import draggable from 'vuedraggable';
    import {mapGetters, mapMutations} from 'vuex';
    import SideBarTreeNode from '@/views/side-bar/side-bar-tree-node';

    export default Vue.extend({
        name: 'SideBarTree',
        components: {SideBarTreeNode, draggable},
        methods: {
            ...mapMutations('side-bar', ['createNewComponent', 'reorderComponent'])
        },
        computed: {
            ...mapGetters('side-bar', ['filteredRequisitions'])
        }
    });
</script>
<style type="text/css" scoped>
    #side-bar-tree {
    }

</style>
