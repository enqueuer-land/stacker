<template>
    <div class="container row">

        <div class="col-3">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Requisition #0</a>
                <a class="nav-link disabled" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Requisition #1</a>
                <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Requisition #2</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Requisition #3</a>
            </div>
        </div>


        <div class="col-9">
            <button type="button" name="send" v-on:click="sendClick" class="btn btn-success">Send</button>
            <div id="main" class="row">
                <Requisition class="col-6" v-model="requisition" ></Requisition>

                <fieldset class="col-6">
                    <legend>Response</legend>
                    <pre><code>{{this.enqueuerResponse}}</code></pre>
                    <textarea name="response" rows="40" cols="100"  v-model="enqueueResponse"></textarea>
                </fieldset>
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
                enqueueResponse: null,
                requisition: null
            }
        },
        methods: {
            sendClick: function (this) {
                this.enqueueResponse = '';
                console.log(`Requisition: ${JSON.stringify(this.requisition)}`);

                const enqueuer: EnqueuerClient = new EnqueuerClient(this.requisition);
                enqueuer.on('response', (response: RequisitionModel) => {
                        // delete response.requisitions[0].publishers[0].messageReceived;
                        this.enqueueResponse = JSON.stringify(response, null, 4);
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
    .hello {
        padding-top: 75px;
    }
</style>
