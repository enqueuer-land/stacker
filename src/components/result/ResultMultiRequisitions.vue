<template>
    <div class="result-multi-requisitions mb-0 mt-0">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <result-item-header :tests="tests" name="Requisitions"/>
            </div>
            <div :id="id" class="collapse">
                <div class="card-body p-0">
                    <ul class="list-unstyled">
                        <!--<ResultRequisition v-for="(requisition, index) in requisitions" :key="index" :requisition="requisition"/>-->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ResultItemHeader from "./ResultItemHeader";
    import ResultRequisition from "./ResultRequisition";
    import {generateId} from '../../tests/id-generator';
    import DeepTestsSummary from "../../tests/deep-tests-summary";

    export default {
        name: 'ResultMultiRequisitions',
        components: {ResultItemHeader, 'ResultRequisition': ResultRequisition},
        props: {
            requisitions: {}
        },
        data: function () {
            let deep = new DeepTestsSummary();
            (this.requisitions || [])
                .forEach(requisition => deep.addTest(requisition));
            return {
                id: generateId(),
                node: deep
            }
        }
    }
</script>

<style scoped>
    .result-multi-requisitions {
        border-bottom: 1px solid #4d4d4d;
        padding-left: 6px;
        background-color: #2b2b2b;
        border-top: 1px var(--requisition-color) solid;
        border-left: 8px var(--requisition-color) solid;
    }
</style>
