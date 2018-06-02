<template>
    <div id="main">
        <p>HTTP</p>

        <EnqueuerInput></EnqueuerInput>
        <EnqueuerOutput></EnqueuerOutput>

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
    import * as EnqueuerOutput from './components/EnqueuerOutput.vue';

    let runnable: RunnableModel = {
                    'runnableVersion': '01.00.00',
                    'name': 'runnableHttp',
                    'id': 'randomIdFixedInRunnable',
                    'initialDelay': 0,
                    'runnables': [
                        {
                            'timeout': 30000,
                            'name': 'HttpTitle',
                            'subscriptions': [
                                {
                                    'type': 'http-server',
                                    'name': 'HttpSubscriptionTitle',
                                    'endpoint': '/enqueuer',
                                    'port': 23075,
                                    'method': 'POST',
                                    'response': {
                                        'status': 200
                                    },
                                    'timeout': 10000
                                }
                            ],
                            'startEvent': {
                                'publisher': {
                                    'type': 'http-client',
                                    'name': 'HttpPublisherClientTitle',
                                    'url': 'http://localhost:23075/enqueuer',
                                    'method': 'POST',
                                    'payload': {
                                        'enqueuer': 'virgs'
                                    },
                                    'headers': {
                                        'content-type': 'application/json'
                                    }
                                }
                            }
                        }
                    ]
                };

    export default {
        name: 'App',
        components: {
            EnqueuerInput,
            EnqueuerOutput
        },
        data() {
            return {
                enqueueResponse: null
            }
        },
        methods: {
            callEnqueuer: function (this) {
                const enqueuer = new EnqueuerClient(runnable);
                enqueuer.on('response', (response: ResultModel) => {
                        this.enqueueResponse = JSON.stringify(response, null, 4);
                        console.log(`response: ${JSON.stringify(response, null, 4)}`)
                    });
                enqueuer.on('exit', (response: number) => console.log(`exit: ${response}`));
                enqueuer.on('error', (response: Error) => console.error(`error: ${response}`));
                enqueuer.on('log', (response: Error) => console.log(`error: ${response}`));
                enqueuer.send();
            }
        }
    }
</script>

<style lang="css" scoped>
    .hello {
        padding-top: 75px;
    }
</style>
