<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Requisition #0</a>
                <a class="nav-link disabled" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Requisition #1</a>
                <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Requisition #2</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Requisition #3</a>
            </div>

            <div class="col-10 row">
                <div class="col-6">
                    <Requisition v-model="requisition" v-on:sendClick="sendClick"></Requisition>
                </div>
                <div class="col-6">
                    <p class="h3 lead">Response Stacker</p>
                    <pre><code>{{this.enqueuerResponse}}</code></pre>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import { EnqueuerClient } from '../enqueuer/enqueuer-client';
    import * as Requisition from './requisition/Requisition';
    import {RequisitionModel} from "../enqueuer/models/outputs/requisition-model";

    export default {
        name: 'App',
        components: {
            Requisition
        },
        data() {
            return {
                enqueuerResponse: '',
                requisition: null
            }
        },
        methods: {
            sendClick: function (requisition)  {
                console.log(`Requisition: ${JSON.stringify(requisition)}`);

                const enqueuer: EnqueuerClient = new EnqueuerClient(requisition);
                enqueuer.on('response', (response: RequisitionModel) => {
                        // delete response.requisitions[0].publishers[0].messageReceived;
                        this.enqueuerResponse = JSON.stringify(response.requisitions[0], null, 4);
                    });
                enqueuer.on('exit', (response: number) => console.log(`exit: ${response}`));
                enqueuer.on('error', (response: Error) => console.error(`error: ${response}`));
//                enqueuer.on('log', (response: Error) => console.log(`log: ${response}`));
                enqueuer.send().then((success) => {
                    console.log(`Sending result: ${success}`)
                });
            }
        }
    }
</script>

<style lang="css" scoped>
    html {
        overflow: auto;
    }
</style>
