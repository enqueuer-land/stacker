<template>
    <div>
        <!--Result-->
        <div class="response-header">
            <h3>{{this.response.name}}</h3>
        </div>

        <table v-if="response" class="table table-striped table-hover">
            <thead class="thead-dark">
            <tr>
                <th>Hierarchy</th>
                <th>Name</th>
                <th>Description</th>
                <th>Valid</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th></th>
                <th></th>
                <th>{{summary}}</th>
                <th>{{totalTime}}ms</th>
            </tr>
            </tfoot>
            <tbody>
            <tr v-for="test in resultTable">
                <td>{{test.hierarchy.filter((test, index) => index > 0).join(': ')}}</td>
                <td>{{test.test.name}}</td>
                <td>{{test.test.description}}</td>
                <td :class="test.test.valid? 'table-success' : 'table-danger'">{{test.test.valid}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">

    import {TestsAnalyzer} from '../enqueuer/tests-analyzer';

    export default {
        name: 'Response',
        props: [
            'enqueuerResponse'
        ],
        data() {
            return {
                display: {},
                response: {},
                resultTable: null,
                summary: null,
                totalTime: null,
            }
        },
        watch: {
            enqueuerResponse() {
                this.response = this.enqueuerResponse.requisitions[0];
                const testsCounter = new TestsAnalyzer(this.response);
                const tests = testsCounter.getTests();
                let passingTestsNumber = testsCounter.getPassingTests().length;
                let percentage = testsCounter.getPercentage();
                console.log(`Total time: ${JSON.stringify(this.response.time)}`);
                this.summary = `${passingTestsNumber}/${tests.length} - (${percentage}%)`;
                this.totalTime = this.response.time.totalTime;
                this.resultTable = tests;
            }
        }
    };
</script>
<style>
    .response-header {
        color: #fff;
        padding: 20px;
        background: #2d28d3;
        font-weight: bold;
        text-transform: capitalize;
    }

</style>
