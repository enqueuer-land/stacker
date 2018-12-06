<template>
    <div class="mqtt-subscription container-fluid px-4">
        <div class="row">
            <common-subscription :timeout.sync="mqtt.timeout" :avoid.sync="mqtt.avoid"></common-subscription>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Broker
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2">
                <input v-model="mqtt.brokerAddress" type="text" class="form-control stacker-label"
                       placeholder="mqtt://localhost"
                       style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)">
            </div>
        </div>
        <key-value-input v-model="mqtt.options" title="Connection Options"/>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Topic
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2">
                <input v-model="mqtt.topic" type="text" class="form-control" id="mqttSubscriptionTopic"
                       style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)">
            </div>
        </div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import ObjectFormatter from "../../inputs/ObjectFormatter";
    import CommonSubscription from "../../inputs/CommonSubscription";

    export default {
        name: 'MqttSubscription',
        components: {CommonSubscription, ObjectFormatter, KeyValueInput},
        props: {
            item: {},
        },
        mounted() {
            this.emit();
        },
        data: function () {
            return {
                mqtt: this.getContent(),
            }
        },
        methods: {
            getContent() {
                return {
                    type: "mqtt",
                    timeout: this.item.timeout,
                    avoid: this.item.avoid,
                    brokerAddress: this.item.brokerAddress,
                    topic: this.item.topic,
                    options: this.item.options || {},
                }
            },
            emit() {
                const input = Object.assign({}, this.mqtt, {errors: []});

                const topicElement = $('#mqttSubscriptionTopic');
                topicElement.removeClass('invalid-input');
                if (this.mqtt.topic === undefined || this.mqtt.topic.length === 0) {
                    input.errors.push('Mqtt subscription has to have a topic');
                    topicElement.addClass('invalid-input');
                }

                const brokerElement = $('#mqttSubscriptionBroker');
                brokerElement.removeClass('invalid-input');
                if (this.mqtt.brokerAddress === undefined || this.mqtt.brokerAddress.length === 0) {
                    input.errors.push('Mqtt subscription has to have a broker address');
                    brokerElement.addClass('invalid-input');
                }

                this.$emit('input', input);
            },
        },
        computed: {},
        watch: {
            item() {
                this.mqtt = this.getContent();
            },
            id() {
                this.mqtt = this.getContent();
            },
            mqtt: {
                handler() {
                    this.emit();
                },
                deep: true
            }
        },
    }
</script>

<style scoped>
    .mqtt-subscription {

    }

</style>
