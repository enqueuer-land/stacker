<template>
    <div id="http-client">
        <fieldset >
            <legend>Input</legend>
            <HttpUrl v-model="input.url" default="http://github.com"></HttpUrl>
            <HttpMethod v-model="input.method" default="GET"></HttpMethod>
            <Payload v-model="input.payload" default=""></Payload>
            <PrePublishing v-model="input.prePublishing" default="test['PrePublishing'] = true"></PrePublishing>
            <OnMessageReceived v-model="input.onMessageReceived" default="test['It is online'] = JSON.parse(message).statusCode == 200"></OnMessageReceived>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import * as OnMessageReceived from '../forms/OnMessageReceived';
    import * as PrePublishing from '../forms/PrePublishing';
    import * as Payload from '../forms/Payload';
    import * as HttpUrl from '../forms/HttpUrl';
    import * as HttpMethod from '../forms/HttpMethod';

    export default {
        name: 'HttpClient',
        components: {
            OnMessageReceived,
            PrePublishing,
            Payload,
            HttpMethod,
            HttpUrl
        },
        mounted() {
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
