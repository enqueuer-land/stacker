<template>
    <div class="side-bar">
        <SideBarHeader></SideBarHeader>
        <SideBarTree class="scroll-div" style="max-height: calc(100vh - 150px);"></SideBarTree>
        <remaining-side-bar></remaining-side-bar>
    </div>
</template>

<script>
    import SideBarHeader from "./SideBarHeader";
    import SideBarTree from "./SideBarTree";
    import RemainingSideBar from "./RemainingSideBar";

    export default {
        name: 'SideBar',
        components: {
            RemainingSideBar,
            SideBarHeader, SideBarTree
        },
        data() {
            return {}
        },
    }
</script>

<style scoped>
    .side-bar {
        height: 100%;
        background-color: var(--stacker-header-background-color);
    }

</style>
