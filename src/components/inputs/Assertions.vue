<template>
    <div class="assertions container-fluid">
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Assertions
            </div>
        </div>
        <div v-for="(_, index) in assertions" :key="ids[index]" class="row px-2">
            <assertion v-model="assertions[index]" class="col px-2 mb-2 pb-1"/>
            <div class="col-md-auto px-0 mb-2">
                <div class="x-button pr-2">
                    <a href="#"
                       style="color: var(--text-color); position: relative; top: calc(50% - 12px); left: calc(50% - 12px);"
                       id="removeIcon">
                        <i @click="removeAssertion(index)" class="material-icons"
                           style="">highlight_off</i>
                    </a>
                </div>
            </div>
        </div>
        <div class="row px-2">
            <button type="button" :class="['btn btn-block btn-sm col']" id="addButton"
                    :style="addButtonStyle"
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
                if (this.canAddAssertion()) {
                    this.ids.push(generateId());
                    this.assertions.push({
                        name: `Assertion #${this.assertions.length}`,
                        expect: ''
                    })
                }
            },
            removeAssertion: function (indexToRemove) {
                this.ids = this.ids.splice(indexToRemove, 1);
                this.assertions = this.assertions.filter((assertion, index) => index !== indexToRemove);
            },
            canAddAssertion: function () {
                return this.assertions.every(assertion => Object.keys(assertion).every(key => assertion[key].length > 0));
            },
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
        },
        computed: {
            addButtonStyle() {
                if (this.canAddAssertion()) {
                    return {
                        'background-color': 'transparent',
                        color: 'var(--text-color)',
                        'border-color': 'var(--text-smooth-color)',
                    }
                }
                return {
                    'background-color': 'var(--stacker-header-background-color)',
                    color: 'var(--stacker-background-alternative-color)',
                    'border-color': 'var(--stacker-background-alternative-color)',
                }
            }
        }
    }
</script>

<style scoped>
    .assertions {

    }

    #removeIcon :hover {
        color: var(--text-smooth-color);
    }

    #addButton:focus, #addButton.focus {
        outline: 0;
        box-shadow: 0 0 15px var(--text-smooth-color);
    }

    .x-button {
        height: 100%;
        width: 100%;
        background-color: var(--stacker-header-background-color);
        border-right: 1px solid var(--stacker-background-alternative-color);
        border-top: 1px solid var(--stacker-background-alternative-color);
        border-bottom: 1px solid var(--stacker-background-alternative-color);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
</style>
