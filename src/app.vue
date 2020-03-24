<template>
    <div id="app">
        <Main></Main>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Main from "@/views/main";
    import Payload from '@/inputs/payload';
    import '@/renderer/menu-window-event-listener';
    import StackerList from '@/inputs/stacker-list';
    import StackerInput from '@/inputs/stacker-input';
    import KeyValueTable from '@/inputs/key-value-table';
    import DropdownSelector from "@/inputs/dropdown-selector";
    import SubscriptionCommons from '@/inputs/subscription-commons';

    Vue.component('Payload', Payload);
    Vue.component('StackerList', StackerList);
    Vue.component('StackerInput', StackerInput);
    Vue.component('KeyValueTable', KeyValueTable);
    Vue.component('DropdownSelector', DropdownSelector);
    Vue.component('SubscriptionCommons', SubscriptionCommons);

    export default {
        components: {Main},
        mounted() {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    console.log('document is hidden');
                } else {
                    console.log('document is being shown');
                }
            })
        }
    };
</script>
