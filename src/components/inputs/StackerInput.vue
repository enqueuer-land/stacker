<template>
    <div class="stacker-input"
         @keydown="checkHighlight"
         @keyup="checkHighlight"
         @blur="blur"
         @focus="focus"
         :id="id" contenteditable="true">
    </div>
</template>
<script>

    import {generateId} from "../../tests/id-generator";

    export default {
        name: 'StackerInput',
        props: ['value', 'placeholder'],
        mounted() {
            if (!this.isEmpty(this.value)) {
                this.text = this.getContent(this.value);
            } else {
                this.blur();
            }
        },
        data() {
            return {
                id: generateId(),
                text: null
            }
        },
        methods: {
            isEmpty(text) {
                return !text || text.length <= 0 || text === "\n";
            },
            blur() {
                if (this.isEmpty(this.text)) {
                    const safeText = (this.placeholder || "").replace(/</g, () => "&lt;").replace(/>/g, () => "&gt;");
                    const element = $(`#${this.id}`);
                    element.html(`<span style='color: var(--text-smooth-color); opacity: 0.5'>${safeText}</span>`);
                }
            },
            focus() {
                if (this.isEmpty(this.text)) {
                    const element = $(`#${this.id}`);
                    element.html('');
                }
            },
            updateCursor(newHtml) {
                //TODO fix cursor position
                // const currentPosition = window.getSelection().getRangeAt(0).startOffset;
                const element = $(`#${this.id}`);
                element.html(newHtml);

                // Set cursor postion to end of text
                const child = element.children();
                const range = document.createRange();
                const sel = window.getSelection();
                const lastChild = child[child.length - 1];
                range.setStartAfter(lastChild);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                element[0].focus();
            },
            getContent(value) {
                const previousText = this.text;

                const safeText = value.replace(/</g, () => "&lt;").replace(/>/g, () => "&gt;");
                const replacer = (placeHolder) => {
                    return "</span><span style='color: var(--enqueuer-color)'>" +
                        placeHolder +
                        "</span><span style='color: var(--text-color)'>";
                };
                const newHtml = "<span style='color: var(--text-color)'>" +
                    safeText
                        .replace(/{{[^}}]+}}/g, replacer)
                        .replace(/&lt;&lt;[^&gt;&gt;]+&gt;&gt;/g, replacer) +
                    "</span>";

                if (previousText !== value) {
                    const element = $(`#${this.id}`);
                    element.html(newHtml);
                    if (this.text !== null) {
                        this.updateCursor(newHtml);
                    }
                }
                return value;
            },
            checkHighlight(event) {
                this.text = this.getContent(event.target.innerText)
            }
        },
        watch: {
            value(value) {
                this.text = this.getContent(value);
            },
            text() {
                this.$emit('input', this.text);
            },
        }
    }
</script>

<style scoped>

</style>
