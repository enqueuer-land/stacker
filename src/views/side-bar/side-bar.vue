<template>
    <div id="side-bar" style="height: 100%">
        <SideBarHeader style="height: var(--carabina-header-size)"></SideBarHeader>
        <SideBarBody style="height: var(--carabina-body-size)"></SideBarBody>
        <SideBarFooter style="height: var(--carabina-footer-size)"></SideBarFooter>
    </div>
</template>
<script>
    import Vue from 'vue';
    import SideBarHeader from "@/views/side-bar/side-bar-header";
    import SideBarBody from "@/views/side-bar/side-bar-body";
    import SideBarFooter from "@/views/side-bar/side-bar-footer";

    export default Vue.extend({
        name: 'SideBar',
        components: {SideBarFooter, SideBarBody, SideBarHeader}
    });
</script>
