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
            <input v-model="input.endpoint" label="Endpoint" type="text" class="form-control" aria-label="Text input with dropdown button" >
            <input v-model="input.port" label="Port" type="text" class="form-control" aria-label="Text input with dropdown button" >
        </div>
        <div>
            <p class="h5">Response</p>
            <div class="input-group mb-3">
                <p class="h5 form-control">Status Code</p>
                <div class="input-group-append">
                    <input v-model="input.response.status" placeholder="Status Code" type="text" >
                </div>
            </div>
            <TextArea v-model="input.response.payload"/>
        </div>


        <div class="accordion" id="accordionExample">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        On Init
                        </button>
                    </h5>
                </div>
                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">
                        <Event v-model="input.onInit"/>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingTwo">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            On Message Received
                        </button>
                    </h5>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                    <div class="card-body">
                        <Event v-model="input.onMessageReceived"/>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingThree">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                            On Finish
                        </button>
                    </h5>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                    <div class="card-body">
                        <Event v-model="input.onFinish"/>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
</template>

<script lang="ts">
    import * as TextArea from '../../form/TextArea';
    import * as Input from '../../form/Input';
    import * as Event from '../event/Event';

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
                    endpoint: '/stacker',
                    port: 22222,
                    timeout: 1000,
                    response: {
                        status: 200,
                        payload: 'response'
                    },
                    onInit: null,
                    onMessageReceived: null,
                    onFinish: null,
                    method: 'POST'
                },
                methods: ['GET', 'POST', 'PUT', 'HEAD']
            }
        },
        methods: {
            methodSelect(method) {
                this.input.method = method;
            }
        }
    }
</script>
