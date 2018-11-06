<template>
    <div id="app" class="container-fluid pr-0 pl-0">
        <div class="row no-gutters">
            <div class="col-3">
                <SideBar/>
            </div>
            <div class="col" style="border-left: 1px solid var(--stacker-background-alternative-color); background-color: var(--stacker-background-color);">
                <div class="col stacker-header" style="color: gray">
                    <h3>Stage</h3>
                </div>
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

    export default {
        components: {Result, SideBar}
    }
</script>

<style>
    :root {
        --requisition-color: #e8bf57;
        --publisher-color: #a9524a;;
        --subscription-color: #589df6;
        --passing-test-color: #42ba84;
        --failing-test-color: #a9524a;
        --stacker-background-color: #2b2b2b;
        --stacker-background-alternative-color: #4d4d4d;

    }

    .text-publisher {
        color: var(--publisher-color)
    }
    .text-requisition {
        color: var(--requisition-color);
    }
    .text-subscription {
        color: var(--subscription-color);
    }
    .passing-test-color {
        color: var(--passing-test-color);
    }
    .failing-test-color {
        color: var(--failing-test-color);
    }


    .stacker-header {
        height: 150px;
        background-color: #141414;
        border: 1px solid var(--stacker-background-alternative-color)
    }

    .stacker {
        background-color: var(--stacker-background-color);
    }

</style>
