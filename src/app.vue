<template>
    <div id="app" style="height: 100vh">
        <Main></Main>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Main from "@/views/main";
    import DropdownSelector from "@/views/stage/dropdown-selector";
    import KeyValueTable from '@/views/stage/key-value-table'

    Vue.component('DropdownSelector', DropdownSelector);
    Vue.component('KeyValueTable', KeyValueTable);

    export default {
        components: {Main}
    };
</script>
