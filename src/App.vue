<template>
    <div id="main">
        <p>
            <button type="button" name="send" v-on:click="sendClick" class="btn btn-success">Send</button>
        </p>
        <Publisher v-model="publisher" ></Publisher>
        <Subscription v-model="subscription" ></Subscription>
        <!--<pre>{{input}}</pre>-->

        <!--<fieldset>-->
            <legend>Response</legend>
            <pre>{{this.enqueuerResponse}}</pre>
            <textarea name="response" rows="40" cols="50"  v-model="enqueueResponse"></textarea>
        <!--</fieldset>-->
    </div>
</template>

<script lang="ts">
    import { EnqueuerClient } from './enqueuer/enqueuer-client';
    import * as Publisher from './components/publishers/Publisher.vue';
    import {RequisitionModel} from "./enqueuer/models/outputs/requisition-model";
    import * as Subscription from "./components/subscriptions/Subscription";

    export default {
        name: 'App',
        components: {
            Subscription,
            Publisher
        },
        data() {
            return {
                enqueueResponse: null,
                subscription: null,
                publisher: null
            }
        },
        methods: {
            sendClick: function (this) {
                console.log(`publisher: ${JSON.stringify(this.publisher)}`)
                console.log(`subscription: ${JSON.stringify(this.subscription)}`)
                let requisition = {
                    'timeout': 30000,
                    'name': 'HttpTitle',
                    subscriptions: [this.subscription],
                    publishers: [this.publisher]
                }

                const enqueuer: EnqueuerClient = new EnqueuerClient(requisition);
                enqueuer.on('response', (response: RequisitionModel) => {
                        delete response.requisitions[0].publishers[0].messageReceived;
                        this.enqueueResponse = JSON.stringify(response, null, 4);
                    });
                enqueuer.on('exit', (response: number) => console.log(`exit: ${response}`));
                enqueuer.on('error', (response: Error) => console.error(`error: ${response}`));
//                enqueuer.on('log', (response: Error) => console.log(`log: ${response}`));
                enqueuer.send().then((success) => {
                    // console.log(`Sending result: ${success}`)
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
