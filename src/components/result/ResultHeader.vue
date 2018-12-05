<template>
    <div class="stacker-header" :style="resultHeaderStyle">
        <a v-if="result" href="#" style="text-decoration: none;" @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false">
            <div class="row no-gutters">
                <span class="col-11 pt-2 align-self-end pl-2"
                      :style="{'text-align': 'left', 'font-size': '30px', color: tests.isValid()? 'var(--passing-test-color)': 'var(--failing-test-color)'}"
                      @click="$store.commit('selectItemById', {router: $router, route: $route, id: result.id})">
                    {{result.name}}
                </span>
            </div>
            <div class="row no-gutters pb-1">
                <div class="col-12 align-self-center pl-2 pt-0">
                    <div class="row no-gutters">
                        <div class="col-4">
                            <span class="title">
                                Tests:
                            </span>
                            <span class="tag"
                                  :style="{'margin-left': '3px', color: tests.isValid()? 'var(--passing-test-color)': 'var(--failing-test-color)'}">
                                {{tests.getPassingTests().length}}/{{tests.getTests().length}} -
                                ({{Math.trunc(tests.getPercentage())}}%)
                            </span>
                        </div>
                        <div class="col-4 pl-3">
                            <span class="title">
                                Time:
                            </span>
                            <span class="time align-self-center">
                                {{printTime()}}
                            </span>
                        </div>
                        <span class="col-4 align-self-end pl-2 pr-1 title" style="text-align: right; font-size: 0.75em">
                            {{timeAgo}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row" style="height: 15%" />
            <div class="row">
                <div class="col pt-0 pl-4">
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control"
                               style="background-color: transparent; border-color: var(--stacker-background-alternative-color); color: var(--text-color); border-radius: 10px"
                               placeholder="Filter">
                    </div>
                </div>
                <a class="pl-0 col-1 pr-1 align-self-center pt-1" href="#">
                    <i class="material-icons" style="color: var(--text-smooth-color); transform: scale(0.85)">search</i>
                </a>
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
                    color: 'var(--text-color)'
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
        color: var(--text-smooth-color);
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
        color: var(--text-smooth-color);
    }

    .time {
        font-size: 0.9em;
        text-align: right;
        font-weight: lighter;
        color: var(--passing-test-color);
    }

</style>
