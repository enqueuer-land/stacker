<template>
    <b-container id="result-footer" class="px-1 carabina-text">
        <b-row style="width: 100%; height: 100%; font-size: 14px" no-gutters class="m-0 p-0" align-h="between">
            <b-col cols="auto" class="align-self-center pl-1">
                <span class="label-text">
                    Tests:
                </span>
                <span :style="{color: valid? 'var(--carabina-passing-test-color)': 'var(--carabina-failing-test-color)'}">
                    {{summary}}
                </span>
                <span v-if="ignoredTests > 0" style="margin-left: 3px; color: var(--carabina-ignored-test-color);">
                    {{ignoredTests}} ignored
                </span>
            </b-col>
            <b-col cols="auto" class="align-self-center pr-1">
                <span class="label-text">
                    Time:
                </span>
                <span :style="{color: valid? 'var(--carabina-passing-test-color)': 'var(--carabina-failing-test-color)'}">
                    {{totalTime}}
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
        props: {
            valid: Boolean,
            totalTime: Number,
            summary: String,
            ignoredTests: Number,
        },
        computed: {
            ...mapGetters('result', []),
        },
        methods: {
            prettifyTime: (timeInMilliseconds) => {
                const ms = timeInMilliseconds % 1000;
                timeInMilliseconds = (timeInMilliseconds - ms) / 1000;
                const secs = timeInMilliseconds % 60;
                timeInMilliseconds = (timeInMilliseconds - secs) / 60;
                const minutes = timeInMilliseconds % 60;
                let result = '';
                if (minutes > 0) {
                    result += minutes + 'm'
                }
                if (secs > 0) {
                    result += secs + 's'
                }
                if (ms > 0) {
                    result += ' ' + ms + 'ms'
                }
                return result;
            }
        }
    });
</script>
<style type="text/css" scoped>
    #result-footer {
        height: 100%;
        background-color: var(--carabina-header-background-darker-color);
        border-top: 1px solid var(--carabina-header-background-lighter-color);
    }

    .label-text {
        font-size: 13px;
        text-align: right;
        font-weight: lighter;
        color: var(--carabina-text-darker-color);
    }
</style>
