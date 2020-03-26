<template>
    <b-container fluid id="assertion" class="px-1">
        <b-row no-gutters class="mb-2">
            <b-col cols="auto" class="align-self-center carabina-text mr-3 mt-0 mr-1" style="font-size: 0.85em; user-select: none">
                #{{index}}
            </b-col>
            <b-col :cols="expectedList.length > 0 ? '5' : '10'">
                <b-row no-gutters>
                    <b-col cols="auto">
                        <dropdown-selector
                                @select="value => assertionChanged(value.name)"
                                :defaultSelection="selectedAssertion"
                                :availableList="availableAssertions">
                        </dropdown-selector>
                    </b-col>
                    <b-col cols="7" style="padding-top: 5px">
                        <stacker-input placeholder="Actual value" type="text"
                                       @input="(value) => updateAssertionValue(value)"
                                       :value="assertionValue"
                                       class="text-input carabina-text" trim>
                        </stacker-input>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="5" v-if="expectedList.length > 0" class="pl-1">
                <b-row no-gutters>
                    <b-col cols="auto">
                        <dropdown-selector
                                :defaultSelection="selectedExpected"
                                @select="value => expectedChanged(value.name)"
                                :availableList="expectedList">
                        </dropdown-selector>
                    </b-col>
                    <b-col cols="7" style="padding-top: 5px">
                        <stacker-input placeholder="Expected value" type="text"
                                       @input="(value) => updateExpectedValue(value)"
                                       :value="expectedValue"
                                       class="text-input carabina-text" trim>
                        </stacker-input>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols style="text-align: right" class="mt-3 ml-1">
                <i class="fas fa-times carabina-icon delete-icon p-0 mx-1" @click="emitDeletion"
                   style="font-size: 14px"></i>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import '@/styles/icons.css';
    import '@/styles/dropdown.css';
    import {availableAssertions} from '@/assertions/available-assertions';
    import {Assertion} from '@/assertions/assertion';

    export default Vue.extend({
        name: 'Assertion',
        props: {
            value: Object,
            index: Number
        },
        data: function () {
            const initial = this.getContent();
            return {
                assertion: initial.assertion,
                assertionValue: initial.assertionValue,
                expected: initial.expected,
                expectedValue: initial.expectedValue,

                availableAssertions
            }
        },
        computed: {
            expectedList: function () {
                return availableAssertions.find(item => item.name === this.assertion).expectedList;
            },
            selectedAssertion: function () {
                return availableAssertions.find(item => item.name === this.assertion);
            },
            selectedExpected: function () {
                return this.expectedList && this.expectedList.find(item => item.name === this.expected);
            }
        },
        methods: {
            getContent: function () {
                const initialAssertion = new Assertion().parse(this.value);
                if (initialAssertion) {
                    return initialAssertion;
                }
                return {
                    assertion: 'expect',
                    assertionValue: '',
                    expected: 'toBeEqualTo',
                    expectedValue: ''
                };
            },
            assertionChanged: function (value) {
                this.assertion = value;
                this.emit();
            },
            expectedChanged: function (value) {
                this.expected = value;
                this.emit();
            },
            updateAssertionValue: function (value) {
                this.assertionValue = value;
                this.emit();
            },
            updateExpectedValue: function (value) {
                this.expectedValue = value;
                this.emit();
            },
            emit: function () {
                const toEmit = {
                    assertion: this.assertion,
                    assertionValue: this.assertionValue
                };
                if (this.expectedList.length > 0) {
                    toEmit.expected = this.expected;
                    toEmit.expectedValue = this.expectedValue;
                }
                this.$emit('change', toEmit);
            },
            emitDeletion: function () {
                this.$emit('delete');
            }
        }
    });
</script>
<style type="text/css" scoped>
    #assertion {
        background-color: var(--carabina-body-background-darker-color);
    }

    #assertion:hover .delete-icon {
        color: var(--carabina-text-darker-color);
    }

    .delete-icon {
        color: transparent;
        transition: all 200ms ease;
    }

</style>
