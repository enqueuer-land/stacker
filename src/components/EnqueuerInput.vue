<template>
    <div id="enqueuer-input">
        <fieldset >
            <legend>Input</legend>
            <label>Name</label><input type="text" name="input-name" v-model="input.name"/> <br/>
            <p>
                <label>IPC protocol</label>
                <select name="type" v-model="input.type">
                    <option value="http-client">HTTP</option>
                    <option value="amqp">AMQP</option>
                    <option value="mqtt">MQTT</option>
                </select>
            </p>
            <p v-if="input.type == 'http-client'">
                <label>URL</label><input type="text" name="url" v-model="input.url"/>
                <label>Method</label>
                <select name="method" v-model="input.method" >
                    <option value="post">POST</option>
                    <option value="get">GET</option>
                    <option value="put">PUT</option>
                </select>
            </p>
            <p>
                <label>Pre-Publishing</label><br/>
                <textarea name="prePublishing" rows="4" cols="50" v-model="input.prePublishing" ></textarea>
            </p>

            <OnMessageReceived v-model="input.onMessageReceived" default="test['It is online'] = JSON.parse(message).statusCode == 200"></OnMessageReceived>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import {PublisherModel} from "../enqueuer/models/inputs/publisher-model";
    import * as OnMessageReceived from './forms/OnMessageReceived';

    export default {
        name: 'EnqueuerInput',
        components: {
            OnMessageReceived
        },
        mounted() {
            this.$emit("input", this.input);
        },
        data() {
            return {
                input: {}
            }
        }
    }
</script>
