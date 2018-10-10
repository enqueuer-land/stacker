<template>
    <div>
        <!--Result-->
        <p class="h3 lead">{{this.enqueuerResponse ? this.enqueuerResponse.name: ''}}</p>
        <table v-if="enqueuerResponse" class="table table-striped table-hover">
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
                <th></th>
                <th>{{totalTime}}ms</th>
            </tr>
            </tfoot>
            <tbody>
            <tr v-for="test in resultTable">
                <td>{{test.hierarchy.filter((test, index) => index > 0).join(': ')}}</td>
                <td>{{test.test.name}}</td>
                <td>{{test.test.description}}</td>
                <td :class="test.test.valid? 'text-success' : 'text-danger'">{{test.test.valid}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import {TestsAnalyzer} from '../enqueuer/tests-analyzer';

    export default {
        name: 'Response',
        props: [
          'enqueuerResponse'
        ],
        data() {
            return {
                display: {},
                resultTable: null,
                summary: null,
                totalTime: null,
            }
        },
        watch: {
            enqueuerResponse() {
                const testsCounter = new TestsAnalyzer(this.enqueuerResponse);
                const tests = testsCounter.getTests();
                let passingTestsNumber = testsCounter.getPassingTests().length;
                let percentage = testsCounter.getPercentage();
                this.summary = `${this.enqueuerResponse.name}: ${passingTestsNumber}/${tests.length} - (${percentage}%)`;
                this.totalTime = this.enqueuerResponse.time.totalTime;
                this.resultTable = tests;
            }
        }
    };
</script>
