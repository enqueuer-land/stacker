<template>
    <div>
        <fieldset>
            <Input v-model="input.options.host" label="Host" default="localhost" />
            <Input v-model="input.options.port" label="Port" default="5672" />
            <Input v-model="input.routingKey" label="Routing Key" default="ENQUEUER.REPORT" />
            <Payload v-model="input.payload" default=""></Payload>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import * as Payload from '../../forms/Payload';
    import * as Input from '../../forms/Input';

    export default {
        name: 'HttpClient',
        components: {
            Payload,
            Input,
        },
        mounted() {
            this.$emit("input", this.input);
        },
        data() {
            return {
                input: {
                    type: "amqp",
                    options: {}
                }
            }
        }
    }
</script>