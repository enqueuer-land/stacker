<template>
    <div class="result-deep-tests">
        <result-deep-tests-item v-for="(test, index) in testsSummary" :key="index" :test="test"
                                :index="index"/>
    </div>
</template>

<script>
    import DeepTestsSummary from "../../tests/deep-tests-summary";
    import ResultDeepTestsItem from "./ResultDeepTestsItem";

    export default {
        name: 'ResultDeepTests',
        components: {ResultDeepTestsItem},
        props: {
            node: {}
        },
        data: function () {
            let testsSummary = new DeepTestsSummary();
            testsSummary.addTest(this.node);
            return {
                testsSummary: testsSummary.getTests()
            }
        },
    }
</script>

<style scoped>
    .result-deep-tests {
    }
</style>
