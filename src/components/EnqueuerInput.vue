<template>
    <div id="enqueuer-input">
        <p>
            <label>IPC protocol</label>
            <select name="type" v-on:change="ipcChanged" v-model="type">
                <option value="amqp">AMQP</option>
                <option value="mqtt">MQTT</option>
                <option value="http-client">HTTP</option>
            </select>
        </p>
        <HttpClient v-if="type === 'http-client'" v-model="http"/>
        <Mqtt v-if="type === 'mqtt'" v-model="mqtt"/>
    </div>
</template>

<script lang="ts">
    import * as HttpClient from "./publishers/HttpClient";
    import * as Mqtt from "./publishers/Mqtt";

    export default {
        name: 'EnqueuerInput',
        components: {
            HttpClient,
            Mqtt,
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
                type: "mqtt",
                mqtt: {},
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
