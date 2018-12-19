<template>
    <div class="result-flatten-tests">
        <result-flatten-tests-item v-for="(test, index) in filteredTestsSummary" :key="index" :test="test"
                                   :index="index"/>
    </div>
</template>

<script>
    import FlattenTestsSummary from "../../../tests/flatten-tests-summary";
    import ResultFlattenTestsItem from "./ResultFlattenTestsItem";

    export default {
        name: 'ResultFlattenTests',
        components: {ResultFlattenTestsItem},
        props: {
            node: {}
        },
        watch: {
            node: function () {
                let now = new Date();
                console.log('Start parsing');
                console.log('Now: ' + now.toISOString());
                let testsSummary = new FlattenTestsSummary();
                testsSummary.addTest(this.node);
                this.testsSummary = testsSummary.getTests();
                now = new Date();
                console.log('Now: ' + now.toISOString());
                console.log('Parsing is over');
            }
        },
        data: function () {
            let testsSummary = new FlattenTestsSummary();
            testsSummary.addTest(this.node);
            return {
                testsSummary: testsSummary.getTests()
            }
        },
        computed: {
            filteredTestsSummary() {
                const resultFilter = this.$store.state.resultFilter;
                const filterString = resultFilter.string.toLowerCase();
                return this.testsSummary
                    .filter(test => (resultFilter.showPassingTests && test.valid) ||
                                    (resultFilter.showFailingTests && !test.valid))
                    .filter(test => test.name.toLowerCase().indexOf(filterString) !== -1 ||
                                    test.description.toLowerCase().indexOf(filterString) !== -1 ||
                                    test.hierarchy.some(hierarchy => hierarchy.name.toLowerCase().indexOf(filterString) !== -1));
            }
        }
    }
</script>

<style scoped>
    .result-flatten-tests {
    }
</style>
