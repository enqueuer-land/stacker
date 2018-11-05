<template>
    <div class="result-tree">
        <ul class="list-unstyled">
            <!--<result-requisition :requisition="$store.state.result"/>-->
            <result-deep-tests :node="$store.state.result"/>
        </ul>
    </div>
</template>

<script>
    // import ResultRequisition from './ResultRequisition';
    import ResultDeepTests from "./ResultDeepTests";

    export default {
        name: 'ResultTree',
        components: {
            ResultDeepTests,
            // ResultRequisition
        }
    }
</script>

<style scoped>
    .result-tree {
    }

</style>
