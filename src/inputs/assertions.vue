<template>
    <b-container fluid id="assertions">
        <assertion v-for="(assertion, index) in assertions" :value="assertion"
                   :index="index"
                   :key="assertion.id"
                   @change="value => onAssertionsChange(assertion, value)"
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
        methods: {
            itemHasValues: function (item) {
                const itemKeys = Object.keys(item);
                return itemKeys.length > 1 && itemKeys.every(key => item[key] !== '');
            },
            shouldAddRow: function (value) {
                const length = value.length;
                if (length === 0) {
                    return true;
                }
                return this.itemHasValues(value[length - 1]);
            },
            initAssertions: function (value) {
                const initial = [];
                if (value && value.length > 0) {
                    value.forEach(item => {
                        if (this.itemHasValues(item)) {
                            initial.push(Object.assign({}, item, {id: new IdCreator().create()}))
                        }
                    });
                }
                if (this.shouldAddRow(value)) {
                    initial.push({id: new IdCreator().create(), expect: '', toBeEqualTo: ''});
                }
                return initial;
            },
            onAssertionsChange: function (assertion, value) {
                Object.keys(assertion)
                    .forEach(key => {
                        if (key !== 'id') {
                            delete assertion[key];
                        }
                    });
                assertion[value.assertion] = value.assertionValue;
                if (value.expected) {
                    assertion[value.expected] = value.expectedValue;
                }
                if (this.shouldAddRow(this.assertions)) {
                    const newItem = {id: new IdCreator().create(), expect: '', toBeEqualTo: ''};
                    this.assertions.push(newItem);
                }

                this.emit();
            },
            onAssertionsDelete: function (index) {
                if (this.assertions.length > 1) {
                    this.assertions = this.assertions
                        .filter((_, i) => i !== index);
                    this.$emit('change', this.assertions);
                }
            },
            emit: function () {
                const toEmit = this.assertions
                    .filter(item => this.itemHasValues(item))
                    .map(item => ({...item, id: undefined}));
                this.$emit('change', toEmit);
            }
        }
    });
</script>
<style type="text/css" scoped>
    #assertions {
    }

</style>
