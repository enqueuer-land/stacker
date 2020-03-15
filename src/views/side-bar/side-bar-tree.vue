<template>
    <b-container fluid id="side-bar-tree" class="p-0 m-0">
        <draggable :value="filteredRequisitions" group="component" @end="reorderSameLevelRequisition">
            <div v-for="requisition in filteredRequisitions" :key="requisition.id">
                <SideBarTreeNode :component="requisition"></SideBarTreeNode>
            </div>
        </draggable>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import draggable from 'vuedraggable';
    import '@/styles/component-tree.css';
    import {mapGetters, mapMutations} from 'vuex';
    import SideBarTreeNode from '@/views/side-bar/side-bar-tree-node';

    export default Vue.extend({
        name: 'SideBarTree',
        components: {SideBarTreeNode, draggable},
        methods: {
            ...mapMutations('side-bar', ['createNewComponent', 'reorderSameLevelRequisition'])
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
