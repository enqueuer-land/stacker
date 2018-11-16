<template>
    <div class="result">
        <div >
            <result-header :result="result"/>
            <result-tree :result="result" />
        </div>
    </div>
</template>

<script>
import ResultHeader from "./ResultHeader";
import ResultTree from "./ResultTree";

export default {
    name: 'Result',
    components: {
        ResultHeader,
        ResultTree
    },
    data() {
        const results = this.$store.state.results;
        return {
            result: results[results.length - 1]
        }
    },
    watch: {
        '$store.state.results'() {
            const results = this.$store.state.results;
            this.result = this.$store.state.results[results.length - 1];
        }
    }
}
</script>

<style scoped>
    .result {
        height: 100vh;
        background-color: var(--stacker-background-color);
        border-left: 1px solid var(--stacker-background-alternative-color);
    }

</style>
