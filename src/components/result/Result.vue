<template>
    <div class="result">
        <result-header />
        <result-tree />
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
    }
}
</script>

<style scoped>
    .result {
        height: 100vh;
        background-color: var(--stacker-background-color);
    }

</style>
