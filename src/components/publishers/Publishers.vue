<template>
    <div id="enqueuer-input">
        <p>
            <label>IPC protocol</label>
            <select name="type" v-on:change="ipcChanged" v-model="type">
                <option value="amqp">AMQP</option>
                <option value="http-client">HTTP</option>
            </select>
        </p>
        <HttpClient v-if="type === 'http-client'" v-model="http"/>
        <Amqp v-if="type === 'amqp'" v-model="http"/>
        <Event label="On Message Received"/>
    </div>
</template>

<script lang="ts">
    import * as HttpClient from "./amqp/HttpClient";
    import * as Amqp from "./amqp/Amqp";
    import * as Event from "../events/Event";

    export default {
        name: 'EnqueuerInput',
        components: {
            Event,
            HttpClient,
            Amqp,
        },
        mounted() {
            this.$emit("input", this.publisher);
        },
        methods: {
            ipcChanged: function(value) {
                this.type = value.target.value;
                this.publisher.type = this.type;
                console.log(value.target.value);
            }
        },
        data() {
            return {
                type: "amqp",
                amqp: {},
                http: {},
                publisher: {}
            }
        },
        watch: {
            mqtt(val) {
                this.$emit('input', val);
            },
            http(val) {
                this.$emit('input', val);
            }
        }

    }
</script>
