<template>
    <fieldset>
        <Input v-model="input.url" label="URL" />
        <label>Method</label>
        <select v-model="input.method">
            <option value="POST">POST</option>
            <option value="GET">GET</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
        </select>
        <TextArea v-if="input.method !== 'GET'" v-model="input.payload" />
        <Event v-model="input.onInit"/>
        <!--<Event v-model="onMessageReceived"/>-->
        <!--<Event v-model="onFinish"/>-->
    </fieldset>
</template>

<script lang="ts">
    import * as TextArea from '../../forms/TextArea';
    import * as Input from '../../forms/Input';
    import * as Event from '../../events/Event';

    export default {
        name: 'HttpClient',
        components: {
            Event,
            TextArea,
            Input
        },
        mounted() {
            // this.input.method = 'GET';
            this.$emit("input", this.input);
        },
        data() {
            return {
                input: {
                    type: 'http',
                    url: '',
                    payload: 'payload value',
                    onInit: {},
                    onMessageReceived: null,
                    onFinish: null,
                    method: 'POST'
                }
            }
        }
    }
</script>
