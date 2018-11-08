<template>
    <div class="assertion container-fluid">
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <div class="input-group-append" style="font-size: 0.8em">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                        {{possibleAssertions[currentAssertionIndex].label}}
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="(assertion, index) in possibleAssertions" :key="index"
                           @click="currentAssertionIndex = index">{{assertion.label}}</a>
                    </div>
                </div>
                <input v-model="assertionValue" type="text" class="form-control"
                       style="background-color: transparent; color: white">
                <div v-if="possibleAssertions[currentAssertionIndex].criteria && possibleAssertions[currentAssertionIndex].criteria.length > 0" class="input-group-append"
                     style="font-size: 0.8em">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">
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
                <input v-if="possibleAssertions[currentAssertionIndex].criteria && possibleAssertions[currentAssertionIndex].criteria.length > 0" type="text"
                       class="form-control input-group-append"
                       v-model="criteriumValue"
                       style="background-color: transparent; color: white">
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Assertion',
        components: {},
        data: function () {
            return {
                possibleAssertions: this.$store.state.assertions,
                currentAssertionIndex: 0,
                currentCriteriaIndex: 0,
                assertionValue: '',
                criteriumValue: ''
            }
        },
        methods: {
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
        }
    }
</script>

<style scoped>
    .assertion {

    }

</style>
