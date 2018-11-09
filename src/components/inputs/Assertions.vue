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
                <a href="#" style="color: white" id="removeIcon">
                    <i @click="removeAssertion(index)" class="material-icons"
                       style="transform: scale(0.75)">highlight_off</i>
                </a>
            </div>
        </div>
        <div class="row px-2">
                    <!--style="background-color: white; color: var(&#45;&#45;stacker-background-color); border-color: white"-->
            <button type="button" :class="['btn btn-block btn-sm col']" id="addButton"
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
        props: {
            value: {}
        },
        data: function () {
            return {
                assertions: this.value || [],
            }
        },
        methods: {
            addAssertion: function () {
                this.assertions.push({})
            },
            removeAssertion: function (indexToRemove) {
                this.assertions = this.assertions.filter((assertion, index) => index !== indexToRemove);
            }
        },
        watch: {
            assertions: function() {
                this.$emit('input', this.assertions);
            },
        }
    }
</script>

<style scoped>
    .assertions {

    }

    #removeIcon :hover {
        color: var(--index-color);
    }

    #addButton :hover {
        /*border: 2px solid var(--index-color);*/
    }

</style>
