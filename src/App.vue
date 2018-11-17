<template>
    <div id="app" class="container-fluid pr-0 pl-0">
        <div class="row no-gutters">
            <div id="side-bar" class="col-3">
                <SideBar/>
            </div>
            <div class="col">
                <stage/>
            </div>
            <div class="col-4">
                <Result/>
            </div>
        </div>
    </div>
</template>

<script>
    import SideBar from "./components/sidebar/SideBar";
    import Result from "./components/result/Result";
    import Stage from "./components/stage/Stage";

    export default {
        components: {Stage, Result, SideBar},
        created() {
            this.$store.commit('addRequisition', {router: this.$router});
        }
    }
</script>

<style>
    :root {
        --requisition-color: #e8bf57;
        --publisher-color: #a9524a;;
        --subscription-color: #589df6;
        /*--passing-test-color: #42ba84;*/
        --passing-test-color: #9FB630;
        --failing-test-color: #a9524a;
        /*--information-color: #7ed221;*/
        --index-color: #bbbbbb;
        --enqueuer-color: #9FB630;
        --stacker-header-background-color: #303033;
        --stacker-background-color: #353535;
        --stacker-background-alternative-color: #404040;

    }

    .dropdown-menu {
        /*background-color: var(--index-color);*/
        padding-bottom: 0;
        padding-top: 2px;
    }

    .dropdown-item {
        color: white;
        background-color: var(--stacker-background-alternative-color);
        border-bottom: 1px var(--stacker-header-background-color) solid;
    }

    .dropdown-item:active {
        color: black;
        background-color: var(--index-color);
    }

    .dropdown-divider {
        height: 0;
        margin: .01rem 0;
        overflow: hidden;
        /*border-top: 1px solid var(--index-color);*/
    }

    /*TODO remove this*/
    .publisher-color {
        color: var(--publisher-color)
    }

    /*TODO remove this*/
    .requisition-color {
        color: var(--requisition-color);
    }

    /*TODO remove this*/
    .subscription-color {
        color: var(--subscription-color);
    }

    /*TODO remove this*/
    .passing-test-color {
        color: var(--passing-test-color);
    }

    /*TODO remove this*/
    .failing-test-color {
        color: var(--failing-test-color);
    }

    .stacker {
        background-color: var(--stacker-background-color);
    }

    .stacker-header {
        height: 150px;
        background-color: var(--stacker-header-background-color);
    }

</style>
