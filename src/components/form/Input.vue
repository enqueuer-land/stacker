<template>
    <div>
        <label>{{label}}</label>
        <input type="text" class="form-control" v-model="code" placeholder="insert something">
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Input',
        props: ['default', 'label'],
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
