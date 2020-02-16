<template>
    <div id="side-bar-body">
        <SideBarTree></SideBarTree>
    </div>
</template>
<script>
    import Vue from 'vue';
    import SideBarTree from "@/views/side-bar/side-bar-tree";

    export default Vue.extend({
        name: 'SideBarBody',
        components: {SideBarTree}
    });
</script>
<style type="text/css" scoped>
    #side-bar-body {
        background-color: var(--carabina-header-background-darker-color);
    }

</style>
