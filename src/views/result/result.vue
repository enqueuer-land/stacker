<template>
    <div id="result" style="height: 100%">
        <ResultHeader style="height: var(--carabina-header-size)" :valid="true"
                      :name="'repor tNameR eallyLongJust to tesas sadsad'">
        </ResultHeader>
        <ResultBody style="height: var(--carabina-body-size)">
        </ResultBody>
        <ResultFooter style="height: var(--carabina-footer-size)" :valid="false" :total-time="123456" summary="10/12 (84%)" :ignored-tests="4">
        </ResultFooter>
    </div>
</template>
<script>
    import Vue from 'vue';
    import ResultHeader from '@/views/result/result-header'
    import ResultBody from '@/views/result/result-body'
    import ResultFooter from '@/views/result/result-footer'

    export default Vue.extend({
        name: 'Result',
        components: {ResultHeader, ResultFooter, ResultBody}
    });
</script>
