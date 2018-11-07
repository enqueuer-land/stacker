<template>
    <div :class="resultFlattenTestsItem">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <div class="result-flatten-tests-item-header">
                    <a :class="lineClass(index)" href="#noPlace" style="text-decoration: none">
                        <div class="col align-self-center">
                            <a href="#noPlace">
                                <i v-show="test.valid" style="color: var(--passing-test-color)" class="material-icons">check_circle_outline</i>
                                <i v-show="!test.valid" style="color: var(--failing-test-color)" class="material-icons">highlight_off</i>
                            </a>
                        </div>
                        <div class="col-11 align-self-center ml-1 row">
                            <div class="col-5 align-self-center pl-0" style="font-size: 0.75em; text-align: left">
                                {{test.hierarchy.filter((_, index) => index > 0).map(item => item.name).join(' › ')}}
                            </div>
                            {{ ' ' + test.name}}
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
    .valid-result-flatten-tests-item {
        background-color: var(--stacker-background-color);
        border-top: 1px var(--passing-test-color) solid;
        border-left: 8px var(--passing-test-color) solid;
        border-right: 8px var(--passing-test-color) solid;
    }

    .invalid-result-flatten-tests-item {
        background-color: var(--stacker-background-color);
        border-top: 1px var(--failing-test-color) solid;
        border-left: 8px var(--failing-test-color) solid;
        border-right: 8px var(--failing-test-color) solid;
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
