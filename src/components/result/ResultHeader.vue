<template>
    <div class="result-header stacker-header"
         @mouseover="mouseIsOver = true"
         @mouseleave="mouseIsOver = false">
        <a href="#" style="text-decoration: none;">
            <div class="row">
                <div class="col align-self-center">
                    <img src="../../../src/assets/fullLogo3.png" class="img-fluid mx-auto rounded d-block"
                         style="max-width: 100%; max-height: 100%; height: 120px; width: auto">
                </div>
            </div>
            <div class="row no-gutters" id="moreOptions">
                <div class="col-6 align-self-center">
                    <div class="row">
                        <div class="col-1 align-self-center">
                            <a href="#">
                                <i v-show="tests.isValid()" style="color: var(--passing-test-color)"
                                   class="material-icons">check_circle_outline</i>
                                <i v-show="!tests.isValid()" style="color: var(--failing-test-color)"
                                   class="material-icons">highlight_off</i>
                            </a>
                        </div>
                        <div :class="testNumberClass">
                            {{tests.getPassingTests().length}} of {{tests.getTests().length}} tests
                            ({{tests.getPercentage()}}%)
                        </div>
                        <div :class="timeClass">
                            {{$store.state.result.time.totalTime}}ms
                        </div>
                    </div>
                </div>
                <div class="offset-3"></div>
                <div class="col-1 pr-0" v-show="mouseIsOver">
                    <a href="#" style="color: white">
                        <i class="material-icons">check_circle_outline</i>
                    </a>
                </div>
                <div class="col-1 pr-0" v-show="mouseIsOver">
                    <a href="#" style="color: white">
                        <i class="material-icons">highlight_off</i>
                    </a>
                </div>
                <div class="col-1" v-show="mouseIsOver">
                    <a href="#" style="color: white">
                        <i class="material-icons">save</i>
                    </a>
                </div>
                <!--<div class="col-1" v-show="mouseIsOver">-->
                    <!--<div class="dropdown dropleft">-->
                        <!--<a class="dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">-->
                            <!--<i class="material-icons">more_vert</i>-->
                        <!--</a>-->
                        <!--<div class="dropdown-menu">-->
                            <!--<a class="dropdown-item" href="#" v-for="action in actions" :key="action.name">{{action.name}}</a>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </a>
    </div>
</template>
<script>

    import DeepTestsSummary from "../../tests/deep-tests-summary";
    import $store from "../../store";

    export default {
        name: 'ResultHeader',
        components: {},
        data: function () {
            return {
                tests: new DeepTestsSummary().addTest($store.state.result),
                mouseIsOver: false,
                actions: [{
                    name: "Save"
                }]
            }
        },
        computed: {
            testNumberClass: function () {
                return {
                    'tag': true,
                    'col': true,
                    'align-self-center': true,
                    'passing-test-color': this.tests.isValid(),
                    'failing-test-color': !this.tests.isValid()
                }
            },
            timeClass: function () {
                return {
                    'time': true,
                    'align-self-center': true,
                    'col-4': true
                };
            }
        }
    }
</script>

<style scoped>
    .result-header {

    }

    .dropdown-toggle::before {
        display: none !important;
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    #moreOptions a :hover {
        color: var(--passing-test-color);
    }

    .tag {
        font-size: 0.8em;
        font-weight: bold;
        text-align: right;
    }

    .time {
        font-size: 0.8em;
        text-align: right;
        font-weight: lighter;
        color: darkgray;
    }

</style>
