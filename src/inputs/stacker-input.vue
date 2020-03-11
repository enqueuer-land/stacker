<template>
    <!--https://github.com/SyedWasiHaider/vue-highlightable-input-->
    <highlightable-input
            caseSensitive
            :value="text.toString()"
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
    import HighlightableInput from 'vue-highlightable-input'

    export default Vue.extend({
        name: 'StackerHighlightableInput',
        components: {
            HighlightableInput
        },
        props: ['highlightableRegex', 'value', 'placeholder'],
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
                text: this.value,
                highlightRegex,
            }
        },
        methods: {
            onChange: function (value) {
                this.text = value;
                this.$emit('input', this.text);
            },
            // onHover: function () {
            //     const highlighted = this.$el.getElementsByTagName('span');
            //     Array.from(highlighted).map(item => {
            //         console.log(item.textContent);
            //     });
            // }
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
