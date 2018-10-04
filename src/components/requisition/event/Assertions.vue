<template>
    <span class="border-1">
        <button type="button" v-on:click="addClick" class="btn btn-success">+</button>
        <div v-for="(assertion, index) of assertions">
            <Assertion v-model="assertions[index]" :init="assertion" />
            <button type="button" v-on:click="removeClick(index)" class="btn btn-danger">-</button>
        </div>
    </span>
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
                    }]
            };
        },
        watch: {
            assertions() {
                this.$emit("input", this.assertions);
            }
        },
        methods: {
            addClick: function (this) {
                this.assertions.push(
                    {
                        expect: 'request.uri.port',
                        toBeEqualTo: 80
                    });
            },
            removeClick: function (index) {
                this.assertions.splice(index, 1);
            }
        }

    };
</script>
