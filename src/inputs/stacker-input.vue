<template>
    <b-form-input :placeholder="placeholder"
                  :type="type"
                  :state="state"
                  :value="value"
                  @blur="value => $emit('blur', value)"
                  @input="value => $emit('input', value)"
                  trim>
    </b-form-input>
</template>
<script>
    import Vue from 'vue';
    export default Vue.extend({
        name: 'StackerInput',
        components: {},
        props: ['type', 'placeholder', 'state', 'value']
    });
</script>
