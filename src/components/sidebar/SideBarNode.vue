<template>
    <div class="side-bar-node mb-0 mt-0">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + node.id">
                <SideBarItem :item="node" :index="index" tag="REQ"/>
            </div>
            <div :id="node.id" class="collapse">
                <div class="card-body p-0">
                    <ul class="list-unstyled">
                        <SideBarNode v-for="(requisition, index) in node.requisitions" :index="index" :key="requisition.id"
                                     :node="requisition"/>
                        <SideBarItem v-for="(publisher, index) in node.publishers" :index="index" :key="publisher.id" :item="publisher"
                                     tag="PUB"/>
                        <SideBarItem v-for="(subscription, index) in node.subscriptions" :index="index" :key="subscription.id"
                                     :item="subscription"
                                     tag="SUB"/>
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
        }
    }
</script>

<style scoped>
    .side-bar-node {
        border-bottom: 1px solid #4d4d4d;
        padding-left: 6px;
        background-color: #2b2b2b;
        border-top: 1px var(--requisition-color) solid;
        border-left: 8px var(--requisition-color) solid;
    }

</style>
