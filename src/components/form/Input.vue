<template>
    <div>
        <label>{{label}}</label>
        <input rows="4" cols="50" type="text" v-model="code" placeholder="insert something" />
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
