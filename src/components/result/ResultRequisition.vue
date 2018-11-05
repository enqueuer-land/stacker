<template>
    <div class="result-requisition mb-0 mt-0">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <result-item-header :tests="tests" :name="requisition.name" :totalTime="requisition.time.totalTime"/>
            </div>
            <div :id="id" class="collapse">
                <div class="card-body p-0">
                    <ul class="list-unstyled">
                        <result-multi-requisitions :requisitions="requisition.requisitions || []"/>
                        <result-tests :tests="requisition.node || []"/>
                        <result-publisher v-for="(publisher, index) in requisition.publishers || []" :key="index" :publisher="publisher"/>
                        <result-subscription v-for="(subscription, index) in requisition.subscriptions || []" :key="index" :subscription="subscription"/>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ResultItemHeader from "./ResultItemHeader";
    import {generateId} from '../../tests/id-generator';
    import DeepTestsSummary from "../../tests/deep-tests-summary";
    import ResultMultiRequisitions from "./ResultMultiRequisitions";
    import ResultPublisher from "./ResultPublisher";
    import ResultSubscription from "./ResultSubscription";
    import ResultTests from "./ResultTests";

    export default {
        name: 'ResultRequisition',
        components: {
            ResultItemHeader,
            ResultTests,
            ResultMultiRequisitions,
            ResultPublisher,
            ResultSubscription,
        },
        props: {
            requisition: {}
        },
        data: function () {
            return {
                id: generateId(),
                node: new DeepTestsSummary().addTest(this.requisition)
            }
        }
    }
</script>

<style scoped>
    .result-requisition {
        border-bottom: 1px solid #4d4d4d;
        padding-left: 6px;
        background-color: #2b2b2b;
        border-top: 1px var(--requisition-color) solid;
        border-left: 8px var(--requisition-color) solid;
    }
</style>
