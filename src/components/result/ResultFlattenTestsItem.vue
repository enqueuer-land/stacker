<template>
    <div :class="resultFlattenTestsItem">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <div class="result-flatten-tests-item-header">
                    <a class="row no-gutters title-class" href="#noPlace">
                        <div class="col align-self-center ml-1 row">
                            <div class="col align-self-center pl-1">
                                {{test.name}}
                            </div>
                            <div class="col-5 align-self-center pl-0" style="font-size: 0.75em; text-align: left">
                                <ol class="breadcrumb mb-0 p-0" style="background-color: transparent">
                                    <li class="breadcrumb-item"
                                        v-for="(breadCrumb, index) in test.hierarchy" :key="index">
                                        <a href="#" :style="breadCrumbStyle(breadCrumb)" class="breadcrumb-anchor"
                                           @click="$store.commit('selectItemById', {router: $router, route: $route, id: breadCrumb.id})">{{breadCrumb.name}}</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div :class="indexClass">
                            #{{index}}
                        </div>
                    </a>
                </div>
            </div>
            <div :id="id" class="collapse">
                <div class="card-body p-0">
                    <ul class="list-unstyled">
                        <li class="pl-3 pt-1 description-class">
                                {{test.description}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {generateId} from '../../tests/id-generator';
    import ComponentManager from "../../tests/component-manager";

    export default {
        name: 'ResultFlattenTestsItem',
        components: {},
        props: {
            test: {},
            index: {}
        },
        data: function () {
            return {
                id: generateId()
            }
        },
        methods: {
        },
        computed: {
            breadCrumbStyle() {
                return function(breadCrumb) {
                    const item = new ComponentManager().findItem(breadCrumb.id);
                    let color = 'var(--text-smooth-color)';
                    if (item) {
                        color = `var(--${item.component}-color)`;
                    }
                    return {
                        'text-decoration': 'none',
                        color
                    }
                }
            },
            indexClass: function () {
                return {
                    'index-class': true,
                    'align-self-center': true,
                    'col-1': true
                }
            },
            resultFlattenTestsItem: function () {
                return {
                    'valid-result-flatten-tests-item': this.test.valid,
                    'invalid-result-flatten-tests-item': !this.test.valid,
                    'mb-0 mt-0': true
                }
            }
        }
    }
</script>

<style scoped>

    .breadcrumb-item:nth-child(1)::before {
        display: none !important;
    }

    .breadcrumb-item::before {
        content: '›';
    }

    .breadcrumb-item a:hover {
        color: white;
    }

    .valid-result-flatten-tests-item {
        /*background-color: var(--stacker-background-color);*/
        /*border-top: 1px var(--passing-test-color) solid;*/
        border-left: 2px var(--passing-test-color) solid;
        /*border-right: 2px var(--passing-test-color) solid;*/
    }

    .invalid-result-flatten-tests-item {
        /*background-color: var(--stacker-background-color);*/
        /*border-top: 1px var(--failing-test-color) solid;*/
        border-left: 2px var(--failing-test-color) solid;
        /*border-right: 2px var(--failing-test-color) solid;*/
    }

    .result-flatten-tests-item-header {
        height: 100%;
        padding-left: 1px;
        background-color: var(--stacker-background-color);
    }

    .result-flatten-tests-item-header > a {
        color: var(--text-smooth-color);
        height: inherit;
    }

    .result-flatten-tests-item-header > a:focus {
        color: white;
    }

    .result-flatten-tests-item-header > a:hover {
        color: white;
        /*border-left: 4px solid;*/
    }
    .result-flatten-tests-item-header > a {
        /*color: var(--text-smooth-color);*/
    }

    .list-unstyled > li > a {
        color: var(--text-smooth-color);
    }

    .list-unstyled > li > a:hover {
        color: white;
    }

    .list-unstyled > li > a:focus {
        color: white;
        background-color: var(--stacker-background-alternative-color);
    }

    .breadcrumb-anchor a:hover {
        color: white;
    }

    .index-class {
        font-size: 0.75em;
        text-align: center;
        color: var(--text-smooth-color);
    }

    .description-class {
        font-size: 0.8em;
        min-height: 28px;
        color: var(--text-smooth-color);
        background-color: var(--stacker-background-alternative-color);
        border-bottom: 2px solid var(--stacker-header-background-color);
        border-left: 1px solid var(--stacker-header-background-color);
    }

    .title-class {
        text-decoration: none;
        min-height: 28px;
        border-bottom: 1px solid var(--stacker-background-alternative-color);
        background-color: var(--stacker-background-color);
    }
</style>
