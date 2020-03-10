<template>
    <b-container fluid id="assertion" class="px-1">
        <b-form-group class="carabina-text">
            <b-input-group>
                <template class="mx-2">
                    <dropdown-selector
                            @select="value => assertionChanged(value)"
                            :defaultSelection="selectedAssertion"
                            :availableList="possibleAssertions">
                    </dropdown-selector>
                    <stacker-input placeholder="Actual value" type="text"
                                   @blur="(event) => updateActualValue(event.target.value)"
                                   :value="actualValue"
                                   class="text-input carabina-text" trim>
                    </stacker-input>
                </template>
                <template v-if="selectedAssertion.criteria.length > 0" class="mx-2">
                    <dropdown-selector class="ml-3"
                                       :defaultSelection="selectedCriterium"
                                       @select="value => criteriumChanged(value)"
                                       :availableList="selectedAssertion.criteria"></dropdown-selector>
                    <stacker-input placeholder="Expected value" type="text"
                                   @blur="(event) => updateExpectedValue(event.target.value)"
                                   :value="expectedValue"
                                   class="text-input carabina-text" trim>
                    </stacker-input>
                </template>
                <i class="fas fa-times carabina-icon delete-icon p-0 mt-2 mx-1" @click="emitDeletion"
                   style="font-size: 14px"></i>
            </b-input-group>
        </b-form-group>
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
                if (Object.values(toEmit).some(value => value.length > 0)) {
                    this.$emit('change', toEmit);
                }
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
