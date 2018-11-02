<template>
    <div class="side-bar-tree">
        <ul class="list-unstyled">
            <SideBarNode v-for="(requisition, index) in $store.state.requisitions" :key="requisition.id" :index="index" :node="requisition"/>
        </ul>
    </div>
</template>

<script>
    import SideBarNode from "./SideBarNode";

    export default {
        name: 'SideBarTree',
        components: {SideBarNode},
    }
</script>

<style scoped>

</style>
