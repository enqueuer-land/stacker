<template>
    <div>
        <label>Expect</label>
        <input type="text" v-model="input.expect" /><br/>
        <label>to Be Equal To</label>
        <input type="text" v-model="input.toBeEqualTo" />
    </div>
</template>

<script lang="ts">
    export default {
        name: 'assertion',
        data() {
            return {
                input: {
                    expect: '',
                    toBeEqualTo: ''
                }
            }
        },
        mounted() {
            this.$emit("input", this.input);
        },
        watch: {
            'input.expect'() {
                this.$emit("input", this.input);
            },
            'input.toBeEqualTo'() {
                this.$emit("input", this.input);
            }

        }
    }
</script>
