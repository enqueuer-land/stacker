<template>
    <div :class="resultHeader"
    >
        <a href="#" style="text-decoration: none;" @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false">
            <div class="row no-gutters" style="height: 50%">
                <!--<div class="col-3 align-self-center">-->
                    <!--<img src="../../../src/assets/symbol1.png" class="img-fluid mx-auto rounded d-block"-->
                         <!--style="">-->
                <!--</div>-->
                <!--<header :class="enqueuerClass">-->
                    <!--enqueuer-->
                <!--</header>-->
            </div>
            <div class="row" style="height: 30%"></div>
            <div class="row no-gutters">
                <div class="col-11 align-self-center">
                    <div v-if="result">
                        <div class="row no-gutters">
                            <div :class="nameClass" style="text-align: left"
                                 @click="$store.commit('selectItemById', {router: $router, route: $route, id: $store.state.result.id})">
                                {{result.name}}
                            </div>
                            <div class="col-3 row">
                                <div :class="['title', 'align-self-center']">
                                    Tests:
                                </div>
                                <div :class="testNumberClass" style="margin-left: 3px; text-align: left;">
                                    {{tests.getPassingTests().length}}/{{tests.getTests().length}} -
                                    ({{Math.trunc(tests.getPercentage())}}%)
                                </div>
                            </div>
                            <div class="col-2 row pl-2">
                                <div :class="['title', 'align-self-center']">
                                    Time:
                                </div>
                                <div :class="timeClass" style="margin-left: 3px; text-align: left;">
                                    {{printTime()}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-1">
                    <div class="dropdown dropleft">
                        <a v-show="true || mouseIsOver" id="moreOptions" class="dropdown-toggle pl-4" href="#"
                           data-toggle="dropdown" style="color: white">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" v-for="(action, index) in actions"
                               :key="index"
                            >{{action.name}}
                                <input v-if="action.fileDialog" type="file" class="custom-file-input"
                                       @change="(event) => action.click(event.target.value)">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>
<script>

    import FlattenTestsSummary from "../../tests/flatten-tests-summary";
    import $store from "../../store";
    // import * as fs from 'fs';
    const fs = require('fs');

    export default {
        name: 'ResultHeader',
        components: {},
        props: {
            value: {}
        },
        data: function () {
            return {
                mouseIsOver: false,
                actions: [
                    {
                        name: "Save",
                        fileDialog: true,
                        click(file) {
                            console.log('Saving: ' + fs);
                        }
                    },
                    {
                        name: "Open",
                        fileDialog: true,
                        click(file) {
                            console.log('Opening: ' + file);
                            console.log('Keys: ' + Object.keys(fs).filter(key => typeof(fs[key]) === 'function').join(';'));
                            console.log('stringify: ' + JSON.stringify(fs));
                        }
                    },
                    {
                        name: "Flatten",
                        click() {
                        }
                    },
                    {
                        name: "Clear",
                        click() {
                        }
                    },
                    {
                        name: "History",
                        click() {
                        }
                    },
                ]
            }
        },
        watch: {},
        computed: {
            tests() {
                return new FlattenTestsSummary().addTest($store.state.result);
            },
            result() {
                return this.$store.state.result;
            },
            enqueuerClass: function () {
                return {
                    'col-9 align-self-center': true,
                    'enqueuer-style': true,
                    'no-test-color': true, //!this.result,
                    // 'passing-test-color': this.result && this.tests.isValid(),
                    // 'failing-test-color': this.result && !this.tests.isValid()
                }
            },
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
                    'no-test-color': !this.result,
                    'passing-result-header': this.result && this.tests.isValid(),
                    'failing-result-header': this.result && !this.tests.isValid()
                };
            }
        },
        methods: {
            printTime: function () {
                if (this.result) {
                    let totalTime = this.result.time.totalTime;
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
    .enqueuer-style {
        transform: scale(1, .65);
        font-family: 'Nova Mono', monospace;
        font-size: 600%;
        /*text-align: center;*/
        letter-spacing: -15px;
    }

    .no-test-color {
        color: white;
    }

    .failing-result-header {
        /*border-left: 2px var(--failing-test-color) solid;*/
        /*border-right: 2px var(--failing-test-color) solid;*/
    }

    .passing-result-header {
        /*border-left: 2px var(--passing-test-color) solid;*/
        /*border-right: 2px var(--passing-test-color) solid;*/
    }

    .dropdown-toggle::before {
        display: none !important;
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    #moreOptions :hover {
        color: var(--index-color);
    }

    .custom-file-input {
        height: 100%;
        opacity: 0;
    }

    .tag {
        font-size: 0.7em;
        text-align: right;
    }

    .nameStyle {
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
