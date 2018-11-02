<template>
    <div class="result">
        <result-header></result-header>
        <result-tree></result-tree>
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
        background-color: #2b2b2b;
    }

</style>
