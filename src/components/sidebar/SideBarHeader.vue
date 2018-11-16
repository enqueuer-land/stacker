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
                <header id="side-bar-header" class="col-8 align-self-center" style="position: relative; left: -15px">
                    stacker
                </header>
                <div class="col align-self-end">
                    <div v-show="true || mouseIsOver" class="dropdown">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown"
                           style="color: var(--enqueuer-color); position: relative; top: -5px">
                            <i class="material-icons"
                               style="transform: scale(1.3); text-shadow: 1px 1px 0px var(--stacker-background-alternative-color);">add_circle</i>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" v-for="action in actions" :key="action.name"
                               @click="!action.fileDialog ? action.click() : ''">{{action.name}}
                                <input v-if="action.fileDialog" type="file" class="custom-file-input"
                                       @change="(event) => action.click(event.target.value)">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="height: 20%">
            </div>
            <div class="row">
                <a class="pl-4 col-1 pr-0 align-self-center pt-1" href="#">
                    <i class="material-icons" style="color: var(--index-color); transform: scale(0.85)">search</i>
                </a>
                <div class="col pt-0 pl-0">
                    <div class="input-group input-group-sm pl-4 pr-4">
                        <input type="text" class="form-control"
                               v-model="filter"
                               style="background-color: transparent; border-color: var(--stacker-background-alternative-color); color: white; border-radius: 10px"
                               placeholder="Filter">
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>

    export default {
        name: 'SideBarHeader',
        data: function () {
            return {
                mouseIsOver: false,
                actions: [
                    {
                        fileDialog: true,
                        name: "Import",
                        click: (file) => {
                            this.$store.commit('openRequisitionFile', {router: this.$router, file: file});
                        }
                    },
                    {
                        name: "Create",
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
        transform: scale(1, .65);
        font-family: 'Nova Mono', monospace;
        font-size: 600%;
        color: white;
        /*text-align: center;*/
        letter-spacing: -15px;
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
