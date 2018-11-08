<template>
    <div class="assertions container-fluid">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Assertions
            </div>
        </div>
        <div v-for="(_, index) in assertions" :key="index" class="row no-gutter">
            <assertion v-model="assertions[index]" class="col pr-0"/>
            <div class="col-1">
                <a href="#" style="color: white">
                    <i @click="removeAssertion(index)" class="material-icons"
                       style="transform: scale(0.75)">highlight_off</i>
                </a>
            </div>
        </div>
        <div class="row px-2">
            <button type="button" :class="['btn btn-block btn-sm col']"
                    style="background-color: white; color: var(--stacker-background-color); border-color: white"
                    @click="addAssertion">Add
            </button>
        </div>
    </div>
</template>

<script>

    import Assertion from "./Assertion";
    export default {
        name: 'Assertions',
        components: {Assertion},
        data: function () {
            return {
                assertions: [],
            }
        },
        methods: {
            addAssertion: function () {
                this.assertions.push({})
            },
            removeAssertion: function (indexToRemove) {
                this.assertions = this.assertions.filter((assertion, index) => index !== indexToRemove);
            }
        }
    }
</script>

<style scoped>
    .assertions {

    }

</style>
