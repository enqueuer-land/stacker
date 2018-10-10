<template>
    <div>
        <!--Result-->
        <p class="h3 lead">{{this.enqueuerResponse ? this.enqueuerResponse.name: ''}}</p>
        <!--<p class="h5"-->
           <!--:class="display ? (display.length === 0? 'text-success' : 'text-danger'): ''">-->
            <!--{{display ? this.resultMessage: ''}}</p>-->
        <pre><code>{{this.enqueuerResponse}}</code></pre>
    </div>
</template>

<script>

    import {TestsAnalyzer} from '../enqueuer/tests-analyzer';

    export default {
        name: 'Response',
        // updated() {
        //     if (this.enqueuerResponse) {
        //         console.log(`Response.vue: ${JSON.stringify(this.enqueuerResponse)}`);
        //
        //
        //         const testsCounter = new TestsAnalyzer(this.enqueuerResponse);
        //         const testsNumber = testsCounter.getTestsNumber();
        //         let passingTestsNumber = testsCounter.getPassingTests().length;
        //         let percentage = testsCounter.getPercentage();
        //         this.resultMessage = `${this.enqueuerResponse.name}: ${passingTestsNumber}/${testsNumber} - (${percentage}%) - ${this.enqueuerResponse.time.totalTime}ms`;
        //
        //         this.display = testsCounter.getFailingTests().map(test => test.description).join('\n') || [];
        //         this.enqueuerResponse = null;
        //     }
        //
        // },
        props: [
          'enqueuerResponse'
        ],
        // data() {
        //     return {
        //         display: {},
        //         resultMessage: null
        //     }
        // }
    };
</script>
