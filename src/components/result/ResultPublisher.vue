<template>
    <div class="result-publisher mb-0 mt-0">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <result-item-header :tests="tests" :name="publisher.name"/>
            </div>
            <div :id="id" class="collapse">
                <result-tests :tests="publisher.node || []"/>
            </div>
        </div>
    </div>
</template>

<script>
    import ResultItemHeader from "./ResultItemHeader";
    import ResultTests from "./ResultTests";
    import {generateId} from '../../tests/id-generator';
    import TestsSummary from "../../tests/tests-summary";

    export default {
        name: 'ResultPublishers',
        components: {ResultItemHeader, ResultTests},
        props: {
            publisher: {}
        },
        data: function () {
            let test = new TestsSummary().addTest(this.publisher.testSummary);
            return {
                id: generateId(),
                node: test
            }
        }
    }
</script>

<style scoped>
    .result-publisher {
        border-bottom: 1px solid #4d4d4d;
        padding-left: 6px;
        background-color: #2b2b2b;
        border-top: 1px var(--publisher-color) solid;
        border-left: 8px var(--publisher-color) solid;
    }

    a:hover {
        /*background-color: #323232;*/
        color: white;
        height: 30px;
        border-left: 4px solid;
    }

    a {
        color: #bababa;
        height: inherit;
    }
</style>
