<template>
    <div id="app">
        <Main></Main>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Main from "@/views/main";
    import Payload from '@/inputs/payload'
    import '@/renderer/menu-window-event-listener';
    import StackerInput from '@/inputs/stacker-input'
    import KeyValueTable from '@/inputs/key-value-table'
    import DropdownSelector from "@/inputs/dropdown-selector";

    Vue.component('Payload', Payload);
    Vue.component('StackerInput', StackerInput);
    Vue.component('KeyValueTable', KeyValueTable);
    Vue.component('DropdownSelector', DropdownSelector);

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
