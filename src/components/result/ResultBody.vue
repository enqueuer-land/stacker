<template>
    <div class="result-body">
        <ul class="list-unstyled">
            <result-flatten-tests :node="result"/>
        </ul>
    </div>
</template>

<script>
    import ResultFlattenTests from "./flatten/ResultFlattenTests";

    export default {
        name: 'ResultBody',
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
    .result-body {

    }

</style>
