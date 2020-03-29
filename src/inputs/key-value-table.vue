<template>
    <b-container fluid>
        <b-row v-for="(pair, index) in pairs" class="m-0 pl-3 py-0 mb-2"
               :key="pair.id" id="key-value-table" no-gutters align-h="center">
            <b-col cols="11" class="align-self-center mr-auto">
                <b-row no-gutters>
                    <b-col cols="4">
                        <stacker-input placeholder="Key"
                                       trim
                                       style="text-align: right"
                                       :value="pair.key"
                                       @blur="detectAutoDeleteTable"
                                       @input="(key) => onKeyChanged(key, index)"
                                       class="text-input carabina-text mx-2">
                        </stacker-input>
                    </b-col>
                    <b-col cols="8">
                        <stacker-input placeholder="Value"
                                       :value="pair.value"
                                       @input="(value) => onValueChanged(value, index)"
                                       class="text-input carabina-text ml-2" trim>
                        </stacker-input>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="auto" class="align-self-center pb-2">
                <i class="fas fa-times carabina-icon delete-icon" style="font-size: 14px"
                   @click="onRowDeleted(index)"></i>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import '@/styles/icons.css';
    import {IdCreator} from '@/components/id-creator';

    const idCreator = new IdCreator();
    export default Vue.extend({
        name: 'KeyValueTable',
        props: {
            table: Object
        },
        data: function () {
            const pairs = Object.keys(this.table || {})
                .map(key => ({key, value: this.table[key], id: idCreator.create()}));
            pairs.push({key: '', value: '', id: idCreator.create()});
            return {
                pairs,
            }
        },
        methods: {
            update: function () {
                this.detectNeedRow();
                return this.createObject();
            },
            createObject: function () {
                return this.pairs.reduce((acc, pair) => {
                    if (pair.key !== '') {
                        acc[pair.key] = pair.value;
                    }
                    return acc;
                }, {});
            },
            detectAutoDeleteTable: function () {
                return this.pairs = this.pairs.filter((pair, index) => (pair.key !== '') || (index === this.pairs.length - 1))
            },
            detectNeedRow: function () {
                if (this.pairs.every(pair => pair.key !== '')) {
                    this.pairs.push({key: '', value: '', id: idCreator.create()});
                }
            },
            onKeyChanged: function (key, index) {
                this.pairs[index].key = key;
                this.$emit('change', this.update())
            },
            onValueChanged: function (value, index) {
                this.pairs[index].value = value;
                this.$emit('change', this.update())
            },
            onRowDeleted: function (index) {
                this.pairs = this.pairs.filter((pair, i) => i !== index);
                this.$emit('change', this.update())
            }
        }
    });
</script>
<style type="text/css" scoped>
    #key-value-table {
        background-color: var(--carabina-body-background-darker-color);
    }

    #key-value-table:hover .delete-icon {
        color: var(--carabina-text-darker-color);
    }

    .delete-icon {
        color: transparent;
        transition: all 200ms ease;
    }


</style>
