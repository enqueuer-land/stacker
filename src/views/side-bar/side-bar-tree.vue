<template>
    <div id="side-bar-tree">
        <div v-for="requisition in filteredRequisitions" :key="requisition.id">
            <SideBarTreeNode :component="requisition"></SideBarTreeNode>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {mapGetters} from 'vuex';
    import '@/styles/component-tree.css';
    import SideBarTreeNode from '@/views/side-bar/side-bar-tree-node';

    export default Vue.extend({
        name: 'SideBarTree',
        components: {SideBarTreeNode},
        data: function () {
            return {}
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
