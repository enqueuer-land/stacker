<template>
    <b-container id="result-flatten-tests-item">
        <b-row class="pb-1 px-3" no-gutters align-h="between">
            <b-col cols="auto" class="align-self-center px-1" v-b-toggle="test.id">
                <i v-if="test.ignored" class="fas fa-exclamation carabina-icon"
                   style="color: var(--carabina-ignored-test-color)"></i>
                <i v-else-if="test.valid" class="fas fa-check carabina-icon"
                   style="color: var(--carabina-passing-test-color)"></i>
                <i v-else class="fas fa-times  carabina-icon" style="color: var(--carabina-failing-test-color)"></i>
            </b-col>
            <b-col class="align-self-center px-1 col-10" @dblclick="$root.$emit('bv::toggle::collapse', test.id)">
                <b-breadcrumb class="m-0 p-1 carabina-text" :style="breadcrumbStyle"
                              :items="test.hierarchy.map(hierarchy => hierarchy.name).filter((name, index, vec) => !collapsed ? true : (vec.length - index <= 2 ))">
                </b-breadcrumb>
                <div class="pl-1 pt-1 carabina-text" :style="textStyle">
                    {{test.name || "Skipped"}}
                </div>
                <b-collapse :visible="!collapsed" :id="test.id" v-if="test.description"
                            class="p-0 m-0 pt-1 pl-1 carabina-text"
                            style="font-size: 14px; color: var(--carabina-text-darker-color);">
                    <div class="pt-3" style="color: var(--carabina-text-color)">Description:</div>
                    <pre class="px-2" style="font-size: 13px; color: var(--carabina-text-darker-color);"><code
                            v-html="syntaxHighlight(test.description)"></code></pre>
                    <div class="pt-3" style="color: var(--carabina-text-color)">Arguments:</div>
                    <pre class="px-2" style="font-size: 13px; color: var(--carabina-text-darker-color);"><code
                            v-html="syntaxHighlight(test.arguments)"></code></pre>
                </b-collapse>
            </b-col>
            <b-col cols="auto" class="align-self-center carabina-text px-1" style="font-size: 0.85em; cursor: pointer"
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
            test: Object,
            expanded: {
                default: false
            }
        },
        data: function () {
            return {
                collapsed: !this.expanded
            }
        },
        mounted() {
            this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
                if (this.test.id === collapseId) {
                    this.collapsed = !isJustShown;
                }
            });
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
        },
        methods: {
            syntaxHighlight: function (value) {
                let json = value;
                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 2);
                }

                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
                    let color = 'var(--carabina-text-color)'; //number
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            color = 'var(--carabina-text-darker-color)'; //key
                        } else {
                            color = 'var(--carabina-text-color)'; //string
                        }
                    } else if (/true|false/.test(match)) {
                        color = 'var(--carabina-text-color)'; //boolean
                    } else if (/null/.test(match)) {
                        color = 'var(--carabina-text-color)'; //null
                    }
                    return '<span style="color:' + color + '">' + match + '</span>';
                });
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

    .breadcrumb-item a {
        color: var(--carabina-requisition-color);
        text-decoration: none;
    }

    .bottom-line {
        border-bottom: 1px solid var(--carabina-header-background-lighter-color);
    }

</style>
