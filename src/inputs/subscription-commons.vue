<template>
    <b-container fluid>
        <b-row class="m-0 p-0 mb-5" style="width: 100%" no-gutters align-h="between">
            <b-col cols="5" class="align-self-center pl-2">
                <b-form-group
                        class="mb-0 text-label"
                        label="Timeout"
                        label-class="mb-0"
                        label-for="timeout">
                    <stacker-input id="timeout" placeholder="Timeout"
                                   :value="component.timeout"
                                   @input="(value) => $emit('timeoutChanged', value)"
                                   class="text-input carabina-text" trim>
                    </stacker-input>
                </b-form-group>
            </b-col>
            <b-col cols="5" class="align-self-center pr-2">
                <b-form-group
                        class="mb-0 text-label"
                        label="Avoid"
                        label-class="pt-2 mb-0"
                        label-for="avoid">
                    <b-button block id="avoid"
                              :value="component.avoid" :class="[component.avoid ? 'active': '', 'mt-2']"
                              @click="() => {$emit('avoidChanged', !component.avoid); }"
                              variant="carabina">
                        {{component.avoid ? 'Turn off' : 'Turn on'}}
                    </b-button>
                </b-form-group>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';

    export default Vue.extend({
        name: 'SubscriptionCommons',
        props: {
            component: Object
        },
    });
</script>
<style scoped>
    .btn-carabina {
        color: var(--carabina-body-background-darker-color);
        background-color: var(--carabina-subscription-color);
        filter: brightness(40%);
        box-shadow: none;
        border: none;
        transition: all ease 200ms;
    }

    .btn-carabina.active {
        box-shadow: none;
        filter: brightness(100%);
    }

</style>
