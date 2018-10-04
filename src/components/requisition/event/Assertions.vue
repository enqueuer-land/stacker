<template>
    <span class="border-1">
        <label>Assertions</label>

        <button type="button" v-on:click="addClick" class="btn btn-success">+</button>

            <div v-for="(assertion, index) of assertions" class="row">
                <div class="col-11" >
                    <Assertion v-model="assertions[index]" />
                </div>
                <button type="button" v-on:click="removeClick(index)" class="btn btn-danger col-1">-</button>
            </div>
    </span>
</template>

<script lang="ts">
    import * as Assertion from './Assertion';

    export default {
        name: 'Assertions',
        components: {Assertion},
        mounted() {
            this.$emit("input", this.assertions);
        },
        data() {
            return {
                assertions: []
            };
        },
        watch: {
            assertions() {
                this.$emit("input", this.assertions);
            }
        },
        methods: {
            addClick: function (this) {
                this.assertions.push({});
            },
            removeClick: function (index) {
                this.assertions.splice(index, 1);
            }
        }

    };
</script>
