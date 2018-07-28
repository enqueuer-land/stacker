<template>
    <div>
        <label>BrokerAddress</label>
        <input rows="4" cols="50" type="text" v-model="code" placeholder="mqtt://iot.eclipse.org" />
    </div>
</template>

<script lang="ts">
    export default {
        name: 'MqttBroker',
        props: ['default'],
        mounted() {
            this.code = this.default;
        },
        data() {
            return {
                code: this.value
            }
        },
        watch: {
            code(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
