<template>
    <div id="app" class="container-fluid pr-0 pl-0">
        <div class="row no-gutters">
            <div class="col-3">
                <SideBar/>
            </div>
            <div class="col" style="border-left: 1px solid #4d4d4d; background-color: #2b2b2b;">
                <div class="col stacker-header" style="color: gray">
                    <h3>Stage</h3>
                </div>
            </div>
            <div class="col" style="border-left: 1px solid #4d4d4d; background-color: #2b2b2b;">
                <div class="col stacker-header" style="color: gray">
                    <h3>Result</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SideBar from "./components/sidebar/SideBar";

    export default {
        components: {SideBar}
    }
</script>

<style>
    :root {
        --requisition-color: #e8bf57;
        --publisher-color: #a9524a;;
        --subscription-color: #589df6;
    }

    .stacker-header {
        height: 150px;
        background-color: #141414;
    }

    .stacker {
        height: 150px;
        background-color: #2b2b2b;
    }

</style>
