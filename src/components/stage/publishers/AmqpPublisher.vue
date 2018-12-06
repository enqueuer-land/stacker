<template>
    <div class="amqp-publisher container-fluid px-4">
        <key-value-input v-model="amqp.options" title="Connection Options"/>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Exchange
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2">
                <input v-model="amqp.exchange" type="text" class="form-control"
                       style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)">
            </div>
        </div>
        <key-value-input v-model="amqp.exchangeOptions" title="Exchange Options"/>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Routing Key
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <input v-model="amqp.routingKey" id="amqpPublisherRoutingKey"
                       type="text" class="form-control"
                       style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)">
            </div>
        </div>
        <key-value-input v-model="amqp.messageOptions.headers" title="Message Headers"/>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Message
            </div>
        </div>
        <div class="row">
            <object-formatter class="mb-1 ml-2 mr-2" :text.sync="amqp.payload" :format.sync="amqp.format"/>
        </div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import ObjectFormatter from "../../inputs/ObjectFormatter";

    export default {
        name: 'AmqpPublisher',
        components: {ObjectFormatter, KeyValueInput},
        props: {
            item: {},
        },
        mounted() {
            this.emit();
        },
        data: function () {
            return {
                amqp: this.getContent(),
            }
        },
        methods: {
            getContent() {
                return {
                    type: "amqp",
                    exchange: this.item.exchange,
                    routingKey: this.item.routingKey,
                    exchangeOptions: this.item.exchangeOptions || {},
                    messageOptions: this.item.messageOptions || {headers: {}},
                    options: this.item.options || {host: '', port: ''},
                    payload: this.item.payload,
                    format: this.item.format,
                }
            },
            emit() {
                const input = Object.assign({}, this.amqp);

                const valid = (this.amqp.routingKey !== undefined && this.amqp.routingKey.length > 0);
                if (!valid) {
                    input.errors = ['Amqp publisher routing key cannot be empty']
                }
                const item = $('#amqpPublisherRoutingKey');
                if (!valid) {
                    item.addClass('invalid-input');
                } else {
                    item.removeClass('invalid-input');
                }

                this.$emit('input', input);
            },
        },
        computed: {},
        watch: {
            item() {
                this.amqp = this.getContent();
            },
            id() {
                this.amqp = this.getContent();
            },
            amqp: {
                handler() {
                    this.emit();
                },
                deep: true
            }
        },
    }
</script>

<style scoped>
    .amqp-publisher {

    }

</style>
