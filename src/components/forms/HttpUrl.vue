<template>
    <div>
        <label>Url</label>
        <input rows="4" cols="50" type="text" v-model="code" placeholder="http://localhost:80" />
    </div>
</template>

<script lang="ts">
    export default {
        name: 'HttpUrl',
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
