<template>
    <fieldset>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Host Address</span>
            </div>
            <input type="text" class="form-control" placeholder="Host Address" v-model="option.host">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Host Port</span>
            </div>
            <input type="text" class="form-control" placeholder="Host Port" v-model="option.port">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Exchange</span>
            </div>
            <input type="text" class="form-control" placeholder="Exchange" v-model="exchange">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Routing Key</span>
            </div>
            <input type="text" class="form-control" placeholder="Routing Key" v-model="routingKey">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Queue Name</span>
            </div>
            <input type="text" class="form-control" placeholder="Queue Name" v-model="queueName">
        </div>
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
        data() {
            return {
                    type: 'amqp',
                    option: {
                        host: 'localhost',
                        port: 5672,
                    },
                    queueName: 'queue',
                    exchange: 'exchange',
                    routingKey: 'routingKey'
            }
        }
    }
</script>
