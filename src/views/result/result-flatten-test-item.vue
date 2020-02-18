<template>
    <b-container id="result-flatten-tests-item" v-b-toggle="test.id">
        <b-row no-gutters class="pb-1">
            <b-col cols="auto" class="align-self-center pl-3 pr-1">
                <i v-if="test.ignored" class="fas fa-times carabina-icon"
                   style="color: var(--carabina-ignored-test-color)"></i>
                <i v-else-if="test.valid" class="fas fa-check carabina-icon"
                   style="color: var(--carabina-passing-test-color)"></i>
                <i v-else class="fas fa-times  carabina-icon" style="color: var(--carabina-failing-test-color)"></i>
            </b-col>
            <b-col cols class="align-self-center px-2">
                <b-breadcrumb class="m-0 pb-1 pt-1 pr-1 pl-1 breadcrumb carabina-text" style="font-size: 14px;"
                              :items="test.hierarchy.map(hierarchy => hierarchy.name)">
                </b-breadcrumb>
                <div class="pl-1 pt-1 carabina-text">
                    {{test.name || "Skipped"}}
                </div>
                <b-collapse :id="test.id" v-if="test.description" class="p-0 m-0 pt-1 pl-1 carabina-text"
                            style="font-size: 14px">
                    {{test.description}}
                </b-collapse>
            </b-col>
            <b-col cols="auto" class="align-self-center pr-3 carabina-text" style="font-size: 0.85em">
                #{{test.carabinaMeta.flattenIndex + 1}}
            </b-col>
            <b-col cols="12" class="px-1">
                <div class="bottom-line py-1"></div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css'
    import '@/styles/icons.css'
    import {mapGetters} from 'vuex';

    export default Vue.extend({
        name: 'ResultFlattenTestItem',
        props: {
            test: Object
        },
        computed: {
            ...mapGetters('result', []),
        }
    });
</script>
<style type="text/css" scoped>
    #result-flatten-tests-item {
        background-color: var(--carabina-body-background-darker-color);
        padding: 0 !important;
        overflow-y: scroll;
        width: 100%;
        cursor: pointer;
    }

    #result-flatten-tests-item:hover .carabina-text {
        color: var(--carabina-text-color);
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
        color: var(--carabina-requisition-color);
        text-decoration: none;
    }

    .bottom-line {
        border-bottom: 1px solid var(--carabina-header-background-color);
    }

</style>
