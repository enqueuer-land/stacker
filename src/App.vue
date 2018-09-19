<template>
    <div id="main">
        <p>
            <button type="button" name="send" v-on:click="sendClick" class="btn btn-success">Send</button>
        </p>
        <EnqueuerInput v-model="input" ></EnqueuerInput>
        <pre>{{input}}</pre>

        <!--<fieldset>-->
            <legend>Response</legend>
            <pre>{{this.enqueuerResponse}}</pre>
            <textarea name="response" rows="40" cols="50"  v-model="enqueueResponse"></textarea>
        <!--</fieldset>-->
    </div>
</template>

<script lang="ts">
    import { EnqueuerClient } from './enqueuer/enqueuer-client';
    import { ResultModel } from './enqueuer/models/outputs/result-model';
    import * as EnqueuerInput from './components/EnqueuerInput.vue';
    import {RequisitionModel} from "./enqueuer/models/outputs/requisition-model";

    export default {
        name: 'App',
        components: {
            EnqueuerInput
        },
        data() {
            return {
                enqueueResponse: null,
                input: null
            }
        },
        methods: {
            sendClick: function (this) {
                this.input.payload = "";
                this.input.name = "fixed";
                console.log(`input: ${JSON.stringify(this.input)}`)
                let requisition = {
                    'timeout': 30000,
                    'name': 'HttpTitle',
                    subscriptions: [],
                    'startEvent': {
                        'publisher': this.input
                    }
                }

                const enqueuer: EnqueuerClient = new EnqueuerClient(requisition);
                enqueuer.on('response', (response: RequisitionModel) => {
                        delete response.requisitions[0].startEvent.publisher.messageReceived;
                        this.enqueueResponse = JSON.stringify(response, null, 4);
//                        console.log(`response: ${JSON.stringify(response, null, 4)}`)
                    });
                enqueuer.on('exit', (response: number) => console.log(`exit: ${response}`));
                enqueuer.on('error', (response: Error) => console.error(`error: ${response}`));
                enqueuer.on('log', (response: Error) => console.log(`error: ${response}`));
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
