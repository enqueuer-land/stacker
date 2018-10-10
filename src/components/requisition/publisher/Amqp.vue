<template>
    <fieldset>
        <label>Payload</label>
        <input v-model="this.option.host" label="Host" type="text" class="form-control" aria-label="Text input with dropdown button" >
        <input v-model="this.option.port" label="Port" type="text" class="form-control" aria-label="Text input with dropdown button" >
        <input v-model="init.routingKey" label="Routing Key" type="text" class="form-control" aria-label="Text input with dropdown button" >
        <TextArea v-model="init.payload" />
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
        props: ['init'],
        data: function () {
            return {
                option: {
                    host: 'localhost',
                    port: 5672
                }
            }
        }
    }
</script>
