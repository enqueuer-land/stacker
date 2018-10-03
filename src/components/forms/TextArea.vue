<template>
    <div>
        <label>Payload</label><br/>
        <textarea rows="4" cols="50" v-model="code" placeholder="payload"></textarea>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'TextArea',
        props: ['default'],
        mounted() {
            this.code = this.default;
        },
        data() {
            return {
                code: this.value
            }
        },
        watch: {
            code(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
