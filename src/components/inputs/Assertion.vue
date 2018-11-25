<template>
    <div class="assertion container-fluid">
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <div class="input-group-append" style="font-size: 0.8em">
                    <button class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                        {{possibleAssertions[currentAssertionIndex].label}}
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="(assertion, index) in possibleAssertions" :key="index"
                           @click="currentAssertionIndex = index">{{assertion.label}}</a>
                    </div>
                </div>
                <input v-model="assertionValue" type="text" class="form-control"
                       placeholder="expectation"
                       style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)">
                <div v-if="possibleAssertions[currentAssertionIndex].criteria && possibleAssertions[currentAssertionIndex].criteria.length > 0"
                     class="input-group-append"
                     style="font-size: 0.8em">
                    <button class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                        {{possibleAssertions[currentAssertionIndex].criteria[currentCriteriaIndex].label}}
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#"
                           v-for="(criterium, index) in possibleAssertions[currentAssertionIndex].criteria"
                           :key="index"
                           @click="currentCriteriaIndex = index"
                        >{{criterium.label}}</a>
                    </div>
                </div>
                <input v-if="possibleAssertions[currentAssertionIndex].criteria && possibleAssertions[currentAssertionIndex].criteria.length > 0"
                       type="text"
                       placeholder="condition"
                       class="form-control input-group-append"
                       v-model="criteriumValue"
                       style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)">
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Assertion',
        components: {},
        props: {
            value: {}
        },
        data: function () {
            const initialContent = this.getContent();
            return {
                currentAssertionIndex: initialContent.currentAssertionIndex,
                currentCriteriaIndex: initialContent.currentCriteriaIndex,
                assertionValue: initialContent.assertionValue,
                criteriumValue: initialContent.criteriumValue,
                possibleAssertions: this.$store.state.assertions || []
            }
        },
        methods: {
            getContent() {
                const value = this.value || {};
                const content = {
                    currentAssertionIndex: 0,
                    currentCriteriaIndex: 0,
                    assertionValue: '',
                    criteriumValue: '',
                    possibleAssertions: this.$store.state.assertions || []
                };
                Object.keys(value).forEach(key => {
                    content.possibleAssertions.forEach((possible, index) => {
                        if (possible.name === key) {
                            content.currentAssertionIndex = index;
                            content.assertionValue = value[key];
                            (possible.criteria || []).forEach((criterium, criteriumIndex) => {
                                Object.keys(value || {}).forEach((remainingKey) => {
                                    if (criterium.name === remainingKey) {
                                        content.currentCriteriaIndex = criteriumIndex;
                                        content.criteriumValue = value[remainingKey];
                                    }
                                });
                            })
                        }
                    });
                });
                return content;
            },
            emitChanges: function () {
                let assertion = {};
                let currentAssertion = this.possibleAssertions[this.currentAssertionIndex];
                assertion[currentAssertion.name] = this.assertionValue;
                if (currentAssertion.criteria && currentAssertion.criteria.length > 0) {
                    assertion[currentAssertion.criteria[this.currentCriteriaIndex].name] = this.criteriumValue;
                }
                this.$emit('input', assertion);
            }
        },
        watch: {
            currentAssertionIndex() {
                this.emitChanges();
            },
            currentCriteriaIndex() {
                this.emitChanges();
            },
            assertionValue() {
                this.emitChanges();
            },
            criteriumValue() {
                this.emitChanges();
            },
            value() {
                const initialContent = this.getContent();
                this.currentAssertionIndex = initialContent.currentAssertionIndex;
                this.currentCriteriaIndex = initialContent.currentCriteriaIndex;
                this.assertionValue = initialContent.assertionValue;
                this.criteriumValue = initialContent.criteriumValue;
            }
        }
    }
</script>

<style scoped>
    .assertion {

    }

</style>
