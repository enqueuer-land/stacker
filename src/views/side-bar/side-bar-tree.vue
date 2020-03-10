<template>
    <b-container fluid id="side-bar-tree" class="p-0 m-0">
        <div v-for="requisition in filteredRequisitions" :key="requisition.id">
            <SideBarTreeNode :component="requisition"></SideBarTreeNode>
        </div>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/component-tree.css';
    import {mapGetters, mapMutations} from 'vuex';
    import SideBarTreeNode from '@/views/side-bar/side-bar-tree-node';

    export default Vue.extend({
        name: 'SideBarTree',
        components: {SideBarTreeNode},
        methods: {
            ...mapMutations('side-bar', ['createNewComponent'])
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
