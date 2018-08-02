<template>
    <div>
        <fieldset>
            <Input v-model="input.brokerAddress" label="Address" default="mqtt://iot.eclipse.org" />
            <Input v-model="input.topic" label="Topic" default="stacker/topic/default" />
            <Payload v-model="input.payload" default=""></Payload>
            <PrePublishing v-model="input.prePublishing" default="test['PrePublishing'] = true"></PrePublishing>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import * as PrePublishing from '../forms/PrePublishing';
    import * as Payload from '../forms/Payload';
    import * as Input from '../forms/Input';

    export default {
        name: 'HttpClient',
        components: {
            PrePublishing,
            Payload,
            Input,
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
