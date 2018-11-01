<template>
    <div id="app" class="container-fluid">
        <div class="row no-gutters">
            <div class="col-3">
                <SideBar/>
            </div>
            <div class="col">
                <h3>Stage</h3>
            </div>
            <div class="col">
                <h3>Result</h3>
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
    #app {
    }
</style>
