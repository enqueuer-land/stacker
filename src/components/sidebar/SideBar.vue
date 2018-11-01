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
        height: 100vh;
        background-color: #2b2b2b;
    }

</style>
