<template>
    <b-container id="result-body" style="overflow-y: scroll; width: 100%; height: 100%">
        <b-row no-gutters v-for="test in filteredFlattenTests" :key="test.id" class="px-2 pb-1 collapsed"
               style="cursor: pointer" v-b-toggle="test.id">
            <b-col cols="auto" class="align-self-center pl-2">
                <i v-if="test.ignored" class="fas fa-times" style="color: var(--carabina-ignored-test-color)"></i>
                <i v-else-if="test.valid" class="fas fa-check" style="color: var(--carabina-passing-test-color)"></i>
                <i v-else class="fas fa-times" style="color: var(--carabina-failing-test-color)"></i>
            </b-col>
            <b-col cols class="align-self-center px-2">
                <b-breadcrumb class="m-0 p-0 pt-1 pl-1 breadcrumb carabina-text" style="font-size: 12px"
                              :items="test.hierarchy.map(hierarchy => hierarchy.name)">
                </b-breadcrumb>
                <div class="pl-1 pt-1 carabina-text">
                    {{test.name || "Skipped"}}
                </div>
                <b-collapse :id="test.id" v-if="test.description" class="p-0 m-0 pt-1 pl-3 carabina-text">
                    {{test.description}}
                </b-collapse>
            </b-col>
            <b-col cols="auto" class="align-self-center pr-2 carabina-text" style="font-size: 0.85em">
                #{{test.carabinaMeta.flattenIndex + 1}}
            </b-col>
            <b-col cols="12" class="px-2">
                <div class="bottom-line py-1"></div>

            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css'
    import {mapGetters} from 'vuex';

    export default Vue.extend({
        name: 'ResultBody',
        computed: {
            ...mapGetters('result', ['filteredFlattenTests']),
        }
    });
</script>
<style type="text/css" scoped>
    #result-body {
        background-color: var(--carabina-body-background-darker-color);
        height: 100%;
        padding: 0 !important;
    }

    .carabina-text {
        color: var(--carabina-text-darker-color);
    }

    .breadcrumb {
        height: 30px;
        background-color: transparent;
        overflow-y: scroll;
        width: 100%;
    }

    .breadcrumb-item:not(.active) a {
        text-decoration: none;
    }

    .bottom-line {
        border-bottom: 1px solid var(--carabina-header-background-color);
    }

    .breadcrumb {
        height: 30px;
        background-color: transparent;
        overflow-y: scroll;
        width: 100%;
    }

    .breadcrumb-item:not(.active) a {
        color: var(--carabina-requisition-color);
        text-decoration: none;
    }

</style>
