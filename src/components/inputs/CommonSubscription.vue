<template>
    <div class="common-subscription container-fluid">
        <div class="row">
            <div class="col-3 pr-2 pt-2 pl-2">
                <div class="row">
                    <div class="col" style="font-size: 0.8em; color: white">
                        Timeout
                    </div>
                </div>
                <div class="row pl-2">
                    <div class="input-group input-group-sm mb-0 pl-2">
                        <input v-model="input.timeout" placeholder="3000" type="text" class="form-control"
                               style="background-color: transparent; color: white">
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 pr-2 pt-4 pl-2">
                <rounded-switch v-model="input.avoid" label="avoid"/>
            </div>
        </div>
    </div>
</template>
<script>

    import RoundedSwitch from "./RoundedSwitch";

    export default {
        name: 'CommonSubscription',
        components: {RoundedSwitch},
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
