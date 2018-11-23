<template>
    <div :class="['stacker-header']"
         @mouseover="mouseIsOver = true"
         @mouseleave="mouseIsOver = false">
        <a href="#" style="text-decoration: none">
            <div class="row no-gutters" style="height: 55%">
                <div class="col-3">
                    <img src="../../../src/assets/symbol1.png" class="img-fluid mx-auto rounded d-block"
                         style="transform: scale(-1.3, 1.3) rotate(90deg);">
                </div>
                <header id="side-bar-header" class="col-8 align-self-center"
                        style="position: relative; top: 0px; left: -15px">
                    stacker
                </header>
                <div class="col align-self-end">
                    <div v-show="true || mouseIsOver" class="dropdown">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown"
                           style="color: var(--enqueuer-color); position: relative; top: -10px">
                            <i class="material-icons"
                               style="transform: scale(1.1); text-shadow: 0 0 30px var(--stacker-background-alternative-color);">add_circle</i>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" v-for="action in actions" :key="action.name"
                               @click="action.click">{{action.name}}
                                <!--<input v-if="action.fileDialog" type="file" class="custom-file-input"-->
                                <!--@change="(event) => action.click(event.target.files[0].path)">-->
                            </a>
                        </div>
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
                               style="background-color: transparent; border-color: var(--stacker-background-alternative-color); color: white; border-radius: 10px"
                               placeholder="Filter">
                    </div>
                </div>
                <a class="col-1 pr-0 align-self-center pt-1" href="#">
                    <i class="material-icons" style="color: var(--index-color); transform: scale(0.85)">search</i>
                </a>
            </div>
        </a>
    </div>
</template>

<script>
    const fs = window.remote.require('fs');

    export default {
        name: 'SideBarHeader',
        data: function () {
            return {
                mouseIsOver: false,
                actions: [
                    {
                        name: "Import requisition",
                        click: () => {
                            window.remote.dialog.showOpenDialog({
                                properties: ['openFile']//, 'multiSelections']
                            }, (files) => {
                                if (files !== undefined && files.length > 0) {
                                    this.$store.commit('openRequisitionFile', {router: this.$router, file: files[0]});
                                }
                            });
                        }
                    },
                    {
                        name: "Import response",
                        click: () => {
                            window.remote.dialog.showOpenDialog({
                                properties: ['openFile']//, 'multiSelections']
                            }, (files) => {
                                if (files !== undefined && files.length > 0) {
                                    const response = JSON.parse(fs.readFileSync(files[0]).toString());
                                    this.$store.commit('setRequisitionResult', {router: this.$router, report: response});
                                }
                            });
                        }
                    },
                    {
                        name: "Create Requisition",
                        click: () => {
                            this.$store.commit('addRequisition', {router: this.$router});
                        }
                    }]
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
        transform: scale(1, .5);
        font-family: 'Nova Mono', monospace;
        font-size: 550%;
        color: white;
        text-align: left;
        letter-spacing: -13px;
    }

    .dropdown-toggle > i:hover {
        color: var(--index-color);
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    .custom-file-input {
        height: 100%;
        opacity: 0;
    }

</style>
