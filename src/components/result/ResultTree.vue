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
                return this.$store.state.result;
            }
        }
    }
</script>

<style scoped>
    .result-tree {
    }

</style>
