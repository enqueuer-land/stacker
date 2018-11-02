<template>
    <div class="result-tree">
        <ul class="list-unstyled">
            <result-node :node="$store.state.result"/>
        </ul>
    </div>
</template>

<script>
    import ResultNode from './ResultNode';

    export default {
        //
        name: 'ResultTree',
        components: {
            ResultNode
        }
    }
</script>

<style scoped>
    .result-tree {
    }

</style>
