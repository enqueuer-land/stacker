<template>
    <div class="side-bar">
        <div class="side-bar-body">
            <SideBarHeader></SideBarHeader>
            <SideBarTree class="scroll-div" style="height: calc(100vh - 190px);"></SideBarTree>
        </div>
        <div>
            <side-bar-footer></side-bar-footer>
        </div>
    </div>
</template>

<script>
    import SideBarHeader from "./SideBarHeader";
    import SideBarTree from "./SideBarTree";
    import SideBarFooter from "./SideBarFooter";

    export default {
        name: 'SideBar',
        components: {
            SideBarFooter,
            SideBarHeader, SideBarTree
        },
        data() {
            return {}
        },
    }
</script>

<style scoped>
    .side-bar {
        height: 100vh;
        background-color: var(--stacker-header-background-color);
    }

    .side-bar-body {
        height: calc(100vh - 40px);
        background-color: var(--stacker-header-background-color);
    }
</style>
