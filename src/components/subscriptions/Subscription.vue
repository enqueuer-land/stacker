<template>
    <div id="subscription">
        <p>
            <label>IPC protocol</label>
            <select name="type" v-on:change="ipcChanged" v-model="type">
                <option value="amqp">AMQP</option>
                <option value="http-client">HTTP</option>
            </select>
        </p>
        <Amqp v-if="type === 'amqp'" v-model="http"/>
        <Event label="On Message Received"/>
    </div>
</template>

<script lang="ts">
    import * as Amqp from "./amqp/Amqp";
    import * as Event from "../events/Event";

    export default {
        name: 'Subscription',
        components: {
            Event,
            Amqp,
        },
        mounted() {
            this.$emit("input", this.subscription);
        },
        methods: {
            ipcChanged: function(value) {
                this.type = value.target.value;
                this.subscription.type = this.type;
                console.log(value.target.value);
            }
        },
        data() {
            return {
                type: "amqp",
                amqp: {},
                http: {},
                subscription: {}
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
