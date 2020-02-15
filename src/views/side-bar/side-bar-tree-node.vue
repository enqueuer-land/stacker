<template>
    <div id="side-bar-tree-node">
        <div v-for="requisition in filteredRequisitions" :key="requisition.id" class="tree-node">
            <SideBarTreeItem :component="requisition">
            </SideBarTreeItem>
        </div>
    </div>
</template>
<script>
    import '@/styles/tree.css';
    import Vue from 'vue';
    import SideBarTreeItem from '@/views/side-bar/side-bar-tree-item';
    import {mapGetters} from 'vuex';

    export default Vue.extend({
        name: 'SideBarTreeNode',
        components: {SideBarTreeItem},
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters('side-bar', ['filteredRequisitions'])
        }
    });
</script>
<style type="text/css" scoped>
    #side-bar-tree-node {
    }

</style>
