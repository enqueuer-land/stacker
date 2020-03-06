<template>
    <div id="side-bar-body">
        <SideBarTree></SideBarTree>
    </div>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/scrollbar.css';
    import SideBarTree from "@/views/side-bar/side-bar-tree";

    export default Vue.extend({
        name: 'SideBarBody',
        components: {SideBarTree}
    });
</script>
<style type="text/css" scoped>
    #side-bar-body {
        background-color: var(--carabina-body-background-darker-color);
        overflow-y: scroll;
        width: 100%;
        height: 100%;
    }

</style>
