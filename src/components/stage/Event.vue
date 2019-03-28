<template>
    <div class="event px-3">
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Script
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <prism-editor v-model="script" lineNumbers language="js"
                              style="background-color: transparent; color: var(--text-color); font-size: 14px; font-weight: lighter; border: var(--stacker-background-alternative-color) 1px solid; border-radius: 4px;">
                </prism-editor>
            </div>
        </div>
        <div class="row">
            <key-value-input class="col px-2" v-model="store" title="Store"/>
        </div>
        <div class="row pb-1">
            <assertions v-model="assertions"/>
        </div>
    </div>
</template>

<script>
    import KeyValueInput from "../inputs/KeyValueInput";
    import Assertions from "../inputs/Assertions";
    import PrismEditor from 'vue-prism-editor'

    export default {
        name: 'Event',
        components: {Assertions, KeyValueInput, PrismEditor},
        props: {
            value: {},
        },
        data: function () {
            const defaultValue = this.value || {};
            return {
                script: defaultValue.script || '',
                store: defaultValue.store || {},
                assertions: defaultValue.assertions || [],
            }
        },
        methods: {
            getContent: function () {
                const defaultValue = this.value || {};
                this.script = defaultValue.script;
                this.store = defaultValue.store;
                this.assertions = defaultValue.assertions;
            },
            emit() {
                const input = {
                    script: this.script,
                    assertions: this.assertions,
                    store: this.store
                };
                this.$emit('input', input);
            }
        },
        watch: {
            eventName: function () {
                this.getContent();
            },
            value: function () {
                this.getContent();
            },
            script() {
                this.emit();
            },
            assertions() {
                this.emit();
            },
            store() {
                this.emit();
            }
        }
    }
</script>

<style scoped>
    .event {

    }

</style>
