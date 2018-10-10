<template>
    <fieldset id="enqueuer-input">
        <div class="input-group">
            <p class="h3 input-group">Subscription</p>
            <input type="text" class="form-control" v-model="init.name" placeholder="Subscription name">

            <div>
                <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{init.type.toUpperCase()}}</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="protocol of protocols" v-on:click="init.type=protocol">{{protocol}}</a>
                </div>
            </div>
            <p class="h3 input-group-append">Protocol</p>
        </div>

        <Http v-if="init.type.toUpperCase() === 'HTTP'" v-model="http"/>
        <Amqp v-if="init.type.toUpperCase() === 'AMQP'" v-model="amqp"/>

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
    import * as Http from './Http';
    import * as Amqp from './Amqp';
    import * as Event from '../event/Event';

    export default {
        name: 'Publisher',
        components: {
            Http,
            Amqp,
            Event
        },
        props: ['init'],
        data() {
            return {
                amqp: {},
                http: {},
                protocols: ['HTTP', 'AMQP']
            };
        },
        watch: {
            amqp(val) {
                this.$emit('input', val);
            },
            http(val) {
                this.$emit('input', val);
            }
        }

    };
</script>
