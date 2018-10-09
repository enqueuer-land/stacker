<template>
    <fieldset id="enqueuer-input">
        <div class="input-group">
            <div>
                <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{type}}</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="protocol of protocols" v-on:click="type=protocol">{{protocol}}</a>
                </div>
            </div>
            <p class="h3 input-group-append">Protocol</p>
        </div>


        <Http v-if="type === 'HTTP'" v-model="http"/>
        <Amqp v-if="type === 'AMQP'" v-model="amqp"/>
    </fieldset>
</template>

<script lang="ts">
    import * as Http from './Http';
    import * as Amqp from './Amqp';

    export default {
        name: 'Publisher',
        components: {
            Http,
            Amqp
        },
        mounted() {
            this.$emit("input", this.subscription);
        },
        data() {
            return {
                type: "HTTP",
                amqp: {},
                http: {},
                subscription: {},
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
