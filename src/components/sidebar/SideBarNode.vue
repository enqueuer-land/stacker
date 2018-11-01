<template>
    <div class="side-bar-node">
        <div class="card">
            <div data-toggle="collapse" :data-target="'#' + node.id">
                <SideBarItem :item="node" tag="REQ"/>
            </div>
            <div :id="node.id" class="collapse">
                <div class="card-body">
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
        border: 2px black solid;
        border-left: 8px yellow solid;
    }
</style>
