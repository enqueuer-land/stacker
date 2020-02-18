<template>
    <div id="result" style="height: 100%">
        <ResultHeader style="height: var(--carabina-header-size)" :valid="true"
                      :name="'repor tNameR eallyLongJust to tesas sadsad'">
        </ResultHeader>
        <ResultFlattenTestsBody style="height: var(--carabina-body-size)">
        </ResultFlattenTestsBody>
        <ResultFooter style="height: var(--carabina-footer-size)" :valid="false" :total-time="123456" summary="10/12 (84%)" :ignored-tests="4">
        </ResultFooter>
    </div>
</template>
<script>
    import Vue from 'vue';
    import ResultHeader from '@/views/result/result-header'
    import ResultFlattenTestsBody from '@/views/result/result-flatten-tests-body'
    import ResultFooter from '@/views/result/result-footer'

    export default Vue.extend({
        name: 'Result',
        components: {ResultHeader, ResultFooter, ResultFlattenTestsBody}
    });
</script>
