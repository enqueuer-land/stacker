<template>
    <div :class="['side-bar-header stacker-header']"
         @mouseover="mouseIsOver = true"
         @mouseleave="mouseIsOver = false">
        <a href="#" style="text-decoration: none">
            <div class="row no-gutters" style="height: 80%">
                <div class="col-3">
                    <img src="../../../src/assets/symbol3.png" class="img-fluid mx-auto rounded d-block"
                         style="transform: scale(-1.3, 1.3) rotate(90deg);">
                </div>
                <header id="side-bar-header" class="col" style="position: relative; left: -15px">
                    stacker
                </header>
            </div>
            <div class="row">
                <div class="col offset-10 align-self-end">
                    <div v-show="true || mouseIsOver" class="dropdown pl-3">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" v-for="action in actions" :key="action.name"
                               @click="action.click">{{action.name}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
    import $store from "../../store";

    export default {
        name: 'SideBarHeader',
        data: function () {
            return {
                mouseIsOver: false,
                actions: [
                    {
                        name: "Open requisition",
                        click: () => {
                            $store.commit('openFile', {router: this.$router});
                        }
                    },
                    {
                        name: "Add requisition",
                        click: () => {
                            $store.commit('addRequisition', {router: this.$router});
                        }
                    }]
            }
        },
    }
</script>

<style scoped>

    #side-bar-header {
        height: 120px;
        transform: scale(1, .65);
        font-family: 'Nova Mono', monospace;
        font-size: 100px;
        color: white;
        text-align: center;
        letter-spacing: -15px;
    }

    .dropdown-toggle > i:hover {
        color: var(--index-color);
    }

    .dropdown-toggle::after {
        display: none !important;
    }

</style>
