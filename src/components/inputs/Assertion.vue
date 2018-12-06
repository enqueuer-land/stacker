<template>
    <div class="assertion">
        <div class="row mt-1 pb-2 mx-0">
            <div class="mb-1 stacker-label">
                Name
            </div>
            <input v-model="name" type="text" class="form-control input-class" style="height: 32px">
        </div>
        <div class="input-group input-group-sm mb-1 ml-0 mr-0">
            <div class="input-group-append" style="font-size: 0.8em">
                <button class="btn dropdown-toggle button-label-class" type="button" data-toggle="dropdown">
                    {{possibleAssertions[currentAssertionIndex].label}}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" v-for="(assertion, index) in possibleAssertions" :key="index"
                       @click="currentAssertionIndex = index">{{assertion.label}}</a>
                </div>
            </div>
            <input v-model="assertionValue" type="text" class="form-control mr-2 input-class"
                   placeholder="expectation">
            <div v-if="possibleAssertions[currentAssertionIndex].criteria && possibleAssertions[currentAssertionIndex].criteria.length > 0"
                 class="input-group-append"
                 style="font-size: 0.8em">
                <button class="btn dropdown-toggle button-label-class" type="button" data-toggle="dropdown">
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
                   class="form-control input-class"
                   v-model="criteriumValue">
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
                name: initialContent.name,
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
                    name: value.name || '',
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
                let assertion = {
                    name: this.name
                };
                let currentAssertion = this.possibleAssertions[this.currentAssertionIndex];
                assertion[currentAssertion.name] = this.assertionValue;
                if (currentAssertion.criteria && currentAssertion.criteria.length > 0) {
                    assertion[currentAssertion.criteria[this.currentCriteriaIndex].name] = this.criteriumValue;
                }
                this.$emit('input', assertion);
            }
        },
        watch: {
            name() {
                this.emitChanges();
            },
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
        /*border: 1px solid var(--text-smooth-color);*/
        background-color: var(--stacker-header-background-color);
        border-left: 1px solid var(--stacker-background-alternative-color);
        border-top: 1px solid var(--stacker-background-alternative-color);
        border-bottom: 1px solid var(--stacker-background-alternative-color);
    }


    .button-label-class {
        background-color: var(--stacker-background-color);
        color: var(--text-color);
        border-color: var(--text-smooth-color)
    }

    .input-class {
        background-color: var(--stacker-background-color);
        color: var(--text-color);
        border-color: var(--stacker-background-alternative-color)
    }

</style>
