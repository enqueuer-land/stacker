<template>
    <div>
        <Publisher v-model="publisher" />
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
