<template>
    <div id="hook-body" class="carabina-text">
        <label class="pl-3 d-block carabina-text mb-3">Script</label>
        <hook-script :code="script" @change="value => onScriptChange(value)"
                     class="px-3 mb-4"></hook-script>
        <label class="pl-3 d-block carabina-text mb-0">Store</label>
        <key-value-table @change="value => onStoreChange(value)"
                         :table="store" class="mb-4"></key-value-table>
        <label class="pl-3 d-block carabina-text mb-0">Assertions</label>
        <Assertions :value="assertions" @change="value => onAssertionsChange(value)" class="mx-1"></Assertions>
        <div class="bottom-line py-2 mx-2"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '@/styles/texts.css'
    import HookScript from '@/inputs/hook-script'
    import Assertions from '@/inputs/assertions'

    export default Vue.extend({
        name: 'HookBody',
        components: {
            HookScript, Assertions
        },
        props: {
            component: Object
        },
        data: function () {
            const defaultValue = this.component || {};
            return {
                script: defaultValue.script || '',
                store: defaultValue.store || {},
                assertions: defaultValue.assertions || [],
            };
        },
        watch: {
            component: function () {
                const defaultValue = this.component || {};
                this.script = defaultValue.script || '';
                this.store = defaultValue.store || {};
                this.assertions = defaultValue.assertions || [];
            }
        },
        methods: {
            emit: function () {
                this.$emit('change', {script: this.script, store: this.store, assertions: this.assertions});
            },
            onScriptChange: function (value) {
                this.script = value;
                this.emit();
            },
            onStoreChange: function (value) {
                this.store = value;
                this.emit();
            },
            onAssertionsChange: function (value) {
                this.assertions = value;
                this.emit();
            }
        }
    });
</script>

<style scoped>
    .bottom-line {
        border-bottom: 1px solid var(--carabina-header-background-lighter-color);
    }
</style>
