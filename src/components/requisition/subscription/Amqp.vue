<template>
    <fieldset>
        <input v-model="input.option.host" label="Host" type="text" class="form-control" aria-label="Text input with dropdown button" >
        <input v-model="input.option.port" label="Port" type="text" class="form-control" aria-label="Text input with dropdown button" >
        <input v-model="input.queueName" label="Routing Key" type="text" class="form-control" aria-label="Text input with dropdown button" >

    </fieldset>
</template>

<script lang="ts">
    import * as TextArea from '../../form/TextArea';
    import * as Input from '../../form/Input';

    export default {
        name: 'Amqp',
        components: {
            TextArea,
            Input
        },
        mounted() {
            this.$emit("input", this.input);
        },
        data() {
            return {
                input: {
                    type: 'amqp',
                    option: {
                        host: 'localhost',
                        port: 5672,
                    },
                    queueName: 'default.exchange',
                    onInit: null,
                    onMessageReceived: null,
                    onFinish: null,
                },
                methods: ['GET', 'POST', 'PUT', 'HEAD']
            }
        }
    }
</script>
