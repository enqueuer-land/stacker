<template>
    <fieldset>
        <Input v-model="input.options.host" label="Host" default="localhost" />
        <Input v-model="input.options.port" label="Port" default="5672" />
        <Input v-model="input.routingKey" label="Routing Key" default="enqueuer.default.exchange" />
        <TextArea v-model="input.payload" default=""></TextArea>
    </fieldset>
</template>

<script lang="ts">
    import * as TextArea from '../../../form/TextArea';
    import * as Input from '../../../form/Input';

    export default {
        name: 'Amqp',
        components: {
            TextArea,
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