<template>
    <div class="container-fluid stacker-input object-formatter">
        <div class="row" style="background-color: var(--stacker-background-alternative-color); border-radius: 4px;">
            <button v-for="(formatter, index) in formatters" :key="index" @click="selectIndex(index)"
                    :class="btnClass(index)">
                {{formatter.name}}
            </button>
        </div>
        <div class="row">
            <prism-editor v-model="payload" lineNumbers language="js"></prism-editor>
        </div>
        <div v-if="alert !== null" class="row" style="">
            <div class="alert alert-warning mb-0 col align-self-center p-1" role="alert"
                 style="width: 100%; border-radius: 0 0 2px 2px;">
                {{alert}}
            </div>
        </div>
    </div>
</template>
<script>
    import PrismEditor from 'vue-prism-editor'
    import * as yaml from 'yamljs';

    const defaultFormatters = [
        {
            name: 'Raw',
            raw: true,
            stringify(formatted) {
                return formatted;
            },
            parse: (stringified) => {
                return stringified;
            }
        },
        {
            name: 'JSON',
            json: true,
            stringify(formatted) {
                return JSON.stringify(formatted, null, 4)
            },
            parse: (stringified) => {
                return JSON.parse(stringified);
            }
        },
        {
            name: 'YAML',
            stringify(formatted) {
                return yaml.stringify(formatted, 100, 4);
            },
            parse: (stringified) => {
                return yaml.parse(stringified);
            }
        }
    ];

    export default {
        name: 'ObjectFormatter',
        components: {PrismEditor},
        props: {
            text: {},
            format: {}
        },
        data: function () {
            const content = this.getContent();
            return {
                payload: content.payload,
                selectedIndex: content.selectedIndex,
                alert: null,
                formatters: defaultFormatters
            }
        },
        watch: {
            text() {
                const content = this.getContent();
                this.payload = content.payload;
                this.selectedIndex = content.selectedIndex;
            },
            format() {
                const content = this.getContent();
                this.payload = content.payload;
                this.selectedIndex = content.selectedIndex;
            },
            payload() {
                this.checkAlert();
                this.emit();
            }
        },
        methods: {
            selectIndex(index) {
                if (this.selectedIndex === index) {
                    this.adjustSyntax();
                }
                this.selectedIndex = index;
                this.checkAlert();
                this.emit();
            },
            adjustSyntax() {
                const stringified = this.checkAlert();
                if (stringified) {
                    this.payload = stringified;
                }
            },
            checkAlert() {
                this.alert = null;
                try {
                    const formatter = this.formatters[this.selectedIndex];
                    return formatter.stringify(formatter.parse(this.payload));
                } catch (err) {
                    this.alert = err.toString();
                }
            },
            emit() {
                const format = defaultFormatters[this.selectedIndex].name.toLowerCase();
                this.$emit('update:text', this.payload);
                this.$emit('update:format', format);
            },
            getContent() {
                const defaultFormatterIndex = defaultFormatters.findIndex(formatter => formatter.raw);
                if (this.format) {
                    const formatterIndex = defaultFormatters.findIndex(formatter => formatter.name.toLowerCase() === this.format.toLowerCase());
                    return {
                        payload: this.text,
                        selectedIndex: formatterIndex
                    }
                }
                return {
                    payload: this.text,
                    selectedIndex: defaultFormatterIndex
                }

            },
        },
        computed: {
            btnClass() {
                return function (index) {
                    return {
                        'btn btn-sm formatter-button': true,
                        'enabled-label': index === this.selectedIndex,
                    }
                }
            }
        }
        ,
    }
</script>

<style scoped>
    .object-formatter {
        border: var(--stacker-background-alternative-color) 1px solid;
        border-radius: 4px;

        font-size: 14px;
        font-weight: lighter;
        height: auto;
    }

    .formatter-button {
        color: var(--text-smooth-color);
        background-color: var(--stacker-background-alternative-color);
    }

    .formatter-button:hover {
        background-color: var(--stacker-background-color);
    }

    .formatter-button:focus {
        box-shadow: 0 0 5px var(--text-smooth-color);
    }

    .enabled-label {
        border-left: 6px solid var(--text-color);
        background-color: var(--stacker-background-color);
        color: var(--text-color);
    }

    .enabled-label:hover {
        color: var(--enqueuer-color);
        font-size: 15px;
    }

</style>
