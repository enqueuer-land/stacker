<template>
    <b-container id="result-flatten-tests-body" class="px-0">
        <ResultFlattenTestItem v-for="test in tests" :expanded="tests.length === 1" :key="test.id"
                               :test="test"></ResultFlattenTestItem>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import ResultFlattenTestItem from '@/views/result/result-flatten-test-item'

    export default Vue.extend({
        name: 'ResultFlattenTestsBody',
        components: {
            ResultFlattenTestItem
        },
        props: {
            tests: Array
        }
    });
</script>
<style type="text/css" scoped>
    #result-flatten-tests-body {
        background-color: var(--carabina-body-background-darker-color);
        height: 100%;
        overflow-y: scroll;
        width: 100%;
    }
</style>
