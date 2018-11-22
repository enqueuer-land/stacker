<template>
    <div class="stacker-header" :style="resultHeaderStyle">
        <a v-if="result" href="#" style="text-decoration: none;" @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false">
            <div class="row" style="height: 40%">
            </div>
            <div class="row no-gutters">
                <span class="col-12 pt-2 pl-2 align-self-end" :style="{'text-align': 'left', 'font-size': '30px', color: tests.isValid()? 'var(--passing-test-color)': 'var(--failing-test-color)'}"
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
                            <span class="align-self-center tag" :style="{'margin-left': '3px', color: tests.isValid()? 'var(--passing-test-color)': 'var(--failing-test-color)'}">
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
            //TODO verify bug here
            result() {
                const timeUpdater = () => {
                    if (this.result) {
                        this.timeAgo = new TimeHandler().getTimeAgo(this.result.time.endTime);
                    }
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
            resultHeaderStyle: function () {
                const result = {
                    color: 'white'
                };
                if (this.result) {
                    if (this.tests.isValid()) {
                        result.color = 'var(--passing-test-color);'
                    } else {
                        result.color = 'var(--failing-test-color);'
                    }
                }
                return result;
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
