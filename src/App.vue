<template>
    <div id="app">
        <b-container fluid class="p-0">
            <b-row style="height: 100%" no-gutters>
                <b-col cols="3">
                    <div style="background-color: red; height: var(--carabina-header-size)">
                        Side bar
                    </div>
                </b-col>
                <b-col cols="3">
                    Stage
                    <router-view/>
                </b-col>
                <b-col cols>
                    <div class="wrapper">
                        <div class="panel panel__left" id="left">
                            <h1>LEFT</h1>
                        </div>
                        <div class="panel panel__right" id="right">
                            <h1>RIGHT</h1>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import split from 'split.js'

    export default {
        mounted() {
            split(['#left', '#right'], {
                sizes: [50, 50],
                minSize: [100, 300],
                gutterSize: 2,

            });
        }
    };

</script>

<style>
    :root {
        --carabina-header-size: 150px;
        --carabina-scrollbar-color: #324D36;

        /*https://coolors.co/9fb630-ffe8af-c4bcf2-d4f2db-cef7a0*/
        --carabina-requisition-color: #FFC914;
        --carabina-publisher-color: #E4572E;
        --carabina-subscription-color: #17BEBB;

        --carabina-ignored-test-color: #d5ba50;
        --carabina-passing-test-color: #9FB630;
        --carabina-failing-test-color: #a9524a;

        --carabina-body-background-lighter-color: #424242;
        --carabina-body-background-color: #353535;
        --carabina-header-background-lighter-color: #3f3d43;
        --carabina-header-background-color: #2b2a2e;
        --carabina-header-background-darker-color: #201f21;
        --carabina-text-color: #F4FAFF;
        --carabina-text-darker-color: #9CA0A3;

        --carabina-theme-color: #9FB630;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .wrapper {
        display: flex;
    }

    .panel {
        height: calc(100vh - 20px);
    }

    #left {
        background: red;
    }

    #right {
        background: blue;
    }


</style>
