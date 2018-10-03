<template>
    <div id="enqueuer-input">
        <p>
            <label>IPC protocol</label>
            <select name="type" v-model="type">
                <!--<option value="amqp">AMQP</option>-->
                <option value="http">HTTP</option>
            </select>
        </p>
        <Http v-if="type === 'http'" v-model="http"/>
        <Amqp v-if="type === 'amqp'" v-model="amqp"/>
    </div>
</template>

<script lang="ts">
    import * as Http from "./http/Http";
    import * as Amqp from "./amqp/Amqp";
    import * as Event from "../events/Event";

    export default {
        name: 'Publisher',
        components: {
            Event,
            Http,
            Amqp,
        },
        mounted() {
            this.$emit("input", this.publisher);
        },
        data() {
            return {
                type: "http",
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
