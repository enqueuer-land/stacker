<template>
    <div id="result" style="height: 100%; background-color: var(--carabina-body-background-darker-color)">
        <template v-if="responses.length > 0">
            <ResultHeader style="height: var(--carabina-header-size)" :valid="responseIsValid" :name="responseName">
            </ResultHeader>
            <ResultFlattenTestsBody class="pt-3" style="height: var(--carabina-body-size)"
                                    :tests="filteredFlattenTests">
            </ResultFlattenTestsBody>
            <ResultFooter style="height: var(--carabina-footer-size)" :valid="responseIsValid"
                          :total-time="totalTime"
                          :summary="summary" :ignored-tests="ignoredTests">
            </ResultFooter>
        </template>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex';
    import ResultHeader from '@/views/result/result-header'
    import ResultFlattenTestsBody from '@/views/result/result-flatten-tests-body'
    import ResultFooter from '@/views/result/result-footer'

    export default Vue.extend({
        name: 'Result',
        components: {ResultHeader, ResultFooter, ResultFlattenTestsBody},
        mounted() {
            this.$store.subscribe((mutation) => {
                if (mutation.type === 'stage/updateResponse') {
                    this.updateResponse(mutation.payload);
                }
            });
        },
        computed: {
            ...mapGetters('result', ['responses', 'filteredFlattenTests',
                'responseIsValid', 'responseName', 'totalTime', 'ignoredTests', 'summary']),
        },
        methods: {
            ...mapMutations('result', ['updateResponse'])
        }
    });
</script>
