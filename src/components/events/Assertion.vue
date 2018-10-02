<template>
    <div>
        <label>Assertion</label><br/>
        <input rows="4" cols="50" type="text" placeholder="expect" />
        <input rows="4" cols="50" type="text" placeholder="toBeEqualTo" />
    </div>
</template>

<script lang="ts">
    export default {
        name: 'assertion',
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
