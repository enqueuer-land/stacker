<template>
    <div class="side-bar-node mb-0 mt-0">
        <div class="card" style="border: none;">
            <div @click="onClick" :id="'collapsible' + node.id" data-toggle="collapse" :data-target="'#' + node.id">
                <SideBarItem :item="node" :index="index" :key="node.id" :opened="opened"/>
            </div>
            <div :id="node.id" class="collapse">
                <div class="p-0 pl-3" style="background-color: var(--stacker-header-background-color); border-left: 2px solid var(--requisition-color);">
                    <ul class="list-unstyled">
                        <SideBarNode v-for="(requisition, index) in filteredRequisitions" :index="index"
                                     :key="requisition.id" :node="requisition"/>
                        <SideBarItem v-for="(publisher, index) in filteredPublishers" :index="index" :key="publisher.id"
                                     :item="publisher"/>
                        <SideBarItem v-for="(subscription, index) in filteredSubscriptions" :index="index"
                                     :key="subscription.id" :item="subscription"/>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SideBarItem from "./SideBarItem";
    import ComponentManager from "../../tests/component-manager";

    export default {
        name: 'SideBarNode',
        components: {SideBarItem},
        props: {
            node: {},
            index: {},
        },
        data: function () {
            return {
                opened: false
            }
        },
        methods: {
            onClick: function () {
                this.opened = !$('#' + this.node.id).hasClass('show');
            },
        },
        computed: {
            filteredRequisitions() {
                return (this.node.requisitions || []).filter(requisition => new ComponentManager().nodeFilter(requisition));
            },
            filteredPublishers() {
                return (this.node.publishers || []).filter(leaf => new ComponentManager().itemFilter(leaf));
            },
            filteredSubscriptions() {
                return (this.node.subscriptions || []).filter(leaf => new ComponentManager().itemFilter(leaf));
            }
        },
        watch: {
            '$store.state.selectedItem'() {
                let selectedItem = this.$store.state.selectedItem;
                if (selectedItem) {
                    const selectedIsDescendant = new ComponentManager().findIdInRequisition(selectedItem.id, this.node);
                    const item = $('#' + this.node.id);
                    let notSelf = this.node.id !== selectedItem.id;
                    if (selectedIsDescendant && notSelf) {
                        this.opened = true;
                        item.addClass('show');
                    } else {
                        //TODO is it a good idea? Keep just one requisition opened at a time
                        // this.opened = false;
                        // item.removeClass('show');
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .side-bar-node {
        /*background-color: var(--stacker-background-color);*/
        /*border-top: 1px var(--text-smooth-color) solid;*/
    }

</style>
