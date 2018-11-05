<template>
    <div class="result-tree">
        <ul class="list-unstyled">
            <result-deep-tests :node="$store.state.result"/>
        </ul>
    </div>
</template>

<script>
    import ResultDeepTests from "./ResultDeepTests";

    export default {
        name: 'ResultTree',
        components: {
            ResultDeepTests
        }
    }
</script>

<style scoped>
    .result-tree {
    }

</style>
