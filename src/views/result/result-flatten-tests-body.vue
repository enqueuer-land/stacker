<template>
    <b-container id="result-flatten-tests-body">
        <ResultFlattenTestItem v-for="test in tests" :key="test.id" :test="test"></ResultFlattenTestItem>
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
        padding: 0 !important;
    }
</style>
