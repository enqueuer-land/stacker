<template>
    <div class="general-requisition container-fluid">
        <div class="row">
            <div class="col pr-2">
                <div class="row">
                    <div class="pl-3 pt-2 stacker-label">
                        Time out
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-3 pr-3">
                        <stacker-input v-model="timeout" class="form-control" placeholder="5000"></stacker-input>
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col pl-0 pr-2">
                <div class="row">
                    <div class="pl-3 pt-2 stacker-label">
                        Delay
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-3 pr-3">
                        <stacker-input v-model="delay" class="form-control" placeholder="0"></stacker-input>
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col pl-0">
                <div class="row">
                    <div class="pl-3 pt-2 stacker-label">
                        Iterations
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-3 pr-3">
                        <stacker-input v-model="iterations" class="form-control" placeholder="1"></stacker-input>
                    </div>
                </div>
            </div>
        </div>

        <div class="row py-5">
            <button type="button" class="btn btn-sm col mx-3 add-button"
                    style="border-color: var(--requisition-color); color: var(--requisition-color);"
                    @click="newRequisition">
                New requisition
            </button>
            <button type="button" class="btn btn-sm col mx-3 add-button"
                    style="border-color: var(--publisher-color); color: var(--publisher-color);"
                    @click="newPublisher">
                New publisher
            </button>
            <button type="button" class="btn btn-sm col mx-3 add-button"
                    style="border-color: var(--subscription-color); color: var(--subscription-color);"
                    @click="newSubscription">
                New subscription
            </button>

        </div>
    </div>
</template>

<script>

    import StackerInput from "../../inputs/StackerInput";

    export default {
        name: 'GeneralRequisition',
        components: {StackerInput},
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
            newRequisition() {
                this.$store.commit('addRequisition', {parent: this.item, router: this.$router});
            },
            newPublisher() {
                this.$store.commit('addPublisher', {parent: this.item, router: this.$router});
            },
            newSubscription() {
                this.$store.commit('addSubscription', {parent: this.item, router: this.$router});
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

    .add-button {
        background-color: transparent;
    }

    .add-button:hover, .add-button.hover {
        outline: 0;
        /*background-color: var(--stacker-background-alternative-color);*/
        box-shadow: 0 0 15px var(--enqueuer-color);
    }

</style>
