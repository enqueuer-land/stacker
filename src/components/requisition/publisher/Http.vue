<template>
    <fieldset>
        <div class="input-group">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">{{init.method}}</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="(current) of methods" v-on:click="init.method=current">{{current}}</a>
                </div>
            </div>
            <input v-model="init.url" label="URL" type="text" class="form-control" aria-label="Text input with dropdown button" >
        </div>

        <br/>
        <label>Payload</label>
        <TextArea v-if="init.method !== 'GET'" v-model="init.payload" />

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
                        <Event v-model="init.onInit"/>
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
                        <Event v-model="init.onMessageReceived"/>
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
                        <Event v-model="init.onFinish"/>
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
        props: ['init'],
        data() {
            return {
                methods: ['GET', 'POST', 'PUT', 'HEAD']
            }
        }
    }
</script>
