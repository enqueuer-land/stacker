<template>
    <div class="assertions container-fluid">
        <div class="row">
            <div class="pl-2 pt-2 pb-1" style="font-size: 0.8em; color: var(--text-color)">
                Assertions
            </div>
        </div>
        <div v-for="(_, index) in assertions" :key="ids[index]" class="row px-2">
            <assertion v-model="assertions[index]" class="col px-2 mb-2 pb-1"/>
            <div class="col-1 px-0 mb-2">
                <div style="height: 100%; width: 100%; background-color: var(--stacker-background-alternative-color);">
                    <a href="#" style="color: var(--text-color); position: relative; top: calc(50% - 12px); left: calc(50% - 12px);" id="removeIcon">
                        <i @click="removeAssertion(index)" class="material-icons"
                           style="">highlight_off</i>
                    </a>
                </div>
            </div>
        </div>
        <div class="row px-2">
            <button type="button" :class="['btn btn-block btn-sm col']" id="addButton"
                    @click="addAssertion">Add
            </button>
        </div>
    </div>
</template>

<script>

    import Assertion from "./Assertion";
    import {generateId} from "../../tests/id-generator";

    export default {
        name: 'Assertions',
        components: {Assertion},
        props: {
            value: {}
        },
        data: function () {
            return {
                ids: (this.value || []).map(() => generateId()),
                assertions: this.value || [],
            }
        },
        methods: {
            addAssertion: function () {
                this.ids.push(generateId());
                this.assertions.push({})
            },
            removeAssertion: function (indexToRemove) {
                this.ids = this.ids.splice(indexToRemove, 1);
                this.assertions = this.assertions.filter((assertion, index) => index !== indexToRemove);
            }
        },
        watch: {
            assertions: function () {
                this.$emit('input', this.assertions);
            },
            value: function () {
                if (this.value !== this.assertions) {
                    this.assertions = [];
                    (this.value || []).forEach((item) => {
                        this.ids.push(generateId());
                        this.assertions.push(item);
                    });
                }
            },
        }
    }
</script>

<style scoped>
    .assertions {

    }

    #removeIcon :hover {
        color: var(--text-smooth-color);
    }

    #addButton {
        background-color: transparent;
        color: var(--text-color);
        border-color: var(--text-color);
    }

    #addButton:focus, #addButton.focus {
        outline: 0;
        box-shadow: 0 0 15px var(--text-smooth-color);
    }

</style>
