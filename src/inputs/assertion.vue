<template>
    <b-container fluid id="assertion" class="px-1">
        <b-row no-gutters class="mb-2">
            <b-col :cols="selectedAssertion.criteria.length > 0 ? '6' : '11'">
                <b-row no-gutters>
                    <b-col cols="auto">
                        <dropdown-selector
                                @select="value => assertionChanged(value)"
                                :defaultSelection="selectedAssertion"
                                :availableList="possibleAssertions">
                        </dropdown-selector>
                    </b-col>
                    <b-col cols="7" style="padding-top: 5px">
                        <stacker-input placeholder="Actual value" type="text"
                                       @input="(value) => updateActualValue(value)"
                                       :value="actualValue"
                                       class="text-input carabina-text" trim>
                        </stacker-input>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="5" v-if="selectedAssertion.criteria.length > 0" class="pl-1">
                <b-row no-gutters>
                    <b-col cols="auto">
                        <dropdown-selector
                                :defaultSelection="selectedCriterium"
                                @select="value => criteriumChanged(value)"
                                :availableList="selectedAssertion.criteria">
                        </dropdown-selector>
                    </b-col>
                    <b-col cols="8" style="padding-top: 5px">
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
    import {assertions} from '@/components/assertions';

    export default Vue.extend({
        name: 'KeyValueTable',
        props: {
            assertion: Object
        },
        data: function () {
            const initial = this.getContent();
            return {
                actualValue: initial.actualValue,
                expectedValue: initial.expectedValue,
                selectedAssertion: initial.selectedAssertion,
                selectedCriterium: initial.selectedCriterium,
                possibleAssertions: initial.possibleAssertions,
            }
        },
        methods: {
            getContent: function () {
                const initialAssertion = assertions[0];
                const defaultValue = {
                    actualValue: '',
                    expectedValue: '',
                    selectedAssertion: initialAssertion,
                    selectedCriterium: initialAssertion.criteria[0],
                    possibleAssertions: assertions
                };

                Object.keys(this.assertion)
                    .forEach(key => {
                        const assertion = defaultValue.possibleAssertions
                            .find(possible => possible.name === key);
                        if (assertion) {
                            defaultValue.selectedAssertion = assertion;

                            defaultValue.actualValue = this.assertion[key];
                            const criteriumKey = Object.keys(this.assertion)
                                .find(anotherKey => anotherKey !== key && anotherKey !== 'name');
                            if (criteriumKey) {
                                defaultValue.selectedCriterium = defaultValue.selectedAssertion.criteria
                                    .find(criterium => criterium.name === criteriumKey);
                                defaultValue.expectedValue = this.assertion[criteriumKey];
                            }
                        }
                    });
                return defaultValue;
            },
            assertionChanged: function (value) {
                this.selectedAssertion = value;
                this.emit();
            },
            criteriumChanged: function (value) {
                this.selectedCriterium = value;
                this.emit();
            },
            updateActualValue: function (value) {
                this.actualValue = value;
                this.emit();
            },
            updateExpectedValue: function (value) {
                this.expectedValue = value;
                this.emit();
            },
            emit: function () {
                const toEmit = {
                    [this.selectedAssertion.name]: this.actualValue,
                };
                if (this.selectedAssertion.criteria.length > 0) {
                    toEmit[this.selectedCriterium.name] = this.expectedValue;
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
