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
        props: {
            result: {}
        },
        components: {
            ResultFlattenTests
        },
        watch: {
            result() {
                console.log('Result tree got it');
            }
        }
    }
</script>

<style scoped>
    .result-tree {

    }

</style>
