<template>
    <div>
        <div class="row">
            <div class="col-10">
                <p class="h3 lead">Requisition {{requisition.name}}</p>
            </div>
            <div class="col-2">
                <button type="button" name="send" v-on:click="$emit('sendClick', requisition)" class="btn btn-primary float-right">Send</button>
            </div>
        </div>

        <div class="accordion">
            <div class="card">
                <div class="card-header" id="publisherHeading">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#publisherOneCollapse" aria-expanded="true" aria-controls="publisherOneCollapse">
                            Publisher
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
                            Subscription
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
                    name: 'Stacker',
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
    .hello {
        padding-top: 75px;
    }
</style>
