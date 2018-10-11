<template>
    <div >
        <div class="input-group">

            <input type="text" class="form-control" v-model="init.name" placeholder="Publisher name">
            <div>
                <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">{{init.type.toUpperCase()}}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="protocol of protocols" v-on:click="init.type=protocol">{{protocol.toUpperCase()}}</a>
                </div>
            </div>
        </div>

        <ul id="clothing-nav" class="nav nav-tabs" role="tablist">
            <li class="nav-item"><a class="nav-link active" :href="'#' + init.type.toLowerCase() + '-tab'" role="tab" data-toggle="tab">{{init.type.toUpperCase()}}</a></li>
            <li class="nav-item"><a class="nav-link" href="#on-init-tab" role="tab" data-toggle="tab">OnInit</a></li>
            <li v-if="init.type.toUpperCase() === 'HTTP'" class="nav-item"><a class="nav-link" href="#on-message-received-tab" role="tab" data-toggle="tab">OnMessageReceived</a></li>
            <li class="nav-item"><a class="nav-link" href="#on-finish-tab" role="tab" data-toggle="tab">OnFinish</a></li>
        </ul>

        <!-- Content Panel -->
        <div id="clothing-nav-content" class="tab-content">

            <div role="tabpanel" class="tab-pane fade show active" id="http-tab">
                <Http v-if="init.type.toUpperCase() === 'HTTP'" :init="http"/>
            </div>
            <div role="tabpanel" class="tab-pane fade show active" id="amqp-tab">
                <Amqp v-if="init.type.toUpperCase() === 'AMQP'" :init="amqp"/>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="on-init-tab">
                <Event v-model="init.onInit"/>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="on-message-received-tab">
                <Event v-model="init.onMessageReceived"/>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="on-finish-tab">
                <Event v-model="init.onFinish"/>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import * as Http from "./Http";
    import * as Amqp from "./Amqp";
    import * as Event from '../event/Event';

    export default {
        name: 'Publisher',
        components: {
            Http,
            Amqp,
            Event
        },
        props: ['init'],
        mounted() {
            this.http = this.init;
            this.amqp = this.init;
        },
        data() {
            return {
                amqp: {},
                http: {},
                protocols: ['http', 'amqp']
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
