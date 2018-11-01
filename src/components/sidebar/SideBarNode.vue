<template>
    <div class="side-bar-node mb-0 mt-0">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + node.id">
                <SideBarItem :item="node" tag="REQ"/>
            </div>
            <div :id="node.id" class="collapse">
                <div class="card-body p-0">
                    <ul class="list-unstyled">
                        <SideBarNode v-for="requisition in node.requisitions" :key="requisition.id"
                                     :node="requisition"/>
                        <SideBarItem v-for="publisher in node.publishers" :key="publisher.id" :item="publisher"
                                     tag="PUB"/>
                        <SideBarItem v-for="subscription in node.subscriptions" :key="subscription.id"
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
            node: {}
        }
    }
</script>

<style scoped>
    .side-bar-node {
        /*border: 2px black solid;*/
        border-top: 5px solid #4d4d4d;
        border-bottom: 1px solid #4d4d4d;
        padding-left: 4px;
        border-left: 5px var(--requisition-color) solid;
    }
</style>
