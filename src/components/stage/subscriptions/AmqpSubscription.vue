<template>
    <div class="amqp-subscription container-fluid px-4">
        <div class="row">
            <common-subscription :timeout.sync="amqp.timeout" :avoid.sync="amqp.avoid"></common-subscription>
        </div>
        <div class="row">
            <key-value-input class="col px-2" v-model="amqp.options" title="Connection Options"/>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Queue
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2">
                <input v-model="amqp.queueName" type="text" class="form-control stacker-input" id="amqpSubscriptionQueue">
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Exchange
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2">
                <input v-model="amqp.exchange" type="text" class="form-control stacker-input"  id="amqpSubscriptionExchange">
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Routing Key
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <input v-model="amqp.routingKey" id="amqpSubscriptionRoutingKey"
                       type="text" class="form-control stacker-input">
            </div>
        </div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import ObjectFormatter from "../../inputs/ObjectFormatter";
    import CommonSubscription from "../../inputs/CommonSubscription";

    export default {
        name: 'AmqpSubscription',
        components: {CommonSubscription, ObjectFormatter, KeyValueInput},
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
                    timeout: this.item.timeout,
                    avoid: this.item.avoid,
                    exchange: this.item.exchange,
                    routingKey: this.item.routingKey,
                    queueName: this.item.queueName,
                    options: this.item.options || {host: '', port: ''},
                }
            },
            emit() {
                const input = Object.assign({}, this.amqp);

                const queueIsSet = (this.amqp.queueName !== undefined && this.amqp.queueName.length > 0);
                const exchangeIsSet = (this.amqp.exchange !== undefined && this.amqp.exchange.length > 0);
                const routingKeyIsSet = (this.amqp.routingKey !== undefined && this.amqp.routingKey.length > 0);
                const valid = queueIsSet || (exchangeIsSet && routingKeyIsSet);
                if (!valid) {
                    if (exchangeIsSet) {
                        input.errors = ['Routing key cannot be empty when an exchange is set'];
                    } else if (routingKeyIsSet) {
                        input.errors = ['Exchange cannot be empty when a routing key is set'];
                    } else {
                        input.errors = ['Queue, or routing key and exchange, have to be set'];
                    }
                }

                const items = [$('#amqpSubscriptionRoutingKey'), $('#amqpSubscriptionExchange'), $('#amqpSubscriptionQueue')];
                if (!valid) {
                    items.forEach(item => item.addClass('invalid-input'));
                } else {
                    items.forEach(item => item.removeClass('invalid-input'));
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
    .amqp-subscription {

    }

</style>
