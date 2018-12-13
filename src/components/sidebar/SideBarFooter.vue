<template>
    <div class="side-bar-footer">
        <div class="row no-gutters justify-content-begin pt-2">
            <stacker-icon v-for="(action, index) in actions" :key="index"
                          class="col-md-auto px-2"
                          :name="action.icon"
                          :tooltip="action.tooltip"
                          @click="action.click()"></stacker-icon>
        </div>
    </div>
</template>

<script>

    import StackerIcon from "../inputs/StackerIcon";
    export default {
        name: "SideBarFooter",
        components: {StackerIcon},
        data() {
            return {
                actions: [
                    {
                        tooltip: "Create new requisition",
                        icon: "create_new_folder",
                        click: () => {
                            this.$store.commit('addRequisition', {router: this.$router});
                        }
                    },
                    {
                        tooltip: "Paste component",
                        icon: "file_copy",
                        isEnabled() {
                            return new ComponentManager().isAbleToBePastedIn();
                        },
                        click: () => {
                            this.$store.commit('clipboardPaste', {router: this.$router});
                        }
                    },
                    {
                        tooltip: "Collapse all requisitions",
                        icon: "unfold_less",
                        click: () => {
                            this.$store.commit('collapseRequisition');
                        }
                    },
                    {
                        tooltip: "Expand all requisitions",
                        icon: "unfold_more",
                        click: () => {
                            this.$store.commit('expandRequisition');
                        }
                    },
                    // {
                    //     tooltip: "Delete selected item",
                    //     icon: "delete",
                    //     click: () => {
                    //         this.$store.commit('deleteComponent', {router: this.$router, item: this.$store.state.selectedItem});
                    //     }
                    // },
                    {
                        tooltip: "Clear all requisitions",
                        icon: "clear",
                        click: () => {
                            this.$store.commit('clearRequisitions', {router: this.$router});
                        }
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .side-bar-footer {
        border-top: 1px solid var(--stacker-background-alternative-color);
        background-color: var(--stacker-header-background-color);
    }
</style>
