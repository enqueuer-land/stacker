<template>
    <div class="side-bar">
        <SideBarHeader></SideBarHeader>
        <SideBarTree></SideBarTree>
    </div>
</template>

<script>
import SideBarHeader from "./SideBarHeader";
import SideBarTree from "./SideBarTree";

export default {
    name: 'SideBar',
    components: {
        SideBarHeader, SideBarTree
    }
}
</script>

<style scoped>
    .side-bar {
        border: 2px red solid;
        height: 100vh;
    }
</style>
