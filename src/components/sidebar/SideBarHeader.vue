<template>
    <div :class="['side-bar-header stacker-header', borderColor]"
            @mouseover="mouseIsOver = true"
            @mouseleave="mouseIsOver = false">
        <a href="#" style="text-decoration: none">
            <div class="row no-gutters" style="height: 80%">
                <div class="col">
                    <img src="../../../src/assets/symbol3.png" class="img-fluid mx-auto rounded d-block"
                         style="transform: scaleX(-1) rotate(90deg); position: relative; top: -15%; left: -10%; height: 130%; width: auto">
                </div>
                <header id="side-bar-header" class="col" style="position: relative; left: -15px">
                    stacker
                </header>
            </div>
            <div class="row">
                <div class="col offset-10 align-self-end">
                    <div v-show="mouseIsOver" class="dropdown ml-4">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" v-for="action in actions" :key="action.name" @click="action.click">{{action.name}}</a>
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
                actions: [{
                    name: "Open requisition",
                    click: () => {}
                }, {
                    name: "Add requisition",
                    click: () => {
                        $store.commit('addRequisition', {router: this.$router});
                    }
                }]
            }
        },
        computed: {
            borderColor: function() {
                return {
                    'no-component-selected': !this.$store.state.selectedItem,
                    'requisition-selected': this.$store.state.selectedItem && this.$store.state.selectedItem.component.toUpperCase().startsWith('REQ'),
                    'publisher-selected': this.$store.state.selectedItem && this.$store.state.selectedItem.component.toUpperCase().startsWith('PUB'),
                    'subscription-selected': this.$store.state.selectedItem && this.$store.state.selectedItem.component.toUpperCase().startsWith('SUB'),
                }
            }
        }
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
        color: var(--stacker-background-alternative-color);
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    .no-component-selected {
        border: none;
    }

    .requisition-selected {
        border-right: 2px var(--requisition-color) solid;
    }

    .publisher-selected {
        border-right: 2px var(--publisher-color) solid;
    }

    .subscription-selected {
        border-right: 2px var(--subscription-color) solid;
    }



</style>
