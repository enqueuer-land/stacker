<template>
    <div class="mb-0 mt-0" :style="resultFlattenTestsItem">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <div class="result-flatten-tests-item-header">
                    <div class="row no-gutters title-class" style="cursor: pointer;">
                        <div class="col align-self-center ml-1">
                            <div class="pl-0 pr-0" style="font-size: 0.75em; text-align: left">
                                <ol class="breadcrumb mb-0 p-0" style="background-color: transparent">
                                    <li class="breadcrumb-item"
                                        v-for="(breadCrumb, index) in test.hierarchy" :key="index">
                                        <span :style="breadCrumbStyle(breadCrumb)" class="breadcrumb-anchor"
                                           @click="$store.commit('selectItemById', {router: $router, route: $route, id: breadCrumb.id})">{{breadCrumb.name}}</span>
                                    </li>
                                </ol>
                            </div>
                            <div class="align-self-center pl-1 test-name-class">
                                {{test.name}}
                            </div>
                        </div>
                        <div :class="indexClass">
                            #{{index}}
                        </div>
                    </div>
                </div>
            </div>
            <div :id="id" class="collapse">
                <div class="card-body p-0">
                    <ul class="list-unstyled">
                        <li class="description-class pt-1 pl-2">
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
        data() {
            return {
                id: generateId()
            }
        },
        watch: {
            test() {
                this.openCloseEffect();
            }
        },
        methods: {
            openCloseEffect() {
                $('#' + this.id).removeClass('show');

                // setTimeout(() => {
                //     $('#' + this.id).addClass('show');
                //
                //     setTimeout(() => {
                //         $('#' + this.id).removeClass('show');
                //     }, 50);
                //
                // }, this.index * 50);
            }
        },
        computed: {
            breadCrumbStyle() {
                return function (breadCrumb) {
                    const item = new ComponentManager().findItem(breadCrumb.id);
                    let color = 'var(--text-smooth-color)';
                    if (item) {
                        color = `var(--${item.component}-color)`;
                    }
                    return {
                        color,
                        'padding-left': '3px'
                    }
                }
            },
            indexClass: function () {
                return {
                    'index-class': true,
                    'align-self-center': true,
                    'pr-2': true,
                    'col-md-auto': true
                }
            },
            resultFlattenTestsItem: function () {
                return {
                    'border-left': `4px var(--${this.test.valid ? 'passing' : 'failing'}-test-color) solid`
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
        content: '̷';
        color: var(--text-smooth-color);
        padding: 0 5px;
    }

    .breadcrumb-item {
        font-size: 12px;
        padding-left: 3px;
    }

    .breadcrumb-item a:hover {
        text-decoration: none;
        color: var(--text-color);
    }

    .result-flatten-tests-item-header {
        height: 100%;
        padding-left: 1px;
        background-color: var(--stacker-background-color);
    }

    .result-flatten-tests-item-header > div {
        font-weight: lighter;
        font-size: 15px;
        color: var(--text-smooth-color);
        height: inherit;
    }

    .breadcrumb-anchor:hover, .breadcrumb-anchor.hover {
        color: var(--text-color) !important;
    }

    .index-class {
        font-size: 0.75em;
        text-align: center;
        color: var(--text-smooth-color);
    }

    .description-class {
        font-size: 0.85em;
        font-weight: lighter;
        min-height: 32px;
        color: var(--text-color);
        background-color: var(--stacker-background-alternative-color);
        border-top: 1px solid var(--stacker-background-alternative-color);
        border-bottom: 1px solid var(--stacker-header-background-color);
        border-left: 20px solid var(--stacker-background-alternative-color);
    }

    .title-class {
        text-decoration: none;
        min-height: 44px;
        border-top: 1px solid var(--stacker-background-alternative-color);
        background-color: var(--stacker-background-color);
    }

    .test-name-class {
        color: var(--text-smooth-color);
    }

    .title-class:hover, .description-class:hover, .title-class:active, .description-class:active, .test-name-class:hover, .test-name-class:active {
        background-color: var(--stacker-background-alternative-color);
        color: var(--text-color);
    }
</style>
