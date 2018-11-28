<template>
    <div :class="['stacker-header']">
        <a href="#" style="text-decoration: none">
            <div class="row no-gutters" style="height: 55%">
                <div class="col-3">
                    <img src="../../../src/assets/symbol1.png" class="img-fluid mx-auto rounded d-block"
                         style="transform: scale(-1.3, 1.3) rotate(90deg); position: relative; top: 5px;">
                </div>
                <header id="side-bar-header" class="col-8 align-self-center"
                        style="position: relative; top: 0px; left: -15px">
                    stacker
                </header>
                <div class="col align-self-end">
                    <div class="dropdown">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown"
                           style="color: var(--enqueuer-color); position: relative; top: -10px; left: 0px">
                            <i class="material-icons"
                               style="transform: scale(1.1); text-shadow: 0 0 30px var(--stacker-background-alternative-color);">add_circle</i>
                        </a>
                        <dropdown-component :value="actions"></dropdown-component>
                    </div>
                </div>
            </div>
            <div class="row" style="height: 18%">
            </div>
            <div class="row no-gutters">
                <div class="col-11 pl-0">
                    <div class="input-group input-group-sm pl-2 pr-1">
                        <input type="text" class="form-control"
                               v-model="filter"
                               style="background-color: transparent; border-color: var(--stacker-background-alternative-color); color: var(--text-color); border-radius: 10px"
                               placeholder="Filter">
                    </div>
                </div>
                <a class="col-1 pr-0 align-self-center pt-1" href="#">
                    <i class="material-icons" style="color: var(--text-smooth-color); transform: scale(0.85)">search</i>
                </a>
            </div>
        </a>
    </div>
</template>

<script>
    import DropdownComponent from "../inputs/DropdownComponent";

    const fs = window.remote.require('fs');

    export default {
        name: 'SideBarHeader',
        components: {DropdownComponent},
        data: function () {
            return {
                actions: [
                    {
                      name: 'Requisition',
                      header: true,
                    },
                    {
                        name: "Import requisitions",
                        click: () => {
                            window.remote.dialog.showOpenDialog({
                                properties: ['openFile', 'multiSelections']
                            }, (files) => {
                                if (files !== undefined) {
                                    (files || []).forEach(file => {
                                        this.$store.commit('openRequisitionFile', {router: this.$router, file: file});
                                    })
                                }
                            });
                        }
                    },
                    {
                        name: "Create Requisition",
                        click: () => {
                            this.$store.commit('addRequisition', {router: this.$router});
                        }
                    },
                    {
                        divider: true,
                    },
                    {
                        name: 'Response',
                        header: true,
                    },
                    {
                        name: "Import responses",
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
                ]
            }
        },
        computed: {
            filter: {
                get() {
                    return this.$store.state.filter;
                },
                set(value) {
                    return this.$store.commit('changeFilter', value);
                }
            }
        }
    }
</script>

<style scoped>

    #side-bar-header {
        /*height: 120px;*/
        transform: scale(1, .7);
        font-family: 'Nova Mono', monospace;
        font-size: 550%;
        color: var(--text-color);
        text-align: left;
        letter-spacing: -15px;
    }

    .dropdown-toggle > i:hover {
        color: var(--text-smooth-color);
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    .custom-file-input {
        height: 100%;
        opacity: 0;
    }

</style>
