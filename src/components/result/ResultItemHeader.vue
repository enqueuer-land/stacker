<template>
    <div class="result-item-header">
        <a class="row no-gutters" href="#" style="text-decoration: none">
            <div class="col-1 align-self-center">
                <a href="#">
                    <i v-show="tests.isValid()" style="color: var(--passing-test-color)" class="material-icons">check_circle_outline</i>
                    <i v-show="!tests.isValid()" style="color: var(--failing-test-color)" class="material-icons">highlight_off</i>
                </a>
            </div>
            <div class="col-7 align-self-center">
                {{name}}
            </div>
            <div class="col align-self-center">
                <div class="row no-gutters">
                    <div :class="testNumberClass">
                        {{tests.getPassingTests().length}}/{{tests.getTests().length}}
                    </div>
                    <div :class="testNumberClass">
                        {{tests.getPercentage()}}%
                    </div>
                    <div :class="timeClass">
                        <div v-if="totalTime !== undefined" >
                            {{totalTime}}ms
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'ResultItemHeader',
        props: {
            tests: {},
            name: {},
            totalTime: {},
        },
        data: function () {
            return {
            }
        },
        computed: {
            testNumberClass: function () {
                return {
                    'align-self-center': true,
                    'tag': true,
                    'col': true,
                    'passing-test-color': this.tests.isValid(),
                    'failing-test-color': !this.tests.isValid()
                }
            },
            timeClass: function () {
                return {
                    'time': true,
                    'align-self-center': true,
                    'pr-2': true,
                    'col': true
                };
            }
        }
    }
</script>

<style scoped>
    .result-item-header {
        height: 30px;
        border-bottom: 1px solid #4d4d4d;
        padding-left: 1px;
        background-color: #2b2b2b;
    }

    .result-item-header > a:hover {
        color: white;
    }

    .result-item-header a {
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
        color: white;
    }


</style>
