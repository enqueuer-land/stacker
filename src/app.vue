<template>
    <div id="app">
        <Main></Main>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Main from "@/views/main";
    import Payload from '@/inputs/payload'
    import KeyValueTable from '@/inputs/key-value-table'
    import DropdownSelector from "@/inputs/dropdown-selector";

    Vue.component('Payload', Payload);
    Vue.component('KeyValueTable', KeyValueTable);
    Vue.component('DropdownSelector', DropdownSelector);

    export default {
        components: {Main}
    };
</script>
