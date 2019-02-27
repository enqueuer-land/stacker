<template>
    <div class="side-bar-tree">
        <ul class="list-unstyled mb-0">
            <SideBarNode v-for="(requisition, index) in filteredRequisitions" :key="requisition.id" :index="index"
                         :node="requisition"/>
        </ul>
    </div>
</template>

<script>
    import SideBarNode from "./SideBarNode";
    import ComponentManager from "../../tests/component-manager";

    export default {
        name: 'SideBarTree',
        components: {SideBarNode},
        computed: {
            filteredRequisitions() {
                return this.$store.state.requisitions
                    .filter(requisition => new ComponentManager().itemFilter(requisition));
            }
        }
    }
</script>


<style scoped>
    .side-bar-tree {
        position: relative;
        /*overflow: unset;*/
    }

</style>
