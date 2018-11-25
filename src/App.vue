<template>
    <div id="app" class="container-fluid pr-0 pl-0">
        <div class="row no-gutters">
            <div id="side-bar">
                <SideBar/>
            </div>
            <div id="stage">
                <stage/>
            </div>
            <div id="result">
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
        --invalid-color: #a9524a;
        /*--information-color: #7ed221;*/
        --index-color: #bbbbbb;
        --enqueuer-color: #9FB630;

        --text-color: #f0f0f0;
        --text-smooth-color: #bbbbbb;
        --stacker-header-background-color: #303033;
        --stacker-background-color: #353535;
        --stacker-background-alternative-color: #404040;

    }

    .dropdown-menu {
        /*background-color: var(--text-smooth-color);*/
        padding-bottom: 0;
        padding-top: 1px;
    }

    .dropdown-item {
        color: white;
        background-color: var(--stacker-background-alternative-color);
        border-bottom: 1px var(--stacker-header-background-color) solid;
    }

    .dropdown-item:active {
        color: black;
        background-color: var(--text-smooth-color);
    }

    .dropdown-divider {
        height: 0;
        margin: .01rem 0;
        overflow: hidden;
        /*border-top: 1px solid var(--text-smooth-color);*/
    }

    .dropdown-header {
        /*display: block;*/
        padding: .1rem .5rem;
        /*margin-bottom: 0;*/
        font-size: .75em;
        color: var(--text-smooth-color);
        /*white-space: nowrap;*/
        background-color: var(--stacker-header-background-color);
    }

    .invalid-input {
        box-shadow: 0 0 15px var(--invalid-color);
        text-decoration: underline wavy var(--invalid-color);
    }

    /*!*TODO remove this*!*/
    /*.requisition-color {*/
        /*color: var(--requisition-color);*/
    /*}*/

    .stacker {
        background-color: var(--stacker-background-color);
    }

    .stacker-header {
        height: 150px;
        background-color: var(--stacker-header-background-color);
    }

    #side-bar {
        flex: 0 0 22%;
        max-width: 22%;
    }

    #stage {
        flex: 0 0 43%;
        max-width: 43%;
    }

    #result {
        flex: 0 0 35%;
        max-width: 35%;
    }

</style>
