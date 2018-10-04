<template>
    <fieldset>
        <div class="input-group">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">{{input.method}}</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="(current) of methods" v-on:click="methodSelect(current)">{{current}}</a>
                </div>
            </div>
            <input v-model="input.url" label="URL" type="text" class="form-control" aria-label="Text input with dropdown button" >
        </div>

        <br/>
        <label>Payload</label>
        <TextArea v-if="input.method !== 'GET'" v-model="input.payload" />
        <Event v-model="input.onMessageReceived" label="On Message Received"/>
        <!--<Event v-model="input.onInit" label="onInit"/>-->
        <!--<Event v-model="onFinish"/>-->
    </fieldset>
</template>

<script lang="ts">
    import * as TextArea from '../../../form/TextArea';
    import * as Input from '../../../form/Input';
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
                    method: 'POST'
                },
                methods: ['GET', 'POST', 'PUT']
            }
        },
        methods: {
            methodSelect(method) {
                this.input.method = method;
            }
        }
    }
</script>
