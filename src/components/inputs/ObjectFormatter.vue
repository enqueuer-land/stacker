<template>
    <div class="object-formatter container-fluid">
        <div class="row" style="background-color: var(--stacker-background-alternative-color); border-radius: 4px;">
            <div class="btn-group btn-group-toggle btn-group-sm" data-toggle="buttons">
                <a v-for="(formatter, index) in formatters" :key="index" @click="selectIndex(index)" href="#"
                   :class="['btn', index === selectedIndex ? 'active enabled-label' : 'disabled-label']"
                >
                    <input type="radio" name="formatters">{{formatter.name}}
                </a>
            </div>
        </div>
        <div class="row">
            <prism-editor v-model="payload" lineNumbers language="js" rows="10"
                          style="background-color: transparent; color: var(--text-color); font-size: 14px; font-weight: lighter; border-radius: 4px;">
            </prism-editor>
        </div>
        <div v-if="alert !== null" class="row" style="">
            <div class="alert alert-warning mb-0 col align-self-center p-1" role="alert"
                 style="width: 100%; font-size: 14px; font-weight: lighter; border-radius: 0 0 2px 2px;">
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
                alert: null,
                selectedIndex: content.selectedIndex,
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
                this.checkSyntax();
                this.emit();
            }
        },
        methods: {
            getContent() {
                const defaultFormatterIndex = defaultFormatters.findIndex(formatter => formatter.raw);
                if (this.text && this.format) {
                    const formatterIndex = defaultFormatters.findIndex(formatter => formatter.name.toLowerCase() === this.format.toLowerCase());
                    const formatter = defaultFormatters[formatterIndex];
                    try {
                        formatter.stringify(formatter.parse(this.text));
                        return {
                            payload: formatter.stringify(formatter.parse(this.text)),
                            selectedIndex: formatterIndex
                        }
                    } catch (err) {
                    }
                }
                return {
                    payload: this.text,
                    selectedIndex: defaultFormatterIndex
                }
            },
            selectIndex(index) {
                this.selectedIndex = index;
                if (this.checkSyntax()) {
                    const formatter = this.formatters[this.selectedIndex];
                    this.payload = formatter.stringify(formatter.parse(this.payload));
                }
                this.emit();
            },
            checkSyntax() {
                this.alert = null;
                try {
                    this.formatters[this.selectedIndex].parse(this.payload);
                    return true;
                } catch (err) {
                    this.alert = err.toString();
                }
                return false;
            },
            emit() {
                const format = defaultFormatters[this.selectedIndex].name.toLowerCase();
                this.$emit('update:text', this.payload);
                this.$emit('update:format', format);
            }
        },
    }
</script>

<style scoped>
    .object-formatter {
        border: var(--stacker-background-alternative-color) 1px solid;
        border-radius: 4px;
    }

    .enabled-label {
        border-left: 6px solid var(--text-color);
        background-color: var(--stacker-background-color);
        color: var(--text-color);
    }

    .disabled-label {
        color: var(--text-smooth-color)
    }

    .btn-group-toggle > a:hover {
        background-color: var(--stacker-background-color);
        /*color: var(--text-color);*/
    }

</style>
