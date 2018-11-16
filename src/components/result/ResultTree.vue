<template>
    <div class="result-tree">
        <ul class="list-unstyled">
            <result-flatten-tests :node="result"/>
        </ul>
    </div>
</template>

<script>
    import ResultFlattenTests from "./ResultFlattenTests";

    export default {
        name: 'ResultTree',
        components: {
            ResultFlattenTests
        },
        computed: {
            result() {
                const results = this.$store.state.results;
                return results[results.length - 1];
            }
        }
    }
</script>

<style scoped>
    .result-tree {
    }

</style>
