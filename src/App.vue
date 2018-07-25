<template>
    <div id="main">
        <p>HTTP</p>

        <EnqueuerInput v-model="runnable.runnables[0].startEvent.publisher" ></EnqueuerInput>
        <!--<EnqueuerInput v-on:onChange="inputChanged" v-model="runnable.runnables[0].startEvent.publisher" ></EnqueuerInput>-->
        {{runnable.runnables[0].startEvent.publisher}}
        <p>
            <input type="button" name="send" value="Send" v-on:click="callEnqueuer" />
        </p>

        <fieldset>
            <legend>Response</legend>
            <textarea name="response" rows="40" cols="50"  v-model="enqueueResponse"></textarea>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import { EnqueuerClient } from './enqueuer/enqueuer-client';
    import { RequisitionModel } from './enqueuer/models/inputs/requisition-model';
    import { RunnableModel } from './enqueuer/models/inputs/runnable-model';
    import { ResultModel } from './enqueuer/models/outputs/result-model';
    import * as EnqueuerInput from './components/EnqueuerInput.vue';
    import {PublisherModel} from "./enqueuer/models/inputs/publisher-model";

    export default {
        name: 'App',
        components: {
            EnqueuerInput
        },
        data() {
            return {
                enqueueResponse: null,
                runnable: {
                    'runnableVersion': '01.00.00',
                    'name': 'runnableHttp',
                    'id': 'randomIdFixedInRunnable',
                    'initialDelay': 0,
                    'runnables': [
                        {
                            'timeout': 30000,
                            'name': 'HttpTitle',
                            'subscriptions': [],
                            'startEvent': {
                                'publisher': {

                                }
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            callEnqueuer: function (this) {
                console.log('callEnqueuer')
                const enqueuer: EnqueuerClient = new EnqueuerClient(this.runnable);
                enqueuer.on('response', (response: ResultModel) => {
                        this.enqueueResponse = JSON.stringify(response, null, 4);
                        console.log(`response: ${JSON.stringify(response, null, 4)}`)
                    });
                enqueuer.on('exit', (response: number) => console.log(`exit: ${response}`));
                enqueuer.on('error', (response: Error) => console.error(`error: ${response}`));
                enqueuer.on('log', (response: Error) => console.log(`error: ${response}`));
                enqueuer.send();
            },
            inputChanged: function (input: PublisherModel) {
                let requisitionModel = this.runnable.runnables[0] as RequisitionModel;
                requisitionModel.startEvent.publisher = input;
                console.log(input)
            }
        }
    }
</script>

<style lang="css" scoped>
    .hello {
        padding-top: 75px;
    }
</style>
