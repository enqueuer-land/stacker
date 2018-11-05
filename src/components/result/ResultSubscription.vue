<template>
    <div class="result-subscription mb-0 mt-0">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <result-item-header :tests="tests" :name="subscription.name"/>
            </div>
            <div :id="id" class="collapse" style="font-size: 0.8em">
                <div class="card-body p-0">
                    <ul class="list-unstyled">
                        <li v-for="(test, index) in tests.getTests()" :key="index">
                            <a :class="lineClass(index)" href="#" style="text-decoration: none">
                                <a href="#">
                                    <i v-show="test.valid" style="color: var(--passing-test-color)"
                                       class="material-icons">check_circle_outline</i>
                                    <i v-show="!test.valid" style="color: var(--failing-test-color)"
                                       class="material-icons">highlight_off</i>
                                </a>
                                <div :class="indexClass">
                                    #{{index}}
                                </div>
                                <div class="col-3 align-self-center">
                                    {{test.name}}
                                </div>
                                <div class="col align-self-center">
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
    import ResultItemHeader from "./ResultItemHeader";
    import {generateId} from '../../tests/id-generator';
    import TestsSummary from "../../tests/tests-summary";

    export default {
        name: 'ResultSubscription',
        components: {ResultItemHeader},
        props: {
            subscription: {}
        },
        data: function () {
            let test = new TestsSummary().addTest(this.subscription.testSummary);
            return {
                id: generateId(),
                node: test
            }
        },
        methods: {
            lineClass: function(index) {
                return {
                    'even-class': index % 2 === 0,
                    'odd-class': index % 2 === 1,
                    'row no-gutters': true
                }
            },
        },
        computed: {
            indexClass: function () {
                return {
                    'align-self-center': true,
                    'index': true,
                    'col-1': true,
                    'ml-1': true
                }
            },
        }
    }
</script>

<style scoped>
    .result-subscription {
        border-bottom: 1px solid #4d4d4d;
        padding-left: 6px;
        background-color: #2b2b2b;
        border-top: 1px var(--subscription-color) solid;
        border-left: 8px var(--subscription-color) solid;
    }


    a:hover {
        /*background-color: #323232;*/
        color: white;
        height: 30px;
        border-left: 4px solid;
    }

    a {
        color: #bababa;
        height: inherit;
    }

    .even-class {
        height: 30px;
        border-bottom: 1px solid #4d4d4d;
        padding-left: 1px;
        background-color: #2b2b2b;
    }

    .odd-class {
        height: 30px;
        border-bottom: 1px solid #4d4d4d;
        padding-left: 1px;
        background-color: #4d4d4d;
    }

</style>
