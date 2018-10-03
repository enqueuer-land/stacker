<template>
    <fieldset>
        <Input v-model="input.url" label="URL" default="http://google.com" />
        <label>Method</label>
        <select v-model="input.method">
            <option value="POST">POST</option>
            <option value="GET">GET</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
        </select>
        <TextArea v-model="input.payload" default="" />
    </fieldset>
</template>

<script lang="ts">
    import * as TextArea from '../../forms/TextArea';
    import * as Input from '../../forms/Input';

    export default {
        name: 'HttpClient',
        components: {
            TextArea,
            Input
        },
        mounted() {
            this.input.method = 'GET';
            this.$emit("input", this.input);
        },
        data() {
            return {
                input: {
                    name:"anyName",
                    type: "http-client"
                }
            }
        }
    }
</script>
