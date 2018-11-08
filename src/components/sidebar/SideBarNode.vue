<template>
    <div :class="sideBarClass">
        <div class="card" style="border: none; border-left: 1px solid var(--stacker-background-color)">
            <div @click="onClick" :id="'collapsible' + node.id" data-toggle="collapse" :data-target="'#' + node.id">
                <SideBarItem :item="node" :index="index" :key="node.id" :opened="opened"/>
            </div>
            <div :id="node.id" class="collapse">
                <div class="card-body p-0 pl-2" style="background-color: var(--index-color)">
                    <ul class="list-unstyled">
                        <SideBarNode v-for="(requisition, index) in node.requisitions" :index="index" :key="requisition.id"
                                     :node="requisition"/>
                        <SideBarItem v-for="(publisher, index) in node.publishers" :index="index" :key="publisher.id" :item="publisher"/>
                        <SideBarItem v-for="(subscription, index) in node.subscriptions" :index="index" :key="subscription.id" :item="subscription"/>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SideBarItem from "./SideBarItem";

    export default {
        name: 'SideBarNode',
        components: {SideBarItem},
        props: {
            node: {},
            index: {},
        },
        data: function() {
            return {
                opened: false
            }
        },
        methods: {
            onClick: function () {
                this.opened = $('#collapsible' + this.node.id).hasClass('collapsed');
                console.log(this.opened);
            }
        },
        computed: {
            sideBarClass: function () {
                return {
                    'side-bar-node mb-0 mt-0': true,
                }
            }
        }
    }
</script>

<style scoped>
    .side-bar-node {
        background-color: var(--stacker-background-color);
        border-top: 1px var(--index-color) solid;
    }

</style>
