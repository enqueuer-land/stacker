<template>
    <div id="side-bar-body">
        <SideBarNeck></SideBarNeck>
        <SideBarTree></SideBarTree>
    </div>
</template>
<script>
    import Vue from 'vue';
    import SideBarNeck from "@/views/side-bar/side-bar-neck";
    import SideBarTree from "@/views/side-bar/side-bar-tree";

    export default Vue.extend({
        name: 'SideBarBody',
        components: {SideBarNeck, SideBarTree}
    });
</script>
<style type="text/css" scoped>
    #side-bar-body {
        background-color: var(--carabina-header-background-darker-color);
    }

</style>
