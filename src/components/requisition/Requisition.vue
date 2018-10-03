<template>
    <div >
        <Publisher v-model="publisher" ></Publisher>
    </div>
</template>

<script lang="ts">
    import * as Publisher from './components/publisher/Publisher.vue';

    export default {
        name: 'App',
        components: {
            Publisher
        },
        data() {
            return {
                requisition: [this.publisher],
                publisher: null
            }
        },
    }
</script>

<style lang="css" scoped>
    .hello {
        padding-top: 75px;
    }
</style>
