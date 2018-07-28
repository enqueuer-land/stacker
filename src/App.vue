<template>
    <div id="main">
        <p>
            <input type="button" name="send" value="Send" v-on:click="sendClick" />
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
                let runnable = {
                    'runnableVersion': '01.00.00',
                    'name': 'runnableHttp',
                    'id': 'randomIdFixedInRunnable',
                    'initialDelay': 0,
                    'runnables': [
                        {
                            'timeout': 30000,
                            'name': 'HttpTitle',
                            subscriptions: [],
                            'startEvent': {
                                'publisher': this.input
                            }
                        }
                    ]
                }

                const enqueuer: EnqueuerClient = new EnqueuerClient(runnable);
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
