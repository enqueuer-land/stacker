<template>
    <div id="app" style="height: 100vh">
        <Main></Main>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Main from "@/views/main";
    import DropdownSelector from "@/inputs/dropdown-selector";
    import KeyValueTable from '@/inputs/key-value-table'
    import Payload from '@/inputs/payload'
    import PluginsLoader from "@/plugins/plugins-loader";
    import {ComponentLoader} from "@/components/component-loader";
    import {EnvironmentLoader} from "@/environments/environment-loader";

    new ComponentLoader().enable();
    new EnvironmentLoader().listenMenuEvents();

    Vue.component('Payload', Payload);
    Vue.component('DropdownSelector', DropdownSelector);
    Vue.component('KeyValueTable', KeyValueTable);
    PluginsLoader.getInstance();

    export default {
        components: {Main}
    };
</script>
