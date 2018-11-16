<template>
    <div :class="resultHeader">
        <a v-if="result" href="#" style="text-decoration: none;" @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false">
            <div class="row no-gutters" style="height: 50%">
                <div :class="nameClass" style="text-align: left;"
                     @click="$store.commit('selectItemById', {router: $router, route: $route, id: result.id})">
                    {{result.name}}
                </div>
            </div>
            <div class="row" style="height: 30%"></div>
            <div class="row no-gutters">
                <div class="col-11 align-self-center pl-2 pt-0">
                    <div class="row no-gutters">
                        <div class="col-4">
                            <span :class="['title']">
                                Tests:
                            </span>
                            <span :class="testNumberClass" style="margin-left: 3px; text-align: left;">
                                {{tests.getPassingTests().length}}/{{tests.getTests().length}} -
                                ({{Math.trunc(tests.getPercentage())}}%)
                            </span>
                        </div>
                        <div class="col-4 pl-2">
                            <span :class="['title']">
                                Time:
                            </span>
                            <span :class="timeClass" style="text-align: left;">
                                {{printTime()}}
                            </span>
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
                return new FlattenTestsSummary().addTest(this.$store.state.results);
            },
            result() {
                const results = this.$store.state.results;
                return results[results.length - 1];
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
                    'col-12 align-self-center pt-2 pl-2': true,
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
        font-size: 0.9em;
        text-align: right;
    }

    .title {
        font-size: 0.9em;
        text-align: right;
        font-weight: lighter;
        color: var(--index-color);
    }

    .time {
        font-size: 0.9em;
        text-align: right;
        font-weight: lighter;
        color: var(--passing-test-color);
    }

</style>
