<template>
    <div>
        <label>Script</label><br/>
        <textarea rows="1" cols="100" v-model="script" placeholder="js code"></textarea>
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
            script(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
