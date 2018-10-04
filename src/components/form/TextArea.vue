<template>
    <div>
        <textarea class="text-left; form-control" v-model="code" placeholder="payload"></textarea>
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
