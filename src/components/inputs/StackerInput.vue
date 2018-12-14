<template>
    <div class="stacker-input"
         @keydown="checkHighlight"
         @keyup="checkHighlight"
         :id="id" contenteditable="true">
    </div>
</template>
<script>

    import {generateId} from "../../tests/id-generator";

    export default {
        name: 'StackerInput',
        props: ['value', 'placeholder'],
        mounted() {
            this.text = this.getContent(this.value);
        },
        data() {
            return {
                id: generateId(),
                text: ""
            }
        },
        methods: {
            updateHtml(newHtml) {
                //TODO fix cursor position
                const currentPosition = window.getSelection().getRangeAt(0).startOffset;
                const element = $(`#${this.id}`);
                element.html(newHtml);

                // Set cursor postion to end of text
                const child = element.children();
                const range = document.createRange();
                const sel = window.getSelection();
                range.setStartAfter(child[child.length - 1]);
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
                    this.updateHtml(newHtml);
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
