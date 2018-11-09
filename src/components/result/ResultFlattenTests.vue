<template>
    <div class="result-flatten-tests">
        <result-flatten-tests-item v-for="(test, index) in testsSummary" :key="index" :test="test"
                                :index="index"/>
    </div>
</template>

<script>
    import FlattenTestsSummary from "../../tests/flatten-tests-summary";
    import ResultFlattenTestsItem from "./ResultFlattenTestsItem";

    export default {
        name: 'ResultFlattenTests',
        components: {ResultFlattenTestsItem},
        props: {
            node: {}
        },
        watch: {
            node: function () {
                let testsSummary = new FlattenTestsSummary();
                testsSummary.addTest(this.node);
                this.testsSummary = testsSummary.getTests();
            }
        },
        data: function () {
            let testsSummary = new FlattenTestsSummary();
            testsSummary.addTest(this.node);
            return {
                testsSummary: testsSummary.getTests()
            }
        },
    }
</script>

<style scoped>
    .result-flatten-tests {
    }
</style>
