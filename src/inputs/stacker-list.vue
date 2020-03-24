<template>
    <b-container fluid class="m-0 p-0">
        <b-row class="m-0 p-0">
            <b-col v-for="item in items" :key="item.id" cols="6" class="align-self-center mb-2">
                <stacker-input placeholder="Value"
                               trim
                               :value="item.text"
                               @input="value => update(item, value)"
                               class="text-input carabina-text">
                </stacker-input>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import '@/styles/icons.css';
    import {IdCreator} from '@/components/id-creator';

    export default Vue.extend({
        name: 'StackerList',
        props: {
            values: Array
        },
        data: function () {
            return {
                items: this.getContent((this.values || []).map(value => ({text: value.toString()})))
            }
        },
        methods: {
            getContent: function (values) {
                const notEmpties = values
                    .filter(value => value.text.length > 0)
                    .map(value => {
                        if (value.id === undefined) {
                            value.id = new IdCreator().create()
                        }
                        return value;
                    });
                if (notEmpties.length === 0 || notEmpties.every(item => item.text.length > 0)) {
                    notEmpties.push({
                        text: '',
                        id: new IdCreator().create()
                    });
                }
                return notEmpties;
            },
            update: function (item, value) {
                item.text = value;
                this.items = this.getContent(this.items);
                this.$emit('input', this.items
                    .filter(item => item.text.length > 0)
                    .map(item => item.text));
            },
        }
    });
</script>
<style type="text/css" scoped>
</style>
