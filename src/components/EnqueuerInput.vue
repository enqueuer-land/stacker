<template>
    <div id="enqueuer-input" v-on:change="emitChanges" >
        <fieldset>
            <legend>Input</legend>
            <label>Name</label><input type="text" name="input-name" v-model="name"/> <br/>
            <p>
                <label>IPC protocol</label>
                <select name="type" v-model="type" >
                    <option value="http-client">HTTP</option>
                    <option value="amqp">AMQP</option>
                    <option value="mqtt">MQTT</option>
                </select>
            </p>
            <label>URL</label><input type="text" name="url" v-model="url"/>
            <p>
                <label>Pre-Publishing</label><br/>
                <textarea name="prePublishing" rows="4" cols="50" v-model="prePublishing" ></textarea>
            </p>

            <OnMessageReceived v-model="onMessageReceived"></OnMessageReceived>

            <p v-if="type == 'http-client'">
                <label>Method</label>
                <select name="method" v-model="method" >
                    <option value="post">POST</option>
                    <option value="get">GET</option>
                    <option value="put">PUT</option>
                </select>
            </p>
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
            this.$emit("input", JSON.parse(JSON.stringify(this.$data)));
        },
        data() {
            return {
                    type: "http-client",
                    name: "",
                    url: "https://github.com/lopidio/enqueuer",
                    onMessageReceived: null,
                    payload: '',
                    prePublishing: '',
                    method: 'get'
            }
        },
        methods: {
            emitChanges() {
//                this.$emit("onChange", JSON.parse(JSON.stringify(this.$data)));
                this.$emit("input", JSON.parse(JSON.stringify(this.$data)));
            }
        }
    }
</script>
