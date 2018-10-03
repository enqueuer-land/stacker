<template>
    <fieldset>
        <Input v-model="input.url" label="URL" :default="input.url"/>
        <label>Method</label>
        <select v-model="input.method">
            <option value="POST">POST</option>
            <option value="GET">GET</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
        </select>
        <TextArea v-if="input.method !== 'GET'" v-model="input.payload" />
        <Event v-model="input.onMessageReceived" label="On Message Received"/>
        <!--<Event v-model="input.onInit" label="onInit"/>-->
        <!--<Event v-model="onFinish"/>-->
    </fieldset>
</template>

<script lang="ts">
    import * as TextArea from '../../form/TextArea';
    import * as Input from '../../form/Input';
    import * as Event from '../../event/Event';

    export default {
        name: 'HttpClient',
        components: {
            Event,
            TextArea,
            Input
        },
        mounted() {
            this.$emit("input", this.input);
        },
        data() {
            return {
                input: {
                    type: 'http',
                    url: 'http://google.com',
                    payload: 'payload value',
                    onInit: null,
                    onMessageReceived: null,
                    onFinish: null,
                    method: 'GET'
                }
            }
        }
    }
</script>
