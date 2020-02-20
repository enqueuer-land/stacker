<template>
    <b-container fluid>
        <b-row v-for="(pair, index) in pairs" class="m-0 px-1 py-0 mb-0" style="width: 100%" no-gutters
               align-h="between"
               :key="pair.id" id="key-value-table">
            <b-col cols="5" class="align-self-center pl-2">
                <b-form-group>
                    <b-form-input placeholder="Enter key"
                                  :value="pair.key"
                                  @input="(key) => onKeyChanged(key, index)"
                                  class="text-input carabina-text" lazy>
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="5" class="align-self-center pl-2 pr-0">
                <b-form-group>
                    <b-form-input placeholder="Enter value"
                                  :value="pair.value"
                                  @input="(value) => onValueChanged(value, index)"
                                  class="text-input carabina-text" lazy>
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="auto" class="align-self-center p-0 mb-2 mr-1" @click="onRowDeleted">
                <i class="fas fa-times carabina-icon delete-icon" style="font-size: 14px"></i>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css'
    import '@/styles/icons.css'
    import {IdCreator} from '../../components/id-creator';

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
                pairs: pairs,
            }
        },
        methods: {
            update: function () {
                this.detectAutoDeleteTable();
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
                if (this.pairs.every(pair => pair.key !== '' && pair.value !== '')) {
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
                this.pairs.splice(index, 1);
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
