<template>
    <div>
        <fieldset>
            <MqttBroker v-model="input.brokerAddress" default="mqtt://iot.eclipse.org" />
            <Payload v-model="input.payload" default=""></Payload>
            <PrePublishing v-model="input.prePublishing" default="test['PrePublishing'] = true"></PrePublishing>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import * as PrePublishing from '../forms/PrePublishing';
    import * as Payload from '../forms/Payload';
    import * as MqttBroker from '../forms/MqttBroker';

    export default {
        name: 'HttpClient',
        components: {
            PrePublishing,
            Payload,
            MqttBroker,
        },
        mounted() {
            this.$emit("input", this.input);
        },
        data() {
            return {
                input: {
                    name:"anyName",
                    type: "mqtt"
                }
            }
        }
    }
</script>
