<template>
    <div class="mqtt-publisher container-fluid px-4">
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Broker
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2" id="mqttPublisherBroker">
                <stacker-input v-model="mqtt.brokerAddress" class="form-control"
                               placeholder="mqtt://iot.eclipse.org"></stacker-input>
            </div>
        </div>
        <div class="row pt-2">
            <div class="col px-2">
                <key-value-input v-model="mqtt.options" title="Connection Options"/>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Topic
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm ml-2 mr-2" id="mqttPublisherTopic">
                <stacker-input v-model="mqtt.topic" class="form-control"></stacker-input>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Message
            </div>
        </div>
        <div class="row">
            <object-formatter class="mb-1 ml-2 mr-2" :text.sync="mqtt.payload" :format.sync="mqtt.format"/>
        </div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import ObjectFormatter from "../../inputs/ObjectFormatter";
    import StackerInput from "../../inputs/StackerInput";

    export default {
        components: {StackerInput, ObjectFormatter, KeyValueInput},
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
                    brokerAddress: this.item.brokerAddress,
                    topic: this.item.topic,
                    payload: this.item.payload,
                    options: this.item.options || {},
                }
            },
            emit() {
                const input = Object.assign({}, this.mqtt, {errors: []});

                const topicElement = $('#mqttPublisherTopic');
                topicElement.removeClass('invalid-input');
                if (this.mqtt.topic === undefined || this.mqtt.topic.length === 0) {
                    input.errors.push('Topic can not be empty');
                    topicElement.addClass('invalid-input');
                }

                const brokerElement = $('#mqttPublisherBroker');
                brokerElement.removeClass('invalid-input');
                if (this.mqtt.brokerAddress === undefined || this.mqtt.brokerAddress.length === 0) {
                    input.errors.push('Broker address can not be empty');
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

</style>
