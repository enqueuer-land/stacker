<template>
    <div :class="['stacker-header']">
        <a href="#" style="text-decoration: none">
            <div class="row no-gutters" style="height: 55%">
                <div class="col-3">
                    <img src="../../../src/assets/logo.png" class="img-fluid logo-class">
                </div>
                <header class="col-8 align-self-center side-bar-header">
                    stacker
                </header>
                <div class="col align-self-end">
                    <div class="dropdown">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                            <i class="material-icons add-button-class">add_circle</i>
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
                        <input type="text" class="form-control stacker-input"
                               v-model="filter"
                               style="border-radius: 10px"
                               placeholder="Filter">
                    </div>
                </div>
                <a class="col-1 pr-0 align-self-center pt-1" href="#">
                    <i class="material-icons search-icon">search</i>
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
                addButtonPulseInterval: null,
                actions: [
                    {
                        name: "Import requisitions",
                        click: () => {
                            window.remote.dialog.showOpenDialog({
                                properties: ['openFile', 'multiSelections', 'openDirectory']
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
        },
        watch: {
            '$store.state.requisitions'(value) {
                if (value.length === 0) {
                    this.addButtonPulseInterval = setInterval(() => {
                        const addButtonClass = $('.add-button-class');
                        addButtonClass.addClass('rotated-add-button-class');
                        setTimeout(() => addButtonClass.removeClass('rotated-add-button-class'), 800);
                    }, 5000);
                } else {
                    clearInterval(this.addButtonPulseInterval);
                    this.addButtonPulseInterval = null;
                }
            }
        }

    }
</script>

<style scoped>

    .side-bar-header {
        transform: scale(1, .7);
        font-family: 'Nova Mono', monospace;
        font-size: 550%;
        color: var(--text-color);
        text-align: left;
        letter-spacing: -15px;
        position: relative;
        top: 0px;
        left: -15px
    }

    .side-bar-header:hover {
        text-shadow: 0 0 5px var(--enqueuer-color);
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    .add-button-class {
        transform: scale(1.2) rotate(10deg);
        text-shadow: 0 0 30px var(--stacker-background-alternative-color);
        color: var(--enqueuer-color);
        position: relative;
        top: -5px;
        left: 0;
        transition: transform 400ms ease, top 400ms ease;
    }

    .add-button-class:hover, .rotated-add-button-class {
        transform: scale(1.8);
        top: 0;
    }

    .logo-class {
        transform: scale(1.3);
        position: relative;
        top: -10px;
        left: -5px;
        transition: transform 500ms ease;
    }

    .logo-class:hover {
        transform: scale(1.5);
    }

    .search-icon {
        color: var(--text-smooth-color);
        transform: scale(0.85);
    }

    .search-icon:hover {
        color: var(--text-color);
    }
</style>
