<template>
    <div class="stage">
        <key-value-input v-model="keyValue" title="Title"/>
        <!--<router-view />-->
        <pre style="color: white"><code>{{keyValue}}</code></pre>
    </div>
</template>

<script>
    import KeyValueInput from "../inputs/KeyValueInput";
    export default {
        name: 'Stage',
        components: {KeyValueInput},
        data: function() {
            return {
                keyValue: {}
            }
        }
    }
</script>

<style scoped>
    .stage {
        height: 100vh;
        background-color: var(--stacker-background-color);
        border-left: 1px solid var(--stacker-background-alternative-color);
    }

</style>
