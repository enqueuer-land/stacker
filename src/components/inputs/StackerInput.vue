<template>
    <div class="stacker-input"
         :contenteditable="!readonly"
         style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
         @input="change"
         @blur="blur"
         @focus="focus"
         :id="id">
    </div>
</template>
<script>

    import {generateId} from "../../tests/id-generator";

    export default {
        name: 'StackerInput',
        props: ['value', 'placeholder', 'readonly'],
        mounted() {
            $('div[contenteditable]').keydown((e) => e.keyCode !== 13);
            if (this.isEmpty(this.value)) {
                this.blur();
            } else {
                const element = this.getInputHtmlElement();
                const newHtml = this.createHtml(this.value);
                console.log('mounted' + this.value);
                element.html(newHtml);
            }
        },
        data() {
            console.log(this.value);
            return {
                id: generateId(),
                text: this.value
            }
        },
        methods: {
            getInputHtmlElement() {
                return $(`#${this.id}`);
            },
            isEmpty(text) {
                return !text || text.length <= 0 || text === "\n";
            },
            change(event) {
                this.text = event.target.innerText.replace(/\n/g, () => '');
                console.log('change ' + this.text);
            },
            blur() {
                const element = this.getInputHtmlElement();
                if (this.isEmpty(this.text)) {
                    const safeText = (this.placeholder || "").replace(/</g, () => "&lt;").replace(/>/g, () => "&gt;");
                    element.html(`<span style='color: var(--text-smooth-color); opacity: 0.5'>${safeText}</span>`);
                } else {
                    element.html(this.createHtml(this.value));
                    console.log('blur ' + element.html());
                }
            },
            focus() {
                if (this.isEmpty(this.text)) {
                    const element = this.getInputHtmlElement();
                    element.html('');
                }
            },
            // updateCursor() {
            //     //TODO fix cursor position
            //     // const currentPosition = window.getSelection().getRangeAt(0).startOffset;
            //     const element = $(`#${this.id}`);
            //
            //     // Set cursor postion to end of text
            //     const child = element.children();
            //     const range = document.createRange();
            //     const sel = window.getSelection();
            //     const lastChild = child[child.length - 1];
            //     if (lastChild) {
            //         range.setStartAfter(lastChild);
            //         range.collapse(true);
            //         sel.removeAllRanges();
            //         sel.addRange(range);
            //         element[0].focus();
            //     }
            // },
            createHtml(value) {
                const stringifiedValue = typeof value === "string" ? value : value + "";
                const safeText = stringifiedValue.replace(/</g, () => "&lt;").replace(/>/g, () => "&gt;");
                const replacer = (placeHolder) => {
                    return "</span><span style='color: var(--enqueuer-color)'>" +
                        placeHolder +
                        "</span><span style='color: var(--text-color)'>";
                };
                return "<span style='color: var(--text-color)'>" +
                    safeText
                        .replace(/{{[^}}]+}}/g, replacer)
                        .replace(/&lt;&lt;[^&gt;&gt;]+&gt;&gt;/g, replacer) +
                    "</span><span style='color: var(--text-color)'></span>";
            },
        },
        watch: {
            value() {
                if (this.text !== this.value) {
                    if (!this.isEmpty(this.value)) {
                        console.log('value' + this.value);
                        this.text = this.value || "";
                        const element = this.getInputHtmlElement();
                        element.html(this.createHtml(this.value));
                    } else {
                        this.text = '';
                        this.blur();
                    }
                }
            },
            text() {
                this.$emit('input', this.text);
            },
        }

    }
</script>

<style scoped>


</style>
