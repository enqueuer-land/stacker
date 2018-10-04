<template>
    <fieldset id="enqueuer-input">
        <div class="input-group">
            <div class="input-group-append">
                <label>Protocol</label>
                <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">{{type}}</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="protocol of protocols" v-on:click="type=protocol">{{protocol}}</a>
                </div>
            </div>
        </div>


        <Http v-if="type === 'HTTP'" v-model="http"/>
        <!--<Amqp v-if="type === 'AMQP'" v-model="amqp"/>-->
    </fieldset>
</template>

<script lang="ts">
    import * as Http from './http/Http';
    export default {
        name: 'Publisher',
        components: {
            Http
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
            mqtt(val) {
                this.$emit('input', val);
            },
            http(val) {
                this.$emit('input', val);
            }
        }

    };
</script>
