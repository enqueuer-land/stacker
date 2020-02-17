<template>
    <b-container id="result-footer" class="px-1 carabina-text">
        <b-row style="width: 100%; height: 100%; font-size: 14px" no-gutters class="m-0 p-0" align-h="between">
            <b-col cols="auto" class="align-self-center pl-2">
                <span class="label-text">
                    Tests:
                </span>
                <span class="label-text"
                      :style="{color: valid? 'var(--carabina-passing-test-color)': 'var(--carabina-failing-test-color)'}">
                        {{summary}}
                </span>
                <span v-if="ignoredTests > 0" class=""
                      style="margin-left: 5px; color: var(--carabina-ignored-test-color)">
                    {{ignoredTests}} ignored
                </span>
            </b-col>
            <b-col cols="auto" class="align-self-center pr-2">
                <span class="label-text">
                    Time:
                </span>
                <span
                      :style="{color: valid? 'var(--carabina-passing-test-color)': 'var(--carabina-failing-test-color)'}">
                    {{totalTime}}ms
                </span>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css'
    import {mapGetters} from "vuex";

    export default Vue.extend({
        name: 'ResultFooter',
        data: function() {
          return {
              valid: true,
              totalTime: 432,
              summary: '10/10 (100%)',
              ignoredTests: 3,
          }
        },
        computed: {
            ...mapGetters('result', []),
        }
    });
</script>
<style type="text/css" scoped>
    #result-footer {
        height: 100%;
        background-color: var(--carabina-header-background-darker-color);
    }

    .label-text {
        text-align: right;
        font-weight: lighter;
        color: var(--carabina-text-darker-color);
    }
</style>
