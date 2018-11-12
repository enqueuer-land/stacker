<template>
    <div class="stage-event container-fluid px-4">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Script
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <prism-editor v-model="script" lineNumbers language="js"
                              style="background-color: transparent; color: white; font-size: 14px; font-weight: lighter; border: white 1px solid; border-radius: 4px;">
                </prism-editor>
            </div>
        </div>
        <div class="row pb-1">
            <assertions v-model="assertions"/>
        </div>
        <key-value-input v-model="store" title="Store"/>
    </div>
</template>

<script>
    import KeyValueInput from "../inputs/KeyValueInput";
    import Assertions from "../inputs/Assertions";
    import PrismEditor from 'vue-prism-editor'

    export default {
        name: 'StageEvent',
        components: {Assertions, KeyValueInput, PrismEditor},
        props: {
            item: {
                defaultValue: {}
            },
            eventName: {},
        },
        data: function () {
            const defaultValue = this.item[this.eventName] || {};
            return {
                script: defaultValue.script || '',
                store: defaultValue.store || {},
                assertions: defaultValue.assertions || [],
            }
        },
        methods: {
            getContent: function () {
                const defaultValue = this.item[this.eventName] || {};
                this.script = defaultValue.script;
                this.store = defaultValue.store;
                this.assertions = defaultValue.assertions;
            }
        },
        watch: {
            eventName: function () {
                this.getContent();
            },
            item: function () {
                this.getContent();
            },
            script() {
                this.$emit('input', {attribute: this.eventName, payload: {script: this.script, assertions: this.assertions, store: this.store}});
            },
            assertions() {
                this.$emit('input', {attribute: this.eventName, payload: {script: this.script, assertions: this.assertions, store: this.store}});
            },
            store() {
                this.$emit('input', {attribute: this.eventName, payload: {script: this.script, assertions: this.assertions, store: this.store}});
            }
        }
    }
</script>

<style scoped>
    .stage-event {

    }

</style>
