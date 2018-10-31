<template>
    <div class="side-bar-tree">
        <ul class="list-unstyled">
            <SideBarRequisition v-for="requisition in $store.state.requisitions" :key="requisition.id"
                         :requisition="requisition"/>
        </ul>
    </div>
</template>

<script>
    import SideBarRequisition from "./SideBarRequisition";

    export default {
        name: 'SideBarTree',
        components: {SideBarRequisition},
    }
</script>

<style scoped>
</style>
