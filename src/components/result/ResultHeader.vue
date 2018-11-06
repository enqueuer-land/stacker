<template>
    <div :class="resultHeader"
         @mouseover="mouseIsOver = true"
         @mouseleave="mouseIsOver = false">
        <a href="#" style="text-decoration: none;">
            <div class="row">
                <div class="col align-self-center">
                    <img src="../../../src/assets/fullLogo3.png" class="img-fluid mx-auto rounded d-block"
                         style="max-width: 100%; max-height: 100%; height: 120px; width: auto">
                </div>
            </div>
            <div v-if="$store.state.result" class="row no-gutters">
                <div class="col-11 align-self-center">
                    <div class="row no-gutters">
                        <!--<div class="col-1 align-self-center" style="padding-left: 2px">-->
                        <!--<a href="#">-->
                        <!--<i v-show="tests.isValid()" style="color: var(&#45;&#45;passing-test-color)"-->
                        <!--class="material-icons">check_circle_outline</i>-->
                        <!--<i v-show="!tests.isValid()" style="color: var(&#45;&#45;failing-test-color)"-->
                        <!--class="material-icons">highlight_off</i>-->
                        <!--</a>-->
                        <!--</div>-->
                        <div :class="nameClass" style="text-align: left">
                            {{$store.state.result.name}}
                        </div>
                        <div class="col-3 row">
                            <div :class="['title', 'align-self-center']">
                                Tests:
                            </div>
                            <div :class="testNumberClass" style="margin-left: 3px; text-align: left;">
                                {{tests.getPassingTests().length}}/{{tests.getTests().length}} -
                                ({{Math.trunc(tests.getPercentage())}}%)
                            </div>
                            <!--<div :class="testNumberClass" style="text-align: right">-->
                        </div>
                        <div class="col-2 row pl-2">
                            <div :class="['title', 'align-self-center']">
                                Time:
                            </div>
                            <div :class="timeClass" style="margin-left: 3px; text-align: left;">
                                {{printTime()}}
                            </div>
                            <!--<div :class="testNumberClass" style="text-align: right">-->
                        </div>
                    </div>
                </div>
                <!--<div class="offset-1"></div>-->
                <!--<div class="col-1 pr-0" v-show="mouseIsOver">-->
                <!--<a href="#" style="color: white">-->
                <!--<i class="material-icons">check_circle_outline</i>-->
                <!--</a>-->
                <!--</div>-->
                <div class="col-1">
                    <div class="dropdown dropleft">
                        <a v-show="mouseIsOver" id="moreOptions" class="dropdown-toggle pl-4" href="#" data-toggle="dropdown" style="color: white">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" v-for="action in actions"
                               :key="action.name">{{action.name}}</a>
                        </div>
                    </div>
                </div>
                <!--<div class="col-1 pr-0" v-show="mouseIsOver">-->
                <!--<a href="#" style="color: white">-->
                <!--<i class="material-icons">highlight_off</i>-->
                <!--</a>-->
                <!--<div class="col-1" v-show="mouseIsOver">-->
                <!--<a href="#" style="color: white">-->
                <!--<i class="material-icons">save</i>-->
                <!--</a>-->
                <!--</div>-->
                <!--</div>-->
                <!--<div class="col-1" v-show="mouseIsOver">-->
                <!--<div class="dropdown dropleft">-->
                    <!--<a class="dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">-->
                        <!--<i class="material-icons">more_vert</i>-->
                    <!--</a>-->
                    <!--<div class="dropdown-menu">-->
                        <!--<a class="dropdown-item" href="#" v-for="action in actions"-->
                           <!--:key="action.name">{{action.name}}</a>-->
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
                    'align-self-center': true,
                    'passing-test-color': this.tests.isValid(),
                    'failing-test-color': !this.tests.isValid()
                }
            },
            nameClass: function () {
                return {
                    'nameStyle': true,
                    'col pl-2': true,
                    'align-self-center': true,
                    'passing-test-color': this.tests.isValid(),
                    'failing-test-color': !this.tests.isValid()
                }
            },
            timeClass: function () {
                return {
                    'time': true,
                    'align-self-center': true
                };
            },

            resultHeader: function () {
                return {
                    'stacker-header': true,
                    'passing-result-header': this.tests.isValid(),
                    'failing-result-header': !this.tests.isValid()
                };
            }
        },
        methods: {
            printTime: function () {
                if ($store.state.result) {
                    let totalTime = $store.state.result.time.totalTime;
                    const ms = totalTime % 1000;
                    let result = ms + 'ms';
                    if (totalTime >= 1000) {
                        let seconds = Math.trunc(totalTime / 1000);
                        result = seconds + 's' + ms + 'ms';
                        if (seconds >= 60) {
                            const minutes = Math.trunc(seconds / 60);
                            seconds = seconds % 60;
                            result = minutes + 'm' + seconds + 's' + result;
                        }

                    }
                    return result;
                }
            }
        }
    }
</script>

<style scoped>
    .failing-result-header {
        border-left: 8px var(--failing-test-color) solid;
        border-right: 8px var(--failing-test-color) solid;
    }

    .passing-result-header {
        border-right: 8px var(--passing-test-color) solid;
        border-left: 8px var(--passing-test-color) solid;
    }

    .dropdown-toggle::before {
        display: none !important;
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    #moreOptions :hover {
        color: var(--stacker-background-alternative-color);
    }

    .tag {
        font-size: 0.7em;
        text-align: right;
    }

    .nameStyle {
        font-weight: bold;
        text-align: left;
    }

    .title {
        font-size: 0.7em;
        text-align: right;
        font-weight: lighter;
        color: var(--index-color);
    }

    .time {
        font-size: 0.7em;
        text-align: right;
        font-weight: lighter;
        color: var(--passing-test-color);
    }

</style>
