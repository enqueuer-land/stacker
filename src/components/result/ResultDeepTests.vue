<template>
    <div class="result-tests mb-0 mt-0">
        <div class="card" style="border: none">
            <div data-toggle="collapse" :data-target="'#' + id">
                <result-item-header :tests="testsSummary" name="Tests" :total-time="node.time.totalTime"/>
            </div>
            <div :id="id" class="collapse" style="font-size: 0.9em">
                <div class="card-body p-0">
                    <ul class="list-unstyled">
                        <li v-for="(test, index) in testsSummary.getTests()" :key="index">
                            <a :class="lineClass(index)" href="#" style="text-decoration: none">
                                <a href="#">
                                    <i v-show="test.valid" style="color: var(--passing-test-color)" class="material-icons">check_circle_outline</i>
                                    <i v-show="!test.valid" style="color: var(--failing-test-color)" class="material-icons">highlight_off</i>
                                </a>
                                <div :class="indexClass">
                                    #{{index}}
                                </div>
                                <!--<div class="col align-self-center">-->
                                    <!--{{test.hierarchy.join(' › ')}}-->
                                <!--</div>-->
                                <div class="col align-self-center">
                                    {{test.name}}
                                </div>
                                <!--<div class="col align-self-center">-->
                                    <!--{{test.description}}-->
                                <!--</div>-->
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
    import DeepTestsSummary from "../../tests/deep-tests-summary";

    export default {
        name: 'ResultDeepTests',
        components: {ResultItemHeader},
        props: {
            node: {}
        },
        data: function () {
            let testsSummary = new DeepTestsSummary();
            testsSummary.addTest(this.node);
            testsSummary.getTests().forEach(test => test.id = generateId());
            return {
                id: generateId(),
                testsSummary: testsSummary
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
            indexClass: function() {
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
    .result-tests {
        border-bottom: 1px solid #4d4d4d;
        padding-left: 6px;
        background-color: #2b2b2b;
        border-top: 1px var(--passing-test-color) solid;
        border-left: 8px var(--passing-test-color) solid;
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
