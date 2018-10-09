<template>
    <div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="requisition.name" placeholder="Requisition name">
            <div class="input-group-append">
                <button type="button" name="send" v-on:click="$emit('sendClick', requisition)" class="btn btn-outline-primary">Send</button>
            </div>
        </div>

        <div class="accordion">
            <div class="card">
                <div class="card-header" id="publisherHeading">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#publisherOneCollapse" aria-expanded="true" aria-controls="publisherOneCollapse">
                            <i class="fa fa-chevron-circle-right" ></i>
                            <span class="badge" :class="publisher ? publisher.type: ''">{{(publisher && publisher.type) ? publisher.type.toUpperCase(): ''}}</span>
                            {{(publisher) ? publisher.name: 'Publisher'}}
                        </button>
                    </h5>
                </div>
                <div id="publisherOneCollapse" class="collapse" aria-labelledby="publisherHeading">
                    <div class="card-body">
                        <Publisher v-model="publisher" />
                    </div>
                </div>
            </div>
        </div>
        
        <div class="accordion">
            <div class="card">
                <div class="card-header" id="subscriptionHeading">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#subscriptionOneCollapse" aria-expanded="true" aria-controls="subscriptionOneCollapse">
                            <i class="fa fa-chevron-circle-left" ></i>
                            <span class="badge" :class="subscription ? subscription.type: ''">{{(subscription && subscription.type) ? subscription.type.toUpperCase(): ''}}</span>
                            {{(subscription) ? subscription.name: 'Subscription'}}
                        </button>
                    </h5>
                </div>
                <div id="subscriptionOneCollapse" class="collapse" aria-labelledby="subscriptionHeading">
                    <div class="card-body">
                        <Subscription v-model="subscription" />
                    </div>
                </div>
            </div>
        </div>
        
        
        
    </div>
</template>

<script lang="ts">
    import * as Publisher from './publisher/Publisher.vue';
    import * as Subscription from './subscription/Subsription';

    export default {
        name: 'App',
        components: {
            Publisher,
            Subscription
        },
        data() {
            return {
                requisition: {
                    timeout: 10000,
                    name: '',
                    subscriptions: [],
                    publishers: []
                },
                publisher: null,
                subscription: null
            }
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
    }
</script>

<style lang="css" scoped>
    .http {
        color: #ffffff;
        background-color: #271d94;
        padding-right: 0.6em;
        padding-left: 0.6em;
        border-radius: 10rem;
    }
    .amqp {
        color: #ffffff;
        background-color: #1d9427;
    }
</style>
