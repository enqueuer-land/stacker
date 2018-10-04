<template>
    <div>




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
        
        
        
    </div>
</template>

<script lang="ts">
    import * as Publisher from './publisher/Publisher.vue';

    export default {
        name: 'App',
        components: {
            Publisher
        },
        data() {
            return {
                requisition: {
                    timeout: 10000,
                    name: 'Stacker',
                    subscriptions: [],
                    publishers: null
                },
                publisher: null
            }
        },
        watch: {
            publisher(val) {
                this.requisition.publishers = [val];
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
