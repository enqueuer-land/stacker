<template>
    <div>
        <label>Script</label><br/>
        <textarea rows="4" cols="50" v-model="script" placeholder="js code"></textarea>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'EventScript',
        props: ['default'],
        mounted() {
            this.script = this.default;
        },
        data() {
            return {
                script: this.value
            }
        },
        watch: {
            code(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
