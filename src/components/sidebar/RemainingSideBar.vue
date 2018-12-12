<template>
    <div class="remaining-side-bar">
        <div :style="remainingSideBarStyle">
            <div class="row justify-content-end dropdown pt-1">
                <div data-toggle="dropdown">
                    <stacker-icon class="col-4" name="more_vert"></stacker-icon>
                </div>
                <dropdown-component :value="actions"></dropdown-component>
            </div>
        </div>
    </div>
</template>

<script>
    import DropdownComponent from "../inputs/DropdownComponent";
    import ComponentManager from "../../tests/component-manager";
    import StackerIcon from "../inputs/StackerIcon";

    export default {
        name: 'RemainingSideBar',
        components: {
            StackerIcon,
            DropdownComponent
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
                        name: "Collapse all",
                        icon: "unfold_less",
                        click: () => {
                            this.$store.commit('collapseRequisition');
                        }
                    },
                    {
                        name: "Expand all",
                        icon: "unfold_more",
                        click: () => {
                            this.$store.commit('expandRequisition');
                        }
                    },
                    {
                        divider: true,
                    },
                    {
                        name: "Clear",
                        icon: "clear_all",
                        click: () => {
                            this.$store.commit('clearRequisitions');
                        }
                    },
                ]
            }
        },
        computed: {
            remainingSideBarStyle() {
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
    .remaining-side-bar {

    }
</style>
