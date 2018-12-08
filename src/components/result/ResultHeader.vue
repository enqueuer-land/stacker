<template>
    <div class="stacker-header" :style="resultHeaderStyle">
        <a v-if="result" href="#" style="text-decoration: none;" @mouseover="mouseIsOver = true"
           @mousemove="updateTooltips"
           @mouseleave="mouseIsOver = false">
            <div class="row no-gutters">
                <span class="col-11 pt-2 align-self-end pl-2 result-name"
                      :style="resultNameStyle"
                      @click="$store.commit('selectItemById', {router: $router, route: $route, id: result.id})">
                    {{result.name}}
                </span>
            </div>
            <div class="row" style="height: 8%"/>
            <div class="row no-gutters pb-1 pl-2 pt-0 justify-content-between">
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
                <span class="col-md-auto align-self-end title pr-2" style="text-align: right; font-size: 0.75em">
                            {{timeAgo}}
                        </span>
            </div>
            <div class="row" style="height: 7%"/>
            <div class="row no-gutters">
                <div class="col-8 row no-gutters">
                    <div class="col pt-0 pl-2 pr-1">
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control stacker-input"
                                   v-model="filter.string"
                                   style="border-radius: 10px"
                                   placeholder="Filter">
                        </div>
                    </div>
                    <a class="pl-0 col-md-auto pr-1 align-self-center pt-1" href="#">
                        <i class="material-icons search-icon">search</i>
                    </a>
                </div>
                <div class="col row no-gutters justify-content-end pr-1">
                    <a class="pl-0 col-md-auto pr-1 align-self-center pt-1" href="#">
                        <i @click="filter.showPassingTests = !filter.showPassingTests"
                           id="showPassingTests"
                           :class="showPassingTestsButtonClass">check_circle_outline</i>
                    </a>
                    <a class="pl-0 col-md-auto pr-1 align-self-center pt-1" href="#">
                        <i @click="filter.showFailingTests = !filter.showFailingTests"
                           id="showFailingTests"
                           :class="showFailingTestsButtonClass">highlight_off</i>
                    </a>
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
                filter: {
                    string: '',
                    showPassingTests: true,
                    showFailingTests: true,
                },
                mouseIsOver: false,
                timeAgo: '',
                timerInterval: null,
            }
        },
        watch: {
            result() {
                //TODO verify bug here. Sometimes it disappears
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
            },
            showPassingTestsButtonClass() {
                return {
                    'material-icons small-button': true,
                    'small-button-passing-tests': this.filter.showPassingTests
                }
            },
            showFailingTestsButtonClass() {
                return {
                    'material-icons small-button': true,
                    'small-button-failing-tests': this.filter.showFailingTests
                }
            },
            resultNameStyle() {
                return {
                    'text-align': 'left',
                    'font-size': '30px',
                    color: this.tests.isValid() ? 'var(--passing-test-color)' : 'var(--failing-test-color)'
                }
            }
        },
        methods: {
            printTime: function () {
                if (this.result) {
                    return new TimeHandler().getTotalTime(this.result.time.totalTime);
                }
            },
            updateTooltips() {
                const toolTipProperties = {
                    html: true,
                    placement: 'auto'
                };

                toolTipProperties.title = `Show <b style="color: var(--passing-test-color);">passing</b> tests`,
                    $('#showPassingTests')
                        .tooltip(toolTipProperties);

                toolTipProperties.title = `Show <b style="color: var(--failing-test-color);">failing</b> tests`,
                    $('#showFailingTests')
                        .tooltip(toolTipProperties);
            },
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

    .small-button {
        color: var(--text-smooth-color);
        transform: scale(1) rotate(30deg);
        transition: transform 100ms ease
    }

    .small-button:hover {
        color: var(--text-color);
        transform: scale(1.05) rotate(20deg);
    }

    .small-button-passing-tests {
        color: var(--passing-test-color);
        transform: scale(1.1);
    }

    .small-button-passing-tests:hover {
        color: var(--passing-test-color);
        transform: scale(1.4);
    }

    .small-button-failing-tests {
        color: var(--failing-test-color);
        transform: scale(1.1);
    }

    .small-button-failing-tests:hover {
        color: var(--failing-test-color);
        transform: scale(1.4);
    }

    .result-name:hover, .result-name.hover {
        color: var(--text-color) !important;
    }

    .search-icon {
        color: var(--text-smooth-color);
        transform: scale(0.85);
    }

    .search-icon:hover {
        color: var(--text-color);
    }

</style>
