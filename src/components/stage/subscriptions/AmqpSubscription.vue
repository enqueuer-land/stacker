<template>
    <div class="amqp-publisher container-fluid px-4">
        <div class="row">
            <common-subscription :timeout.sync="amqp.timeout" :avoid.sync="amqp.avoid"></common-subscription>
        </div>
        <key-value-input v-model="amqp.options" title="Connection Options"/>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: var(--text-color)">
                Exchange
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2">
                <input v-model="amqp.exchange" type="text" class="form-control"
                       style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)">
            </div>
        </div>

        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: var(--text-color)">
                Queue
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2">
                <input v-model="amqp.queueName" type="text" class="form-control"
                       style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)">
            </div>
        </div>

        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: var(--text-color)">
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
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: var(--text-color)">
                Message
            </div>
        </div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import ObjectFormatter from "../../inputs/ObjectFormatter";
    import CommonSubscription from "../../inputs/CommonSubscription";

    export default {
        name: 'AmqpPublisher',
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
