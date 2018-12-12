<template>
    <div class="stacker-header container px-0" :style="resultHeaderStyle">
        <div v-if="response">
            <div class="row no-gutters pt-1  justify-content-between"
                 style="cursor: pointer;"
                 @click="$store.commit('selectItemById', {router: $router, route: $route, id: result.id})">
                <button type="button" class="btn col-md-auto my-2 px-2 ml-2 test-badge"
                        :style="testBadgeStyle">
                    {{tests.isValid() ? 'PASS' : 'FAIL'}}
                </button>
                <span class="col align-self-center pl-3 result-name scroll-div"
                      :style="resultNameStyle">
                        {{response.name}}
                    </span>
                <div class="col-md-auto ml-auto pr-2 align-self-center ">
                    <i class="material-icons stacker-icon" @click="$store.commit('clearResult')">clear</i>
                </div>
            </div>
            <div class="row no-gutters pb-1 pl-2 pt-2 justify-content-between" style="height: 36px">
                <div class="col-md-auto">
                                <span class="title">
                                    Tests:
                                </span>
                    <span class="tag"
                          :style="{'margin-left': '3px', color: tests.isValid()? 'var(--passing-test-color)': 'var(--failing-test-color)'}">
                                    {{tests.getPassingTests().length}}/{{tests.getTests().length}} -
                                    ({{Math.trunc(tests.getPercentage())}}%)
                                </span>
                </div>
                <div class="col-md-auto">
                                <span class="title">
                                    Time:
                                </span>
                    <span class="time align-self-center">
                                    {{printTime()}}
                                </span>
                </div>
                <span class="col-md-auto align-self-end title pr-2"
                      style="text-align: right; font-size: 0.75em">
                                {{timeAgo}}
                            </span>
            </div>
            <div class="row no-gutters pt-3">
                <div class="col-8 row no-gutters">
                    <div class="col pt-0 pl-2 pr-1">
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control stacker-input"
                                   v-model="filter.string"
                                   style="border-radius: 10px"
                                   placeholder="Filter">
                        </div>
                    </div>
                    <i class="pl-0 col-md-auto pr-1 align-self-center material-icons stacker-icon">search</i>
                </div>
                <div class="col row no-gutters justify-content-end pr-1">
                    <div class="pl-0 col-md-auto pr-1 align-self-center pt-1">
                        <togglable-icon v-model="filter.showPassingTests"
                                        color="var(--passing-test-color)"
                                        name="check_circle_outline"
                                        tooltip='Show <b style="color: var(--passing-test-color);">passing</b> tests'></togglable-icon>
                    </div>
                    <div class="pl-0 col-md-auto pr-1 align-self-center pt-1">
                        <togglable-icon v-model="filter.showFailingTests"
                                        color="var(--failing-test-color)"
                                        name="highlight_off"
                                        tooltip='Show <b style="color: var(--failing-test-color);">failing</b> tests'></togglable-icon>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import FlattenTestsSummary from "../../tests/flatten-tests-summary";
    import TimeHandler from "../../tests/time-handler";
    import TogglableIcon from "../inputs/TogglableIcon";

    export default {
        name: 'ResultHeader',
        components: {TogglableIcon},
        props: {
            result: {}
        },
        mounted() {
            this.$store.state.eventEmitter.on('clearResult', () => {
                this.response = null;
            });
        },
        data: function () {

            return {
                response: this.result,
                filter: {
                    string: '',
                    showPassingTests: true,
                    showFailingTests: true,
                },
                timeAgo: '',
                timerInterval: null,
            }
        },
        watch: {
            result() {
                this.response = this.result;
                //TODO verify bug here. Sometimes it disappears
                const timeUpdater = () => {
                    if (this.response) {
                        this.timeAgo = new TimeHandler().getTimeAgo(this.response.time.endTime);
                    }
                };
                timeUpdater();
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                }
                this.timerInterval = setInterval(timeUpdater, 30000);
            },
            filter: {
                handler(value) {
                    this.$store.commit('changeResultFilter', value);
                },
                deep: true
            }
        },
        computed: {
            tests() {
                return new FlattenTestsSummary().addTest(this.response);
            },
            resultHeaderStyle: function () {
                const result = {
                    color: 'var(--text-color)'
                };
                if (this.response) {
                    if (this.tests.isValid()) {
                        result.color = 'var(--passing-test-color);'
                    } else {
                        result.color = 'var(--failing-test-color);'
                    }
                }
                return result;
            },
            showPassingTestsButtonClass() {
                return {
                    'material-icons stacker-icon': true,
                    'small-button-passing-tests': this.filter.showPassingTests
                }
            },
            showFailingTestsButtonClass() {
                return {
                    'material-icons stacker-icon small-button-failing-tests-hover': true,
                    'small-button-failing-tests': this.filter.showFailingTests
                }
            },
            testBadgeStyle() {
                return {
                    'background-color': this.tests.isValid() ? 'var(--passing-test-color)' : 'var(--failing-test-color)',
                    'color': 'var(--stacker-header-background-color)',
                    'font-weight': 'bold'
                }
            },
            resultNameStyle() {
                return {
                    'text-align': 'left',
                    'font-size': '30px',
                    'max-height': '50px',
                    color: this.tests.isValid() ? 'var(--passing-test-color)' : 'var(--failing-test-color)'
                }
            }
        },
        methods: {
            printTime: function () {
                if (this.result) {
                    return new TimeHandler().getTotalTime(this.response.time.totalTime);
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

    .tag {
        font-size: 0.8em;
        text-align: right;
    }

    .title {
        font-size: 0.8em;
        text-align: right;
        font-weight: lighter;
        color: var(--text-smooth-color);
    }

    .time {
        font-size: 0.8em;
        text-align: right;
        font-weight: lighter;
        color: var(--passing-test-color);
    }

    .result-name:hover, .result-name.hover {
        color: var(--text-color) !important;
    }

    .test-badge:hover {
        box-shadow: 0 0 5px var(--text-color);
    }

</style>
