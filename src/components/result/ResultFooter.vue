<template>
    <div class="result-footer">
        <div class="row no-gutters justify-content-around pt-2">
            <div class="col row no-gutters justify-content-begin pr-2">
                <stacker-icon v-for="(action, index) in actions" :key="index"
                              class="col-md-auto px-2"
                              :name="action.icon"
                              :toggleable="action.toggle"
                              v-model="action.value"
                              :tooltip="action.tooltip"
                              @click="action.click(action, index)"></stacker-icon>
            </div>
            <div class="col-1 ml-2">
                <img src="../../../build/gui.png" class="img-fluid rounded gui-class">
            </div>
        </div>
    </div>
</template>

<script>

    import StackerIcon from "../inputs/StackerIcon";
    import ComponentManager from "../../tests/component-manager";

    const fs = window.remote.require('fs');

    export default {
        name: "ResultFooter",
        components: {StackerIcon},
        data() {
            return {
                actions: [
                    {
                        click: () => {
                            const componentManager = new ComponentManager();
                            const results = this.$store.state.results;
                            const item = componentManager.findItem(results[results.length - 1].id);
                            if (item && componentManager.isComponentValid(item) && !componentManager.isItemInIgnoredTree(item)) {
                                this.$store.dispatch('runRequisition', item);
                            }
                        },
                        icon: "refresh",
                        tooltip: "Replay requisition",
                    },
                    {
                        click: () => this.$store.commit('clearResult'),
                        icon: "clear",
                        tooltip: "Clear result page",
                    },
                    // {
                    //     divider: true,
                    // },
                    // {
                    //     click: (action, index) => {
                    //         this.handleRadioIcons(action, index);
                    //     },
                    //     group: "testsMode",
                    //     toggle: {
                    //         name: 'flat',
                    //         color: 'var(--failing-test-color)'
                    //     },
                    //     icon: "view_array",
                    //     tooltip: "Nest tests",
                    // },
                    // {
                    //     click: (action, index) => {
                    //         this.handleRadioIcons(action, index);
                    //     },
                    //     value: true,
                    //     group: "testsMode",
                    //     icon: "view_day",
                    //     toggle: {
                    //         name: 'flat',
                    //         color: 'var(--failing-test-color)'
                    //     },
                    //     tooltip: "Flatten tests",
                    // },
                    {
                        tooltip: "Import response",
                        icon: "cloud_download",
                        click: () => {
                            window.remote.dialog.showOpenDialog({
                                properties: ['openFile']
                            }, (files) => {
                                if (files !== undefined) {
                                    (files || []).forEach(file => {
                                        const response = JSON.parse(fs.readFileSync(file).toString());
                                        this.$store.commit('setRequisitionResult', {
                                            router: this.$router,
                                            report: response
                                        });
                                    });
                                }
                            });
                        }
                    },
                    {
                        click: () => {
                            const results = this.$store.state.results;
                            const currentResult = results[results.length - 1];
                            this.$store.commit('exportResponse', currentResult);
                        },
                        icon: "backup",
                        tooltip: "Save response",
                    },
                    // {
                    //     click: () => {
                    //     },
                    //     icon: "history",
                    //     tooltip: "History",
                    // },
                ]
            }
        },
        methods: {
            handleRadioIcons(clicked, index) {
                const map = this.actions
                    .filter(action => action.group)
                    .filter(action => action.group === clicked.group)
                    .filter(action => action !== clicked)
                    .map(action => action.value = false);
                console.log(JSON.stringify(map));
                this.actions[index].value = true;
                console.log(JSON.stringify(this.actions[index]));
            },
        }
    }
</script>

<style scoped>
    .result-footer {
        border-top: 1px solid var(--stacker-background-alternative-color);
        background-color: var(--stacker-background-color);
    }

    .gui-class {
        position: relative;
        top: -8px;
        left: 5px;
        width: 62%;
        height: auto;
        opacity: .01;
        filter: blur(3px);
        transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94) 2000ms;
    }

    .gui-class:hover {
        opacity: .9;
        filter: blur(0);
    }

</style>
