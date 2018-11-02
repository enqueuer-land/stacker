<template>
    <div class="result-requisition">
        <a class="row no-gutters" href="#" style="text-decoration: none">
            <div class="col align-self-center">
                {{requisition.name}}
            </div>
            <div :class="testNumberClass">
                {{deepTests.getPassingTests().length}}/{{deepTests.getTests().length}} ({{deepTests.getPercentage()}}%)
            </div>
            <div :class="testClass">
                {{requisition.valid? 'PASS': 'FAIL'}}
            </div>
            <div :class="timeClass">
                {{requisition.time.totalTime}}ms
            </div>
        </a>

    </div>
</template>

<script>
    import DeepTestAnalyzer from '../../tests/deep-tests-analyzer'

    export default {
        name: 'ResultRequisition',
        props: {
            requisition: {},
        },
        data: function () {
            return {
                deepTests: new DeepTestAnalyzer(this.requisition)
            }
        },
        computed: {
            testNumberClass: function() {
                return {
                    'align-self-center': true,
                    'tag': true,
                    'col-2': true,
                    'passing-test-color': this.requisition.valid,
                    'failing-test-color': !this.requisition.valid
                }
            },
            testClass: function() {
                return {
                    'align-self-center': true,
                    'tag': true,
                    'col-1': true,
                    'passing-test-color': this.requisition.valid,
                    'failing-test-color': !this.requisition.valid
                }
            },
            timeClass: function() {
                return {
                    'time': true,
                    'align-self-center': true,
                    'pr-1': true,
                    'col-2': true
                };
            }
        }
    }
</script>

<style scoped>
    .result-requisition {
        height: 30px;
        border-bottom: 1px solid #4d4d4d;
        padding-left: 1px;
        background-color: #2b2b2b;
    }

    .result-requisition > a:hover {
        /*background-color: #323232;*/
        color: white;
        /*border-left: solid var(--requisition-color);*/
    }

    .result-requisition a {
        color: #bababa;
        height: inherit;
    }

    .tag {
        font-size: 0.8em;
        font-weight: bold;
        text-align: right;
        text-transform: uppercase;
    }

    .time {
        font-size: 0.8em;
        text-align: right;
        font-weight: lighter;
        color: var(--passing-test-color);
    }


</style>
