<template>
    <div id="side-bar-body">
        <SideBarNeck></SideBarNeck>
    </div>
</template>
<script lang="ts">
    import SideBarNeck from "@/views/side-bar/side-bar-neck";
    import Vue from 'vue';

    export default Vue.extend({
        name: 'SideBarBody',
        components: {SideBarNeck}
    });
</script>
<style type="text/css" scoped>
    #side-bar-body {
        background-color: var(--carabina-header-background-darker-color);
    }

</style>
