<template>
    <!--https://github.com/SyedWasiHaider/vue-highlightable-input-->
    <highlightable-input
            v-b-tooltip.html.hover :title="tooltipContent"
            caseSensitive
            id="id-highlightable-input"
            :value="text"
            @input="onChange"
            :highlightDelay="100"
            :highlight="highlightRegex"
            :data-placeholder="placeholder"
            class="text-input carabina-text mt-2 px-1 highlightable-input-class"
            highlight-style="color: var(--carabina-theme-color); font-style: italic;"
            trim
    />
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import {mapGetters} from 'vuex';
    import HighlightableInput from 'vue-highlightable-input'

    export default Vue.extend({
        name: 'StackerHighlightableInput',
        components: {
            HighlightableInput
        },
        props: ['highlightableRegex', 'value', 'placeholder', 'emptyValue'],
        data() {
            const highlightRegex = [
                {
                    text: /({{[^}}]+}})|(<<[^>>]+>>)/g,
                    style: 'color: var(--carabina-theme-color); font-style: italic;'
                }
            ];
            if (this.highlightableRegex) {
                highlightRegex.push({
                    text: this.highlightableRegex,
                    style: 'color: var(--carabina-text-color); font-style: italic;'
                });
            }
            return {
                text: this.value.toString(),
                highlightRegex,
            }
        },
        watch: {
            value: function () {
                this.text = this.value.toString();
            },
            placeholder: function () {
                this.text = this.placeholder;
            }
        },
        computed: {
            ...mapGetters('nav-bar', ['selectedEnvironment']),
            tooltipContent: function () {
                const variableRegex = this.highlightRegex[0].text;
                const store = this.selectedEnvironment.store || {};
                let flagReplacement = false;

                const htmlTag = '<div style="color: var(--carabina-text-color);">' + this.text.replace(variableRegex, (item) => {
                    const itemName = item.substr(2, item.length - 4);
                    const storeElement = store[itemName];
                    if (storeElement) {
                        flagReplacement = true;
                        return storeElement;
                    }
                    return item;
                }) + '</div>';
                return flagReplacement ? htmlTag : '';
            },
        },
        methods: {
            onChange: function (value) {
                if (this.text !== value) {
                    this.text = value;
                    if (value === '' && this.emptyValue) {
                        this.text = this.emptyValue;
                    }
                    this.$emit('input', this.text);
                }
            },
        },
    });
</script>
<style type="text/css" scoped>

    [data-placeholder]:empty:before {
        content: attr(data-placeholder);
        color: var(--carabina-text-darker-color);
        filter: brightness(0.5);
    }

    .highlightable-input-class {
        white-space: nowrap;
        overflow: hidden;
    }

</style>
