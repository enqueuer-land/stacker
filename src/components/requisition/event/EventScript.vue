<template>
    <div>
        <label>Script</label><br/>
        <pre>
            <TextArea v-model="script"/>
        </pre>
    </div>
</template>

<script lang="ts">
    import * as TextArea from '../../form/TextArea';

    export default {
        name: 'EventScript',
        components: {TextArea},
        props: ['default'],
        mounted() {
            this.script = this.default;
        },
        data() {
            return {
                script: this.value
            };
        },
        watch: {
            script(val) {
                this.$emit('input', val);
            }
        }
    };
</script>
