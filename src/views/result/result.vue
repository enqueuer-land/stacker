<template>
    <div id="result" style="height: 100%">
        <ResultHeader style="height: var(--carabina-header-size)" :valid="true" name="repor tNameR eallyLongJust to tesas sadsad"></ResultHeader>
        <div style="background-color: var(--carabina-body-background-color); height: var(--carabina-body-size)">
        </div>
        <div style="background-color: var(--carabina-header-background-darker-color); height: var(--carabina-footer-size)">
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import ResultHeader from '@/views/result/result-header'

    export default Vue.extend({
        name: 'Result',
        components: {ResultHeader}
    });
</script>
