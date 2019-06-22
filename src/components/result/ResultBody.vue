<template>
    <div class="result-body">
        <ul class="list-unstyled">
            <result-flatten-tests :nodes="results"/>
        </ul>
    </div>
</template>

<script>
    import ResultFlattenTests from "./flatten/ResultFlattenTests";

    export default {
        name: 'ResultBody',
        props: {
            results: {}
        },
        components: {
            ResultFlattenTests
        },
        watch: {
            results() {
                console.log('Result tree got it');
            }
        }
    }
</script>

<style scoped>
    .result-body {

    }

</style>
