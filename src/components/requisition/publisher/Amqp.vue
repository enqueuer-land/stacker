<template>
    <fieldset>
        <input type="text" class="form-control" v-model="input.name" placeholder="Publisher name">

        <label>Payload</label>
        <input v-model="input.option.host" label="Host" type="text" class="form-control" aria-label="Text input with dropdown button" >
        <input v-model="input.option.port" label="Port" type="text" class="form-control" aria-label="Text input with dropdown button" >
        <input v-model="input.routingKey" label="Routing Key" type="text" class="form-control" aria-label="Text input with dropdown button" >
        <TextArea v-model="input.payload" />

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
        name: 'Amqp',
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
                    type: 'amqp',
                    option: {
                        host: 'localhost',
                        port: 5672,
                    },
                    name: 'Publisher name',
                    routingKey: 'default.exchange',
                    payload: 'payload value',
                    onInit: null,
                    onFinish: null,
                },
                methods: ['GET', 'POST', 'PUT', 'HEAD']
            }
        }
    }
</script>
