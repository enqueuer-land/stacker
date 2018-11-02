<template>
    <div class="result-test-table">
        <result-shallow-test-item v-for="(test, index) in shallowTests.getTests()" :test="test" :index="index"/>
    </div>
</template>

<script>
    import ShallowTestsAnalyzer from "../../tests/shallow-tests-analyzer";
    import ResultShallowTestItem from "./ResultShallowTestItem";

    export default {
        name: 'ResultShallowTestTable',
        components: {ResultShallowTestItem},
        props: {
            owner: {},
        },
        data: function () {
            return {
                shallowTests: new ShallowTestsAnalyzer(this.owner)
            }
        }
    }
</script>

<style scoped>
    .result-test-table {
    }

</style>
