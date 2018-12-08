<template>
    <div class="side-bar">
        <SideBarHeader></SideBarHeader>
        <SideBarTree class="scroll-div" style="max-height: calc(100vh - 150px);"></SideBarTree>
        <!--<div :style="remainingSideBarStyle"></div>-->
    </div>
</template>

<script>
import SideBarHeader from "./SideBarHeader";
import SideBarTree from "./SideBarTree";
export default {
    name: 'SideBar',
    components: {
        SideBarHeader, SideBarTree
    },
    computed: {
        remainingSideBarStyle: function () {
            let style = {
                'height': '100%',
                'background-color': 'var(--stacker-header-background-color)',
            };
            const selectedItem = this.$store.state.selectedItem;
            if (selectedItem) {
                // style['border-right'] = '2px var(--' + selectedItem.component + '-color) solid';
            }
            return style;
        },
    }
}
</script>

<style scoped>
    .side-bar {
        height: 100%;
        background-color: var(--stacker-header-background-color);
    }

</style>
