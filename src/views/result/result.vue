<template>
    <div id="result" style="height: 100%">
        <ResultHeader style="height: var(--carabina-header-size)" :valid="true"
                      name="repor tNameR eallyLongJust to tesas sadsad">
        </ResultHeader>
        <div style="background-color: var(--carabina-body-background-darker-color); height: var(--carabina-body-size)">
        </div>
        <ResultFooter style="height: var(--carabina-footer-size)">
        </ResultFooter>
    </div>
</template>
<script>
    import Vue from 'vue';
    import ResultHeader from '@/views/result/result-header'
    import ResultFooter from '@/views/result/result-footer'

    export default Vue.extend({
        name: 'Result',
        components: {ResultHeader, ResultFooter}
    });
</script>
