<template>
    <div class="common-subscription container-fluid">
        <div class="row">
            <div class="col-3 pr-2 pt-2 pl-2">
                <div class="row">
                    <div class="col stacker-label">
                        Timeout
                    </div>
                </div>
                <div class="row pl-2">
                    <div class="input-group input-group-sm mb-0 pl-2">
                        <stacker-input v-model="input.timeout"
                                       class="form-control"
                                       placeholder="3000"></stacker-input>
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 pr-2 pt-4 pl-2">
                <rounded-switch v-model="input.avoid" label="Avoidable"/>
            </div>
        </div>
    </div>
</template>
<script>

    import RoundedSwitch from "./RoundedSwitch";
    import StackerInput from "./StackerInput";

    export default {
        name: 'CommonSubscription',
        components: {StackerInput, RoundedSwitch},
        props: {
            avoid: {
                default: false
            },
            timeout: {
                default: undefined
            }
        },
        data: function () {
            return {
                input: {
                    avoid: this.avoid,
                    timeout: this.timeout,
                }
            }
        },
        watch: {
            'input.avoid'() {
                this.$emit('update:avoid', this.input.avoid);
            },
            'input.timeout'() {
                this.$emit('update:timeout', this.input.timeout);
            },
            avoid() {
                this.input.avoid = this.avoid;
            },
            timeout() {
                this.input.timeout = this.timeout;
            },
        },
    }
</script>

<style scoped>
    .common-subscription {

    }
</style>
