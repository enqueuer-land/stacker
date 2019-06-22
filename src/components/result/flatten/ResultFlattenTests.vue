<template>
    <div class="result-flatten-tests">
        <result-flatten-tests-item v-for="(test, index) in filteredTestsSummary" :key="index" :test="test"
                                   :index="index"/>
    </div>
</template>

<script>
    import ResultFlattenTestsItem from "./ResultFlattenTestsItem";
    import FlattenTestsSummary from "../../../tests/flatten-tests-summary";

    export default {
        name: 'ResultFlattenTests',
        components: {ResultFlattenTestsItem},
        props: {
            nodes: {}
        },
        watch: {
            nodes: function () {
                this.testsSummary = [];
                const flattenTestsSummary = new FlattenTestsSummary();
                (this.nodes || []).forEach(node => {
                    this.testsSummary = this.testsSummary.concat(flattenTestsSummary.flatten(node));
                });
            }
        },
        data: function () {
            return {
                testsSummary: []
            }
        },
        computed: {
            filteredTestsSummary() {
                const resultFilter = this.$store.state.resultFilter;
                const filterString = resultFilter.string.toLowerCase();
                return this.testsSummary
                    .filter(test => (resultFilter.showPassingTests && test.valid === true) ||
                        (resultFilter.showFailingTests && test.valid === false) ||
                        (resultFilter.showIgnored && test.ignored === true))
                    .filter(test => test.name.toLowerCase().indexOf(filterString) !== -1 ||
                        (test.description.toLowerCase() || '').indexOf(filterString) !== -1 ||
                        test.hierarchy.some(hierarchy => hierarchy.name.toLowerCase().indexOf(filterString) !== -1));
            }
        }
    }
</script>

<style scoped>
    .result-flatten-tests {
    }
</style>
