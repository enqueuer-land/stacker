<template>
    <div class="side-bar">
        <SideBarHeader></SideBarHeader>
        <SideBarTree class="scroll-div" style="max-height: calc(100vh - 150px);"></SideBarTree>
        <div :style="remainingSideBarStyle">
            <div class="row justify-content-end dropdown pt-1">
                <div data-toggle="dropdown">
                    <i class="col-4 material-icons stacker-icon">more_vert</i>
                </div>
                <dropdown-component :value="actions"></dropdown-component>
            </div>
        </div>
    </div>
</template>

<script>
    import SideBarHeader from "./SideBarHeader";
    import SideBarTree from "./SideBarTree";
    import DropdownComponent from "../inputs/DropdownComponent";

    export default {
        name: 'SideBar',
        components: {
            DropdownComponent,
            SideBarHeader, SideBarTree
        },
        data() {
            return {
                actions: [
                    {
                        name: "Create Requisition",
                        icon: "create_new_folder",
                        click: () => {
                            this.$store.commit('addRequisition', {router: this.$router});
                        }
                    },
                    {
                        name: "Paste",
                        icon: "file_copy",
                        click: () => {
                            this.$store.commit('clipboardPaste', {router: this.$router});
                        }
                    },
                ]
            }
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

    #more-icon:hover {
        color: var(--text-color);
    }


</style>
