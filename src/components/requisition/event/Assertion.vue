<template>
        <div >


                <div class="input-group">
                    <button class="btn btn-outline-secondary dropdown-toggle input-group-append" type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">{{currentExpectation}}</button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" v-for="(item) of Object.keys(available)" v-on:click="setExpectation(item)">{{item}}</a>
                    </div>
                    <input type="text" v-model="firstValue" class="form-control">
                </div>


                <div v-if="availableCriteria" class="input-group">
                    <button class="btn btn-outline-secondary dropdown-toggle input-group-append" type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">{{currentCriterium}}</button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" v-for="(item) of availableCriteria" v-on:click="setCriteria(item)">{{item}}</a>
                    </div>
                    <input type="text" v-model="secondValue" class="form-control">
                </div>



            <!--<div class="col-6 row">-->

                <!--<button class="btn btn-outline-secondary dropdown-toggle col-4" type="button" data-toggle="dropdown"-->
                        <!--aria-haspopup="true" aria-expanded="false">{{currentExpectation}}-->
                <!--</button>-->
                <!--<a class="dropdown-menu">-->
                    <!--<a class="dropdown-item" v-for="(item) of Object.keys(available)"-->
                       <!--v-on:click="setExpectation(item)">{{item}}</a>-->
                <!--</a>-->
                <!--<input class="col-8" label="value" v-model="firstValue" type="text"-->
                       <!--aria-label="Text input with dropdown button">-->

            <!--</div>-->
            <!--<div v-if="availableCriteria" class="input-group-append col-6 row">-->
                <!--<button class="btn btn-outline-secondary dropdown-toggle col-4" type="button" data-toggle="dropdown"-->
                        <!--aria-haspopup="true" aria-expanded="false">{{currentCriterium}}-->
                <!--</button>-->


                <!--<a class="dropdown-menu">-->
                    <!--<a class="dropdown-item" v-for="(item) of availableCriteria"-->
                       <!--v-on:click="setCriteria(item)">{{item}}</a>-->
                <!--</a>-->
                <!--<input class="col-8" label="value" v-model="secondValue" type="text"-->
                       <!--aria-label="Text input with dropdown button">-->
            <!--</div>-->
        </div>
</template>

<script lang="ts">
    import * as Input from '../../form/Input';

    export default {
        name: 'assertion',
        components: {
            Input
        },
        props: ['init'],
        data() {

            const available = {
                expect: ['toBeEqualTo', 'toBeGreaterThan', 'toBeGreaterThanOrEqualTo', 'toBeLessThan', 'toBeLessThanOrEqualTo', 'toContain'],
                expectToBeDefined: null,
                expectToBeUndefined: null,
                expectToBeTruthy: null,
                expectToBeFalsy: null
            };

            const firstValue = 'statusCode';
            const secondValue = 200;
            const initialValue = {};
            let currentExpectation = Object.keys(available)[0];
            initialValue[currentExpectation] = firstValue;
            let currentCriterium = available[currentExpectation][0];
            initialValue[currentCriterium] = secondValue;
            return {
                input: initialValue,
                firstValue: firstValue,
                secondValue: secondValue,
                currentExpectation: currentExpectation,
                currentCriterium: currentCriterium,
                available: available,
                availableCriteria: available[currentExpectation]
            };
        },
        mounted() {
            this.$emit("input", this.input);
        },
        watch: {
            firstValue(val) {
                this.input[this.currentExpectation] = val;
                this.$emit("input", this.input);
            },
            secondValue(val) {
                this.input[this.currentCriterium] = val;
                this.$emit("input", this.input);
            }
        },
        methods: {
            setExpectation(expectation) {
                this.currentExpectation = expectation;
                this.input = {};
                this.input[this.currentExpectation] = this.firstValue;
                this.availableCriteria = this.available[this.currentExpectation];
                this.currentCriterium = null;
                if (this.availableCriteria) {
                    this.currentCriterium = this.availableCriteria[0];
                    if (this.currentCriterium) {
                        this.input[this.currentCriterium] = this.secondValue;
                    }
                }
                this.$emit("input", this.input);
            },
            setCriteria(criterium) {
                delete this.input[this.currentCriterium];
                this.currentCriterium = criterium;
                if (this.currentCriterium) {
                    this.input[this.currentCriterium] = this.secondValue;
                }
                this.$emit("input", this.input);
            }
        }
    };
</script>
