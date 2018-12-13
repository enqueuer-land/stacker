<template>
    <div class="side-bar-footer">
        <div :style="remainingSideBarStyle">
            <div class="row no-gutters justify-content-between pt-1">
                <stacker-icon v-for="(action, index) in actions" :key="index"
                              class="px-2 py-1"
                              :name="action.icon"
                              :tooltip="action.tooltip"
                              @click="action.click()"
                ></stacker-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import ComponentManager from "../../tests/component-manager";
    import StackerIcon from "../inputs/StackerIcon";

    export default {
        name: 'SideBarFooter',
        components: {
            StackerIcon
        },
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
                        divider: true,
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
                    {
                        divider: true,
                    },
                    {
                        tooltip: "Clear all requisitions",
                        icon: "clear_all",
                        click: () => {
                            this.$store.commit('clearRequisitions', {router: this.$router});
                        }
                    },
                ]
            }
        },
        computed: {
            remainingSideBarStyle() {
                let style = {
                    // 'border-top': '1px solid var(--stacker-background-alternative-color)',
                    'border-top': '1px solid var(--enqueuer-color)',
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
    .side-bar-footer {

    }
</style>
