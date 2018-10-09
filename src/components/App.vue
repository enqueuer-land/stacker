<template>
    <div id="main" class="container-fluid">
        <div class="row">
            <div class="col-2 nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab"
                   aria-controls="v-pills-home" aria-selected="true">Requisition #0</a>
                <a class="nav-link disabled" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile"
                   role="tab" aria-controls="v-pills-profile" aria-selected="false">Requisition #1</a>
                <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab"
                   aria-controls="v-pills-messages" aria-selected="false">Requisition #2</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab"
                   aria-controls="v-pills-settings" aria-selected="false">Requisition #3</a>
            </div>

            <div class="col-10 row">
                <div class="col-6">
                    <Requisition v-model="requisition" v-on:sendClick="sendClick"></Requisition>
                </div>
                <div class="col-6">
                    <p class="h3 lead">{{this.enqueuerResponse ? this.enqueuerResponse.name: ''}}</p>
                    <p class="h5"
                       :class="enqueuerResponse ? (enqueuerResponse.length === 0? 'text-success' : 'text-danger'): ''">
                        {{this.enqueuerResponse ? this.resultMessage: ''}}</p>
                    <pre><code>{{this.enqueuerResponse}}</code></pre>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import {EnqueuerClient} from '../enqueuer/enqueuer-client';
    import * as Requisition from './requisition/Requisition';
    import {RequisitionModel} from "../enqueuer/models/outputs/requisition-model";
    import {TestsAnalyzer} from "../enqueuer/tests-analyzer";

    export default {
        name: 'App',
        components: {
            Requisition
        },
        data() {
            return {
                enqueuerResponse: '',
                requisition: null,
                resultMessage: null
            };
        },
        methods: {
            sendClick: function (requisition) {
                console.log(`Requisition: ${JSON.stringify(requisition)}`);

                const enqueuer: EnqueuerClient = new EnqueuerClient(requisition);
                enqueuer.on('response', (response: RequisitionModel) => {
                    //Removes the stacker requisition layer 'http daemon input' stuff
                    const enqueuerResponse = response.requisitions[0];

                    const testsCounter = new TestsAnalyzer(enqueuerResponse);
                    const testsNumber = testsCounter.getTestsNumber();
                    let passingTestsNumber = testsCounter.getPassingTests().length;
                    let percentage = testsCounter.getPercentage();
                    this.resultMessage = `${passingTestsNumber}/${testsNumber} - (${percentage}%) - ${enqueuerResponse.time.totalTime}ms`;

                    this.enqueuerResponse = testsCounter.getFailingTests().map(test => test.description).join('\n') || [];
                });
                enqueuer.on('exit', (response: number) => console.log(`exit: ${response}`));
                enqueuer.on('error', (response: Error) => console.error(`error: ${response}`));
//                enqueuer.on('log', (response: Error) => console.log(`log: ${response}`));
                enqueuer.send().then((success) => {
                    console.log(`Sending result: ${success}`);
                });
            }
        }
    };
</script>

<style lang="css">
    .http {
        color: #ffffff;
        background-color: #271d94;
        padding-right: 0.6em;
        padding-left: 0.6em;
        border-radius: 10rem;
    }

    .amqp {
        color: #ffffff;
        background-color: #1d9427;
    }
</style>
