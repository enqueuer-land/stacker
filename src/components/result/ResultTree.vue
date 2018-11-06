<template>
    <div class="result-tree">
        <ul class="list-unstyled">
            <result-flatten-tests :node="$store.state.result"/>
        </ul>
    </div>
</template>

<script>
    import ResultFlattenTests from "./ResultFlattenTests";

    export default {
        name: 'ResultTree',
        components: {
            ResultFlattenTests
        }
    }
</script>

<style scoped>
    .result-tree {
    }

</style>
