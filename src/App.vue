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
    import './styles/color-palette.css'
    import './styles/dimensions.css'

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
        background: var(--carabina-failing-test-color);
    }

    #right {
        background: blue;
    }


</style>
