<template>
    <prism-editor language="js" lineNumbers :code="code" @change="onChange"
                  style="min-height: 300px; max-height: 400px;">
    </prism-editor>
</template>
<script>
    import Vue from 'vue';
    import "prismjs";
    import "prismjs/themes/prism-tomorrow.css";
    import PrismEditor from 'vue-prism-editor'
    import "vue-prism-editor/dist/VuePrismEditor.css";

    export default Vue.extend({
        name: 'Payload',
        components: {
            PrismEditor
        },
        props: {
            code: String
        },
        methods: {
            onChange: function (value) {
                return this.$emit('change', value);
            }
        }
    });
</script>
<style type="text/css" scoped>
</style>
