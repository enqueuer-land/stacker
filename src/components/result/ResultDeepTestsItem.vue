<template>
    <div :class="resultDeepTestsItem">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <div class="result-deep-tests-item-header">
                    <a :class="lineClass(index)" href="#noPlace" style="text-decoration: none">
                        <div class="col align-self-center">
                            <a href="#noPlace">
                                <i v-show="test.valid" style="color: var(--passing-test-color)" class="material-icons">check_circle_outline</i>
                                <i v-show="!test.valid" style="color: var(--failing-test-color)" class="material-icons">highlight_off</i>
                            </a>
                        </div>
                        <div class="col-10 align-self-center ml-1">
                            {{test.name}}
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
                                <div class="col-1 align-self-center pl-1" style="font-size: 0.6em; text-align: left; color: #868686">
                                    Desc.
                                </div>
                                <div class="align-self-center col" style="font-size: 0.8em">
                                    {{test.description}}
                                </div>
                            </a>
                        </li>
                        <li>
                            <a :class="lineClass(index)" href="#noPlace" style="text-decoration: none">
                                <div class="col-1 align-self-center pl-1" style="font-size: 0.6em; text-align: left; color: #868686">
                                    Path
                                </div>
                                <div class="align-self-center col" style="font-size: 0.8em">
                                    {{test.hierarchy.join(' › ')}}
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
        name: 'ResultDeepTestsItem',
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
            resultDeepTestsItem: function () {
                return {
                    'valid-result-deep-tests-item': this.test.valid,
                    'invalid-result-deep-tests-item': !this.test.valid,
                    'mb-0 mt-0': true
                }
            }
        }
    }
</script>

<style scoped>
    .valid-result-deep-tests-item {
        background-color: var(--stacker-background-color);
        border-top: 1px var(--passing-test-color) solid;
        border-left: 8px var(--passing-test-color) solid;
    }

    .invalid-result-deep-tests-item {
        background-color: var(--stacker-background-color);
        border-top: 1px var(--failing-test-color) solid;
        border-left: 8px var(--failing-test-color) solid;
    }

    .result-deep-tests-item-header {
        height: 100%;
        padding-left: 1px;
        background-color: var(--stacker-background-color);
    }

    .result-deep-tests-item-header a {
        color: #bababa;
        height: inherit;
    }

    a:hover {
        color: white;
        border-left: 4px solid;
    }

    a {
        color: #bababa;
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
        font-size: 0.7em;
        text-align: center;
        color: var(--index-color);
    }

</style>
