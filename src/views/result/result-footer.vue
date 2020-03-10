<template>
    <b-container id="result-footer" class="px-1 carabina-text">
        <b-row style="width: 100%; height: 100%; font-size: 15px" class="m-0 px-1" align-h="between">
            <b-col cols="auto" class="align-self-center pl-1">
                <span class="label-text">
                    Tests:
                </span>
                <span class="ml-2"
                      :style="{color: valid? 'var(--carabina-passing-test-color)': 'var(--carabina-failing-test-color)'}">
                    {{summary}}
                </span>
                <span v-if="ignoredTests > 0" class="ml-3" style="color: var(--carabina-ignored-test-color);">
                    {{ignoredTests}} ignored
                </span>
            </b-col>
            <b-col cols="auto" class="align-self-center pr-1">
                <span class="label-text">
                    Time:
                </span>
                <span :style="{color: valid? 'var(--carabina-passing-test-color)': 'var(--carabina-failing-test-color)'}">
                    {{prettifyTime}}
                </span>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css'

    export default Vue.extend({
        name: 'ResultFooter',
        props: {
            valid: Boolean,
            totalTime: Number,
            summary: String,
            ignoredTests: Number,
        },
        computed: {
            prettifyTime: function () {
                let timeInMilliseconds = this.totalTime;
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
                return result + ' ' + ms + 'ms';
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
        font-size: 16px;
        text-align: right;
        font-weight: lighter;
        color: var(--carabina-text-darker-color);
    }
</style>
