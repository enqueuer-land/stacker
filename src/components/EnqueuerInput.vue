<template>
    <div id="enqueuer-input">
        <fieldset >
            <legend>Input</legend>
            <p>
                <label>IPC protocol</label>
                <select name="type" v-on:change="ipcChanged">
                    <option value="http-client">HTTP</option>
                    <option value="amqp">AMQP</option>
                    <option value="mqtt">MQTT</option>
                </select>
            </p>
            {{publisher}}
            <HttpClient v-if="type == 'http-client'" v-model="publisher"/>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import * as HttpClient from "./publishers/HttpClient";

    export default {
        name: 'EnqueuerInput',
        components: {
            HttpClient
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
                type: "http-client",
                publisher: {

                }
            }
        }
    }
</script>
