<template>
    <b-container fluid id="assertion" class="px-1">
        <b-row no-gutters class="mb-2">
            <b-col :cols="expectedList.length > 0 ? '6' : '11'">
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
            <b-col cols="1" style="text-align: right" class="mt-3">
                <i class="fas fa-times carabina-icon delete-icon p-0mx-1" @click="emitDeletion"
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
    import {availableAssertions} from '@/components/available-assertions';
    import {Assertion} from '@/components/assertion';

    export default Vue.extend({
        name: 'Assertion',
        props: {
            value: Object
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