<template>
    <div id="app" class="container-fluid pr-0 pl-0">
        <div class="row no-gutters">
            <div class="col-3">
                <SideBar/>
            </div>
            <div class="col">
                <stage/>
            </div>
            <div class="col" style="border-left: 1px solid #4d4d4d">
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
        components: {Stage, Result, SideBar}
    }
</script>

<style>
    :root {
        --requisition-color: #e8bf57;
        --publisher-color: #a9524a;;
        --subscription-color: #589df6;
        --passing-test-color: #42ba84;
        --failing-test-color: #a9524a;
        --information-color: #7ed221;
        --index-color: #a8a8a8;
        --stacker-header-background-color: #141414;
        --stacker-background-color: #2b2b2b;
        --stacker-background-alternative-color: #4d4d4d;

    }
    .dropdown-menu {
        background-color: var(--stacker-background-alternative-color);
        padding-bottom: 0px;
    }
    .dropdown-item {
        color: white;
        border-bottom: 1px var(--stacker-background-color) solid;
    }
    .publisher-color {
        color: var(--publisher-color)
    }
    .requisition-color {
        color: var(--requisition-color);
    }
    .subscription-color {
        color: var(--subscription-color);
    }
    .passing-test-color {
        color: var(--passing-test-color);
    }
    .failing-test-color {
        color: var(--failing-test-color);
    }
    .stacker {
        background-color: var(--stacker-background-color);
    }
    .stacker-header {
        height: 150px;
        background-color: var(--stacker-header-background-color);
        border: 1px solid var(--stacker-background-alternative-color)
    }

</style>
