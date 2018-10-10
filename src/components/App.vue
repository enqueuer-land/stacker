<template>
    <div id="main" class="container-fluid">
        <div class="wrapper">
            <SideBar :requisitions="requisitions" v-on:selectedRequisition="selectRequisition"></SideBar>

            <!-- Page Content Holder -->
            <div v-if="selectedRequisition" id="content" class="container-fluid">
                <div class="row">
                    <div class="col-6">
                        <Requisition v-model="selectedRequisition" v-on:sendClick="sendClick"></Requisition>
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

    </div>
</template>

<script lang="ts">
    import {EnqueuerClient} from '../enqueuer/enqueuer-client';
    import * as Requisition from './requisition/Requisition';
    import {RequisitionModel} from "../enqueuer/models/outputs/requisition-model";
    import {TestsAnalyzer} from "../enqueuer/tests-analyzer";
    import * as SideBar from './SideBar';

    export default {
        name: 'App',
        components: {
            SideBar,
            Requisition
        },
        data() {
            return {
                selectedRequisition: null,
                requisitions: [],
                enqueuerResponse: '',
                resultMessage: null
            };
        },
        methods: {
            selectRequisition: function (requisition) {
                console.log(JSON.stringify(requisition));
                this.selectedRequisition = requisition;
            },
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
                    this.resultMessage = `${enqueuerResponse.name}: ${passingTestsNumber}/${testsNumber} - (${percentage}%) - ${enqueuerResponse.time.totalTime}ms`;

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
    .btn-subscription {
        color: #ffffff;
        background-color: transparent;
        border-color: #3aae6f;
    }

    .btn-publisher {
        color: #ffffff;
        background-color: transparent;
        border-color: #ae3a6f;
    }

    .http {
        text-transform: uppercase;
        color: #ffffff;
        background-color: #271d94;
        padding-right: 0.6em;
        padding-left: 0.6em;
        border-radius: 10rem;
    }

    .amqp {
        text-transform: uppercase;
        color: #ffffff;
        background-color: #1d9427;
    }

    .mqtt {
        text-transform: uppercase;
        color: #ffffff;
        background-color: #943282;
    }

</style>
