<template>
    <div :class="sideBarClass">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + node.id"
                @click="selected = !selected">
                <SideBarItem :item="node" :index="index"/>
            </div>
            <div :id="node.id" class="collapse">
                <div class="card-body p-0">
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
            index: {}
        },
        data: function() {
            return {
                selected: false
            }
        },
        computed: {
            sideBarClass: function () {
                return {
                    'side-bar-node mb-0 mt-0 pl-1': true,
                    'side-bar-node-active': this.selected
                }
            }
        }
    }
</script>

<style scoped>
    .side-bar-node {
        padding-left: 6px;
        background-color: var(--stacker-background-color);
        border-top: 1px var(--index-color) solid;
    }

    .side-bar-node-active {
        border-left: 8px var(--index-color) solid;
    }

</style>
