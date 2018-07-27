<template>
    <div >
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

            <p>
                <label>OnMessageReceived</label><br/>
                <textarea name="onMessageReceived" rows="4" cols="50" v-model="onMessageReceived"></textarea>
            </p>

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

    export default {
        name: 'EnqueuerInput',
        mounted() {
            this.$emit("input", JSON.parse(JSON.stringify(this.$data)));
        },
        data() {
            return {
                    type: "http-client",
                    name: "",
                    url: "https://github.com/lopidio/enqueuer",
                    onMessageReceived: 'test[\'It is online\'] = JSON.parse(message).statusCode == 200',
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
