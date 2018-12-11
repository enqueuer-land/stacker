<template>
    <div class="mb-0 mt-0" :style="resultFlattenTestsItem">
        <div class="container px-0 test-name-class">
            <div class="row no-gutters">
                <div class="col" data-toggle="collapse" :data-target="'#' + id">
                    <div class="ml-1" style="cursor: pointer;">
                        <div class="px-0 pt-1">
                            <ol class="breadcrumb mb-0 p-0" style="background-color: transparent">
                                <li class="breadcrumb-item" v-for="(breadCrumb, index) in test.hierarchy" :key="index">
                                                <span :style="breadCrumbStyle(breadCrumb)" class="breadcrumb-anchor"
                                                      @click="$store.commit('selectItemById', {router: $router, route: $route, id: breadCrumb.id})">{{breadCrumb.name}}</span>
                                </li>
                            </ol>
                            <div v-if="test.hierarchy === null || test.hierarchy.length === 0" style="height: 12px"></div>
                        </div>
                        <div class="pl-1 pt-1">
                            {{test.name}}
                        </div>
                    </div>
                    <div :id="id" class="collapse">
                        <ul class="p-0 list-unstyled">
                            <li class="description-class pt-1 pl-2">
                                {{test.description}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-auto align-self-center pr-2"
                     style="font-size: 0.75em">
                    #{{index}}
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
                // this.openCloseEffect();
                $('#' + this.id).removeClass('show')
            }
        },
        methods: {
            openCloseEffect() {
                $('#' + this.id).removeClass('show');

                setTimeout(() => {
                    $('#' + this.id).addClass('show');

                    setTimeout(() => {
                        $('#' + this.id).removeClass('show');
                    }, 50);

                }, this.index * 50);
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

    .breadcrumb-anchor:hover, .breadcrumb-anchor.hover {
        color: var(--text-color) !important;
    }

    .description-class {
        font-size: 0.9em;
        font-weight: lighter;
        min-height: 32px;
        border-bottom: 1px solid var(--stacker-header-background-color);
        margin-left: 20px;
        padding-bottom: 10px;
    }

    .test-name-class {
        padding-left: 1px;
        border-top: 1px solid var(--stacker-background-alternative-color);
        min-height: 50px;
        background-color: var(--stacker-background-color);
        color: var(--text-smooth-color);
        font-weight: lighter;
        font-size: 14px;
    }

    .description-class:hover, .description-class:active, .test-name-class:hover, .test-name-class:active {
        background-color: var(--stacker-background-alternative-color);
        color: var(--text-color);
    }
</style>
