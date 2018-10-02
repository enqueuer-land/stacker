<template>
    <div>
        <label>Method</label>
        <select v-model="code" placeholder="HttpMethod">
            <option value="POST">POST</option>
            <option value="GET">GET</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
        </select>

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
            code: function (val) {
                this.$emit('input', val);
            }
        }
    }
</script>
