<template>
    <div>
        <Assertion v-for="(assertion, index) of assertions" v-model="assertions[index]" :init="assertion"/>
    </div>
</template>

<script lang="ts">
    import * as Assertion from './Assertion';

    export default {
        name: 'Assertions',
        components: {Assertion},
        mounted() {
            this.$emit("input", this.$data);
        },
        data() {
            return {
                assertions: [
                    {
                        expect: 'statusCode',
                        toBeEqualTo: 200
                    },
                    {
                        expect: 'request.uri.port',
                        toBeEqualTo: 80
                    }]
            };
        },
        watch: {
            assertions: {
                handler(after, before) {
                    this.$emit("input", this.assertions);
                }
            }
        }
    };
</script>
