<template>
    <div>
        <Assertion v-for="assertion in assertions" />
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
                assertions: [{}, {}]
            };
        },
        watch: {
            assertions(val) {
                console.log(val)
            }
        }
    }
</script>
