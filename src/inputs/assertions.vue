<template>
    <b-container fluid id="assertions">
        <assertion v-for="(assertion, index) in assertions" :assertion="assertion"
                   :key="JSON.stringify(assertion) + index"
                   @change="value => onAssertionsChange(index, value)"
                   @delete="onAssertionsDelete(index)"></assertion>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import Assertion from '@/inputs/assertion'

    export default Vue.extend({
        name: 'Assertions',
        components: {Assertion},
        props: {
            value: Array
        },
        data: function () {
            const initial = [...this.value];
            if (initial.length === 0) {
                initial.push({});
            }
            return {
                assertions: initial
            }
        },
        methods: {
            emit: function () {
                this.$emit('change', this.assertions);
                this.needsToRemoveRow();
            },
            needsToRemoveRow: function () {
                this.assertions = this.assertions
                    .filter((assertion, index) => (Object.values(assertion).some(value => value !== '') &&
                        Object.keys(assertion).length > 0) ||
                        index === this.assertions.length - 1);
                this.needsToAddRow();
            },
            needsToAddRow: function () {
                console.log('needsToAddRow: ' + JSON.stringify(this.assertions));
                if (this.assertions.every(assertion =>
                    Object.values(assertion)
                        .every(value => value !== '') && Object.keys(assertion).length > 0)) {
                    this.assertions.push({});
                }
            },
            onAssertionsChange: function (index, value) {
                console.log(value);
                this.$set(this.assertions, index, value);
                this.emit();
            },
            onAssertionsDelete: function (index) {
                this.assertions = this.assertions
                    .filter((_, i) => i !== index);
                this.emit();
            },

        }
    });
</script>
<style type="text/css" scoped>
    #assertions {
    }

</style>
