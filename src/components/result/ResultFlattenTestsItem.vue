<template>
    <div :class="resultFlattenTestsItem">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <div class="result-flatten-tests-item-header">
                    <a :class="lineClass(index)" href="#noPlace" style="text-decoration: none">
                        <div class="col align-self-center">
                                <i v-show="test.valid" style="color: var(--passing-test-color)" class="material-icons">check_circle_outline</i>
                                <i v-show="!test.valid" style="color: var(--failing-test-color)" class="material-icons">highlight_off</i>
                        </div>
                        <div class="col-11 align-self-center ml-1 row">
                            <div class="col align-self-center pl-1">
                                {{test.name}}
                            </div>
                            <div class="col-6 align-self-center pl-0" style="font-size: 0.75em; text-align: left">
                                <ol class="breadcrumb mb-0 p-0" style="background-color: transparent">
                                    <li class="breadcrumb-item"
                                        v-for="(breadCrumb, index) in test.hierarchy.filter((_, index) => index > 0)" :key="index">
                                        <a href="#">{{breadCrumb.name}}</a>
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
                        <li>
                            <a :class="lineClass(index)" href="#noPlace" style="text-decoration: none">
                                <div class="align-self-center col pl-1" style="font-size: 0.8em">
                                    {{test.description}}
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {generateId} from '../../tests/id-generator';

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
            lineClass: function () {
                return {
                    'even-class': this.index % 2 === 0,
                    'odd-class': this.index % 2 === 1,
                    'row': true,
                    'no-gutters': true
                }
            },
        },
        computed: {
            indexClass: function () {
                return {
                    'index-class': true,
                    'align-self-center': true,
                    'col': true
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
        background-color: var(--stacker-background-color);
        border-top: 1px var(--passing-test-color) solid;
        border-left: 6px var(--passing-test-color) solid;
        border-right: 6px var(--passing-test-color) solid;
    }

    .invalid-result-flatten-tests-item {
        background-color: var(--stacker-background-color);
        border-top: 1px var(--failing-test-color) solid;
        border-left: 6px var(--failing-test-color) solid;
        border-right: 6px var(--failing-test-color) solid;
    }

    .result-flatten-tests-item-header {
        height: 100%;
        padding-left: 1px;
        background-color: var(--stacker-background-color);
    }

    .result-flatten-tests-item-header a {
        color: var(--index-color);
        height: inherit;
    }

    a:focus {
        color: white;
    }

    a:hover {
        color: white;
        /*border-left: 4px solid;*/
    }

    a {
        color: var(--index-color);
    }

    .even-class {
        height: 30px;
        border-bottom: 1px solid var(--stacker-background-alternative-color);
        padding-left: 1px;
        background-color: var(--stacker-background-color);
    }

    .odd-class {
        height: 30px;
        border-bottom: 1px solid var(--stacker-background-color);
        padding-left: 1px;
        background-color: var(--stacker-background-alternative-color);
    }

    .index-class {
        font-size: 0.75em;
        text-align: center;
        color: var(--index-color);
    }

</style>
