<template>
    <div>
        <label>OnMessageReceived</label><br/>
        <textarea name="onMessageReceived" rows="4" cols="50" v-model="code" placeholder="js code"></textarea>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'OnMessageReceived',
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
