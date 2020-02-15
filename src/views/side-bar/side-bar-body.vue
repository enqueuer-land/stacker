<template>
    <div id="side-bar-body">
        <SideBarNeck></SideBarNeck>
        <SideBarTreeNode></SideBarTreeNode>
    </div>
</template>
<script>
    import Vue from 'vue';
    import SideBarNeck from "@/views/side-bar/side-bar-neck";
    import SideBarTreeNode from "@/views/side-bar/side-bar-tree-node";

    export default Vue.extend({
        name: 'SideBarBody',
        components: {SideBarNeck, SideBarTreeNode}
    });
</script>
<style type="text/css" scoped>
    #side-bar-body {
        background-color: var(--carabina-header-background-darker-color);
    }

</style>
