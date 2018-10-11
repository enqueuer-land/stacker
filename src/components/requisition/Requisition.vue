<template>
    <div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="init.name" placeholder="Requisition name">
            <div class="input-group-append">
                <button type="button" name="send" v-on:click="$emit('sendClick', requisition)"
                        class="btn btn-outline-primary">Send
                </button>
            </div>
        </div>

        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#requisition-tab" role="tab">General</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#profile" role="tab">OnInit</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#messages" role="tab">OnFinish</a>
            </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div class="tab-pane active" id="requisition-tab" role="tabpanel">
                <div role="tabpanel" class="tab-pane fade active show">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Timeout</span>
                        </div>
                        <input type="text" class="form-control" placeholder="0" v-model="init.timeout">
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Delay</span>
                        </div>
                        <input type="text" class="form-control" placeholder="0" v-model="init.delay">
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Iterations</span>
                        </div>
                        <input type="text" class="form-control" placeholder="1" v-model="init.iterations">
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="profile" role="tabpanel">
                <Event v-model="init.onInit"/>
            </div>
            <div class="tab-pane" id="messages" role="tabpanel">
                <Event v-model="init.onFinish"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import * as Publisher from './publisher/Publisher.vue';
    import * as Subscription from './subscription/Subsription';
    import * as Event from './event/Event';

    export default {
        name: 'App',
        components: {
            Event,
            Publisher,
            Subscription
        },
        props: ['init'],
        mounted() {

        },
        data() {
            return this.init;
        },
        watch: {

            publisher(val) {
                this.requisition.publishers = [val];
                this.$emit('input', this.requisition);

            },
            subscription(val) {
                this.requisition.subscriptions = [val];
                this.$emit('input', this.requisition);

            }
        }
    };
</script>

<style lang="css" scoped>

</style>
