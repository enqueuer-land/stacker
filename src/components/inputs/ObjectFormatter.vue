<template>
    <div class="object-formatter container-fluid">
        <div class="row" style="background-color: var(--stacker-background-alternative-color); border-radius: 4px;">
            <div class="btn-group btn-group-toggle btn-group-sm" data-toggle="buttons">
                <label v-for="(formatter, index) in formatters" :key="index" @click="selectedIndex = index"
                       :class="['btn', index === selectedIndex ? 'active enabled-label' : 'disabled-label']"
                >
                    <input type="radio" name="formatters">{{formatter.name}}
                </label>
            </div>
        </div>
        <div class="row">
            <prism-editor v-model="payload" lineNumbers language="js" rows="10"
                          style="background-color: transparent; color: white; font-size: 14px; font-weight: lighter; border-radius: 4px;">
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

    const defaultFormatters = [
        {
            name: 'Raw',
            stringify(formatted) {
                return formatted;
            },
            parse: (stringified) => {
                return stringified;
            }
        },
        {
            name: 'JSON',
            default: true,
            stringify(formatted) {
                return JSON.stringify(formatted, null, 4)
            },
            parse: (stringified) => {
                return JSON.parse(stringified);
            }
        }
    ];

    export default {
        name: 'ObjectFormatter',
        components: {PrismEditor},
        props: {
            value: ''
        },
        data: function () {
            let content = this.getContent();
            return {
                payload: content.payload,
                alert: null,
                selectedIndex: content.selectedIndex,
                formatters: defaultFormatters,
            }
        },
        watch: {
            selectedIndex() {
                this.update();
            },
            payload() {
                this.update();
            }
        },
        methods: {
            getContent() {
                console.log('Getting content');
                if (typeof (this.value) === 'object') {
                    return {
                        payload: JSON.stringify(this.value, null, 4),
                        selectedIndex: defaultFormatters.findIndex(formatter => !!formatter.default),
                    }
                }
                let stringifiedValue = this.value ? this.value.toString(): '';
                defaultFormatters
                    .filter(formatter => !formatter.default)
                    .forEach((formatter, index) => {
                        try {
                            const formatted = formatter.parse(stringifiedValue);
                            return {
                                payload: formatter.stringify(formatted),
                                selectedIndex: index,
                            }
                        }
                        catch (e) {
                        }
                    });
                return {
                    payload: stringifiedValue,
                    selectedIndex: 0
                }
            },
            update() {
                this.alert = null;
                try {
                    const formatted = this.formatters[this.selectedIndex].parse(this.payload);
                    this.payload = this.formatters[this.selectedIndex].stringify(formatted);
                    this.$emit('input', formatted);
                } catch (err) {
                    this.alert = err.toString();
                    this.$emit('input', this.payload);
                }
            }
        },
    }
</script>

<style scoped>
    .object-formatter {
        border: white 1px solid;
        border-radius: 4px;
    }

    .enabled-label {
        border-left: 6px solid white;
        background-color: var(--stacker-background-color);
        color: white;
    }

    .disabled-label {
        color: var(--index-color)
    }

</style>
