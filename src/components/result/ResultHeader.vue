<template>
    <div :class="resultHeader">
        <a v-if="result" href="#" style="text-decoration: none;" @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false">
            <div class="row" style="height: 40%">

                <!--<a class="pl-4 col-1 pr-0 align-self-center pt-1" href="#">-->
                <!--<i class="material-icons" style="color: var(&#45;&#45;index-color); transform: scale(0.85)">search</i>-->
                <!--</a>-->
                <!--<div class="col pt-0 pl-0 align-self-center">-->
                <!--<div class="input-group input-group-sm pr-4">-->
                <!--<input type="text" class="form-control"-->
                <!--style="background-color: transparent; border-color: var(&#45;&#45;stacker-background-alternative-color); color: white; border-radius: 10px"-->
                <!--placeholder="Filter">-->
                <!--</div>-->
                <!--</div>-->


            </div>
            <div class="row no-gutters">
                <span :class="nameClass" style="text-align: left; font-size: 30px"
                      @click="$store.commit('selectItemById', {router: $router, route: $route, id: result.id})">
                    {{result.name}}
                </span>
            </div>
            <div class="row no-gutters">
                <div class="col-11 align-self-center pl-2 pt-0">
                    <div class="row no-gutters">
                        <div class="col-4">
                            <span :class="['title']">
                                Tests:
                            </span>
                            <span :class="testNumberClass" style="margin-left: 3px;">
                                {{tests.getPassingTests().length}}/{{tests.getTests().length}} -
                                ({{Math.trunc(tests.getPercentage())}}%)
                            </span>
                        </div>
                        <div class="col-4 pl-1">
                            <span class="title">
                                Time:
                            </span>
                            <span class="time align-self-center">
                                {{printTime()}}
                            </span>
                        </div>
                        <span class="col-4 align-self-center pl-2 pr-2 title" style="text-align: left">
                            {{timeAgo}}
                        </span>

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
    import TimeHandler from "../../tests/time-handler";

    export default {
        name: 'ResultHeader',
        components: {},
        props: {
            result: {}
        },
        data: function () {
            return {
                mouseIsOver: false,
                timeAgo: '',
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
                ],
                timerInterval: null,
            }
        },
        watch: {
            result() {
                const timeUpdater = () => {
                    if (this.result) {
                        this.timeAgo = new TimeHandler().getTimeAgo(this.result.time.endTime);
                    }
                    console.log("SET TIME OUT");
                };
                timeUpdater();
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                }
                this.timerInterval = setInterval(timeUpdater, 30000);
            }
        },
        computed: {
            tests() {
                return new FlattenTestsSummary().addTest(this.result);
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
                    'col-12 pt-2 pl-2 align-self-end': true,
                    'passing-test-color': this.tests.isValid(),
                    'failing-test-color': !this.tests.isValid()
                }
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
                    return new TimeHandler().getTotalTime(this.result.time.totalTime);
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
