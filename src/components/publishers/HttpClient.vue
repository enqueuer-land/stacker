<template>
    <div id="http-client">
        <fieldset >
            <legend>Input</legend>
                <label>URL</label><input type="text" v-model="input.url"/>
                <label>Method</label>
                <select v-model="input.method" >
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                </select>
            <p>
                <label>Pre-Publishing</label><br/>
                <textarea rows="4" cols="50" v-model="input.prePublishing" ></textarea>
            </p>

            <p>
                <label>Payload</label><br/>
                <textarea rows="4" cols="50" v-model="input.payload"></textarea>
            </p>

            <OnMessageReceived v-model="input.onMessageReceived" default="test['It is online'] = JSON.parse(message).statusCode == 200"></OnMessageReceived>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import * as OnMessageReceived from '../forms/OnMessageReceived';

    export default {
        name: 'HttpClient',
        components: {
            OnMessageReceived
        },
        mounted() {
            this.$emit("input", this.input);
        },
        data() {
            return {
                input: {
                    name:"anyName",
                    payload:"",
                    method: "GET",
                    url: "http://github.com",
                    type: "http-client"
                }
            }
        }
    }
</script>
