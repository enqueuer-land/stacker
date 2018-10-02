<template>
    <div>
        <fieldset>
            <label>{{label}}</label>
            <EventScript></EventScript>
            <Assertions ></Assertions>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import * as EventScript from './EventScript';
    import * as Assertions from './Assertions';

    export default {
        name: 'Event',
        components: {Assertions, EventScript},
        props: ['label'],
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
