<template>
    <div id="main">
        <p>
            <button type="button" name="send" v-on:click="sendClick" class="btn btn-success">Send</button>
        </p>
        <Requisition v-model="requisition" ></Requisition>

        <!--<fieldset>-->
            <legend>Response</legend>
            <pre>{{this.enqueuerResponse}}</pre>
            <textarea name="response" rows="40" cols="100"  v-model="enqueueResponse"></textarea>
        <!--</fieldset>-->
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
                        delete response.requisitions[0].publishers[0].messageReceived;
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
