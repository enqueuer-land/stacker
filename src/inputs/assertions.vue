<template>
    <b-container fluid id="assertions">
        <assertion v-for="(assertion, index) in assertions" :assertion="assertion"
                   :key="assertion.id"
                   @change="value => onAssertionsChange(index, value)"
                   @delete="onAssertionsDelete(index)"></assertion>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import Assertion from '@/inputs/assertion'
    import {IdCreator} from '@/components/id-creator';

    export default Vue.extend({
        name: 'Assertions',
        components: {Assertion},
        props: {
            value: Array
        },
        data: function () {
            return {
                assertions: this.initAssertions(this.value)
            }
        },
        watch: {
            // value: function (value) {
            //     const initial = [...value];
            //     if (initial.length === 0 || initial
            //         .every(assertion => Object.values(assertion)
            //             .every(value => value !== '') && Object.keys(assertion).length > 0)) {
            //         initial.push({});
            //     }
            //     this.assertions.push({});
            // }
        },
        methods: {
            shouldAddRow: function (value) {
                const length = value.length;
                if (length === 0) {
                    return true;
                } else {
                    const lastItem = value[length - 1];
                    const lastItemKeys = Object.keys(lastItem);
                    if (lastItemKeys.length > 1 && lastItemKeys.every(key => key === 'id' || lastItem[key] !== '')) {
                        return true;
                    }
                }
                return false;
            },
            initAssertions: function (value) {
                const initial = [];
                if (value && value.length > 0) {
                    value.forEach(item => {
                        initial.push(Object.assign({}, item, {id: new IdCreator().create()}))
                    });
                }
                if (this.shouldAddRow(value)) {
                    initial.push({id: new IdCreator().create()});
                }
                return initial;
            },
            onAssertionsChange: function (index, value) {
                const toEmit = [...this.assertions];
                toEmit[index] = value;
                this.$emit('change', toEmit);
                if (this.shouldAddRow(toEmit)) {
                    console.log(toEmit);
                    this.assertions.push({id: new IdCreator().create()});
                }
            },
            needsToRemoveRow: function (assertions) {
                let indexToRemove = -1;
                assertions
                    .forEach((assertion, index) => {
                        if (Object.values(assertion).every(value => value === '') &&
                            Object.keys(assertion).length > 0 &&
                            index !== this.assertions.length - 1) {
                            console.log(index);
                            indexToRemove = index;
                        }
                    });
                if (indexToRemove !== -1) {
                    this.assertions.splice(indexToRemove, 1);
                }
            },
            onAssertionsDelete: function (index) {
                if (this.assertions.length > 1) {
                    this.assertions = this.assertions
                        .filter((_, i) => i !== index);
                    this.$emit('change', this.assertions);
                }
            },

        }
    });
</script>
<style type="text/css" scoped>
    #assertions {
    }

</style>
