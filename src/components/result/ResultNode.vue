<template>
    <div class="side-bar-node mb-0 mt-0">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <result-requisition :requisition="node"/>
            </div>
            <div :id="id" class="collapse">
                <div class="card-body p-0">
                    <ul class="list-unstyled">
                        <result-shallow-test-table :owner="node"/>
                        <result-node v-for="(requisition, index) in node.requisitions" :key="index" :node="requisition"/>
                        <!--<result-publisher v-for="(publisher, index) in node.publishers" :key="index" :publisher="publisher"/>-->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ResultShallowTestTable from "./ResultShallowTestTable";
    import ResultRequisition from "./ResultRequisition";
    import {generateId} from '../../tests/id-generator';

    export default {
        name: 'ResultNode',
        components: {ResultRequisition, ResultShallowTestTable},
        props: {
            node: {}
        },
        data: function () {
            return {
                id: generateId()
            }
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
