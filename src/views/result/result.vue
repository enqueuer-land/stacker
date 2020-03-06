<template>
    <div id="result" style="height: 100%; background-color: var(--carabina-body-background-darker-color)">
        <b-container v-if="enqueuerRunningShowModal" id="running-modal">
            <b-row style="height: 100%" align-h="center" align-v="center">
                <b-col cols="auto">
                    <b-spinner style="width: 3rem; height: 3rem; color: var(--carabina-theme-color)"
                               label="Large Spinner"></b-spinner>
                </b-col>
            </b-row>
        </b-container>
        <template v-else-if="responses.length > 0">
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
        data: function() {
          return {
              showModal: false,
          }
        },
        computed: {
            ...mapGetters('result', ['responses', 'filteredFlattenTests',
                'responseIsValid', 'responseName', 'totalTime', 'ignoredTests', 'summary', 'enqueuerRunningShowModal']),
        },
        methods: {
            ...mapMutations('result', ['updateResponse'])
        }
    });
</script>
<style type="text/css" scoped>
    #running-modal {
        background-color: var(--carabina-header-background-darker-color);
        filter: opacity(0.75);
        position: relative;
        height: 100%;
    }
</style>
