<template>
    <b-container id="result-flatten-tests-item" style="user-select: none">
        <b-row class="pb-1 px-2" no-gutters align-h="between">
            <b-col cols="auto" class="align-self-center pl-1" @click="collapsed = !collapsed">
                <i v-if="test.ignored" class="fas fa-exclamation carabina-icon"
                   style="color: var(--carabina-ignored-test-color)"></i>
                <i v-else-if="test.valid" class="fas fa-check carabina-icon"
                   style="color: var(--carabina-passing-test-color)"></i>
                <i v-else class="fas fa-times  carabina-icon" style="color: var(--carabina-failing-test-color)"></i>
            </b-col>
            <b-col cols="10" class="align-self-center mx-1">
                <b-breadcrumb class="m-0 p-1 carabina-text" :style="breadcrumbStyle">
                    <b-breadcrumb-item
                            v-for="item in test.hierarchy.map(hierarchy => hierarchy).filter((name, index, vec) => !collapsed ? true : (vec.length - index <= 2 ))"
                            :style="breadcrumbItemStyle(item)"
                            :key="item.id" @click="selectComponentById(item.id)">
                        {{item.name}}
                    </b-breadcrumb-item>
                </b-breadcrumb>
                <div class="pl-1 pt-1 carabina-text" :style="textStyle" @dblclick="collapsed = !collapsed">
                    {{test.name || "Skipped"}}
                </div>
                <template v-if="test.description && !collapsed">
                    <b-collapse :visible="!collapsed" :id="test.id"
                                class="p-0 m-0 pt-1 pl-1 carabina-text"
                                style="font-size: 13px; color: var(--carabina-text-darker-color); user-select: text">
                        <div class="pt-3" style="color: var(--carabina-text-color)">Description:</div>
                        <pre class="px-2" style="font-size: 13px; color: var(--carabina-text-color);"><code
                                v-html="syntaxHighlight(test.description)"></code></pre>
                        <div class="pt-3" style="color: var(--carabina-text-color)">Arguments:</div>
                        <pre class="px-2" style="font-size: 13px; color: var(--carabina-text-color);"><code
                                v-html="syntaxHighlight(test.arguments)"></code></pre>

                    </b-collapse>
                </template>
            </b-col>
            <b-col cols="auto" class="align-self-center carabina-text pr-1" style="font-size: 0.85em; cursor: pointer"
                   @click="collapsed = !collapsed">
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
    import {mapGetters, mapMutations} from 'vuex';
    import {ComponentTypes} from "@/components/component-types";

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
            breadcrumbItemStyle: function () {
                return function (item) {
                    const style = {};
                    if (item.type === ComponentTypes.REQUISITION) {
                        style.color = 'var(--carabina-requisition-color) !important';
                    } else if (item.type === ComponentTypes.PUBLISHER) {
                        style.color = 'var(--carabina-publisher-color) !important';
                    } else if (item.type === ComponentTypes.SUBSCRIPTION) {
                        style.color = 'var(--carabina-subscription-color) !important';
                    } else {
                        style.color = 'var(--carabina-text-darker-color) !important';
                    }
                    return style;
                }
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
            ...mapMutations('side-bar', ['selectComponentById']),
            syntaxHighlight: function (value) {
                let json = value;
                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 2);
                }

                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
                    // let color = 'var(--carabina-text-color)'; //number
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            return '<span style="color: var(--carabina-text-darker-color">' + match + '</span>';
                        } else {
                            // color = 'var(--carabina-text-color)'; //string
                        }
                    } else if (/true|false/.test(match)) {
                        // color = 'var(--carabina-text-color)'; //boolean
                    } else if (/null/.test(match)) {
                        // color = 'var(--carabina-text-color)'; //null
                    }
                    return match;
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
        color: unset;
        text-decoration: none;
    }

    .bottom-line {
        border-bottom: 1px solid var(--carabina-header-background-lighter-color);
    }

</style>
