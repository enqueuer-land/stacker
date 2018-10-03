<template>
    <div>
        <label>Assertions</label><br/>
        <div>
            <Assertion>assertions</Assertion>
        </div>
    </div>
</template>

<script lang="ts">
    import * as Assertion from './Assertion';

    export default {
        name: 'Assertions',
        components: {Assertion},
        mounted() {
            // this.code = this.default;
        },
        data() {
            return {
                // code: this.value
            }
        },
        watch: {
            code(val) {
                // this.$emit('input', val);
            }
        }
    }
</script>
