<template>
    <div>
        <Input v-model="input.expect" label="Expect" :default="input.expect"/>
        <Input v-model="input.toBeEqualTo" label="ToBeEqualTo" :default="input.toBeEqualTo"/>
    </div>
</template>

<script lang="ts">
    import * as Input from '../../form/Input';

    export default {
        name: 'assertion',
        components: {
            Input
        },
        props: ['init'],
        data() {
            return {
                input: {
                    expect: this.init.expect,
                    toBeEqualTo: this.init.toBeEqualTo
                }
            }
        },
        mounted() {
            this.$emit("input", this.input);
        }
    }
</script>
