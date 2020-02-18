<template>
    <b-container id="result-flatten-tests-item">
        <b-row no-gutters class="pb-1" align-h="between">
            <b-col cols="auto" class="align-self-center pl-3 pr-1" v-b-toggle="test.id">
                <i v-if="test.ignored" class="fas fa-times carabina-icon"
                   style="color: var(--carabina-ignored-test-color)"></i>
                <i v-else-if="test.valid" class="fas fa-check carabina-icon"
                   style="color: var(--carabina-passing-test-color)"></i>
                <i v-else class="fas fa-times  carabina-icon" style="color: var(--carabina-failing-test-color)"></i>
            </b-col>
            <b-col cols="9" class="align-self-center px-2">
                <b-breadcrumb class="m-0 pb-1 pt-1 pr-1 pl-1 carabina-text" :style="breadcrumbStyle"
                              :items="test.hierarchy.map(hierarchy => hierarchy.name).filter((name, index, vec) => !collapsed ? true : (vec.length - index <= 2 ))">
                </b-breadcrumb>
                <div class="pl-1 pt-1 carabina-text" :style="textStyle">
                    {{test.name || "Skipped"}}
                </div>
                <b-collapse :id="test.id" v-if="test.description" class="p-0 m-0 pt-1 pl-1 carabina-text"
                            :style="textStyle">
                    <div class="bottom-line mb-3 pt-1"></div>
                    Description:
                    <pre class="px-2 carabina-text" :style="textStyle">{{test.description}}</pre>
                    Arguments:
                    <pre class="px-2 carabina-text" :style="textStyle"><code>{{test.arguments}}</code></pre>
                </b-collapse>
            </b-col>
            <b-col cols="auto" class="align-self-center px-3 carabina-text" style="font-size: 0.85em; cursor: pointer"
                   v-b-toggle="test.id">
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
        data: function () {
            return {
                collapsed: false
            }
        },
        mounted() {
            this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
                if (this.test.id === collapseId) {
                    this.collapsed = !isJustShown;
                }
            })
        },
        computed: {
            ...mapGetters('result', []),
            breadcrumbStyle: function () {
                const style = {
                    'font-size': '14px',
                    'background-color': 'transparent',
                    'overflow-y': 'scroll',
                    width: '100%'
                };
                if (this.collapsed) {
                    style.height = '30px';
                }
                return style;
            },
            textStyle: function () {
                const style = {
                    color: 'var(--carabina-text-color)'
                };
                if (this.collapsed) {
                    style.color = 'var(--carabina-text-darker-color)';
                }
                return style;
            }
        }
    });
</script>
<style type="text/css" scoped>
    #result-flatten-tests-item {
        background-color: var(--carabina-body-background-darker-color);
        padding: 0 !important;
        overflow-y: scroll;
        width: 100%;
    }

    #result-flatten-tests-item:hover .carabina-text {
        color: var(--carabina-text-color);
    }

    .carabina-text {
        color: var(--carabina-text-darker-color);
    }

    .breadcrumb-item a, .breadcrumb-item span {
        cursor: pointer;
        color: var(--carabina-requisition-color);
        text-decoration: none;
    }

    .bottom-line {
        border-bottom: 1px solid var(--carabina-header-background-color);
    }

</style>
