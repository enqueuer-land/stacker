<template>
    <div>
        <div class="input-group mb-3">
            <label class="form-control">Assertions</label>
            <button type="button" v-on:click="addClick" class="btn btn-success">+</button>
        </div>
        <div>
            <div v-for="(assertion, index) of assertions" class="row mb-3">
                <div class="col-11">
                    <Assertion v-model="assertions[index]"/>
                </div>
                <button type="button" v-on:click="removeClick(index)" class="btn btn-danger col-1">-</button>
            </div>

        </div>
    </div>
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
