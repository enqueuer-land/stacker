<template>
    <div>
        <fieldset>
            <EventScript v-model="script"></EventScript>
            <Assertions v-model="assertions"></Assertions>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import * as EventScript from './EventScript';
    import * as Assertions from './Assertions';

    export default {
        name: 'Event',
        components: {Assertions, EventScript},
        data() {
            return {
                input: {
                },
                script: '',
                assertions: []
            }
        },
        watch: {
            script(val) {
                this.input.script = val;
                this.$emit('input', this.input);
            },
            assertions(val) {
                this.input.assertions = val;
                this.$emit('input', this.input);
            }
        }
    }
</script>
