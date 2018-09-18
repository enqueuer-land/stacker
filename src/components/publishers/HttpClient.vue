<template>
    <div>
        <fieldset>
            <HttpUrl v-model="input.url" default="http://github.com"></HttpUrl>
            <HttpMethod v-model="input.method" default="GET"></HttpMethod>
            <Payload v-model="input.payload" default=""></Payload>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import * as Payload from '../forms/Payload';
    import * as HttpUrl from '../forms/HttpUrl';
    import * as HttpMethod from '../forms/HttpMethod';

    export default {
        name: 'HttpClient',
        components: {
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
