<template>
    <fieldset id="enqueuer-input">
        <div class="input-group">
            <p class="h3 input-group">Publisher</p>
            <input type="text" class="form-control" v-model="init.name" placeholder="Publisher name">

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
    </fieldset>
</template>

<script lang="ts">
    import * as Http from "./Http";
    import * as Amqp from "./Amqp";

    export default {
        name: 'Publisher',
        components: {
            Http,
            Amqp,
        },
        props: ['init'],
        mounted() {
            console.log(`Publisher mounted: ${JSON.stringify(this.init)}`)
        },
        data() {
            return {
                // type: "HTTP",
                amqp: {},
                http: {},
                publisher: {},
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
