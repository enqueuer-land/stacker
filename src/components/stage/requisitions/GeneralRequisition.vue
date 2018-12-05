<template>
    <div class="general-requisition container-fluid">
        <div class="row">
            <div class="col pr-2">
                <div class="row">
                    <div class="pl-3 pt-2" style="font-size: 0.8em; color: var(--text-color)">
                        Time out
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-3 pr-3">
                        <input v-model="timeout" type="text" class="form-control"
                               style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)"
                               placeholder="5000">
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col pl-0 pr-2">
                <div class="row">
                    <div class="pl-3 pt-2" style="font-size: 0.8em; color: var(--text-color)">
                        Delay
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-3 pr-3">
                        <input v-model="delay" type="text" class="form-control"
                               style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)"
                               placeholder="0">
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col pl-0">
                <div class="row">
                    <div class="pl-3 pt-2" style="font-size: 0.8em; color: var(--text-color)">
                        Iterations
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-3 pr-3">
                        <input v-model="iterations" type="text" class="form-control"
                               style="background-color: transparent; color: var(--text-color); border-color: var(--stacker-background-alternative-color)"
                               placeholder="1">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'GeneralRequisition',
        props: {
            item: {},
        },
        data: function () {
            const defaultItem = this.item || {};
            return {
                timeout: defaultItem.timeout,
                iterations: defaultItem.iterations,
                delay: defaultItem.delay,
            }
        },
        methods: {
            emit() {
                const payload = {
                    timeout: this.timeout,
                    iterations: this.iterations,
                    delay: this.delay,
                };
                this.$emit('input', payload);
            },
        },
        watch: {
            timeout() {
                this.emit();
            },
            iterations() {
                this.emit();
            },
            delay() {
                this.emit();
            },
            item() {
                this.timeout = this.item.timeout;
                this.iterations = this.item.iterations;
                this.delay = this.item.delay;

            }
        }
    }
</script>

<style scoped>
    .general-requisition {

    }

</style>
