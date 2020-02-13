<template>
    <div style="height: 100vh">
        <div class="wrapper" style="display: flex">
            <div class="panel" id="splitter-side-bar">
                <div style="background-color: red; height: var(--carabina-header-size)">
                    Side bar
                </div>
            </div>
            <div class="panel" id="splitter-stage">
                Stage
                <HelloWorld msg="Welcome to Your Vue.js App"/>
            </div>
            <div class="panel" id="splitter-result">
                <h1>Result</h1>
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
        </div>
    </div>
</template>
<script>
    import split from 'split.js'
    import HelloWorld from './HelloWorld'
    import '@/styles/color-palette.css'
    import '@/styles/dimensions.css'

    export default {
        name: 'Main',
        components: {
            HelloWorld
        },
        mounted() {
            split(['#splitter-side-bar', '#splitter-stage', '#splitter-result'], {
                sizes: [25, 50, 25],
                minSize: [200, 600, 200],
                gutterStyle: () => ({
                    width: '2px',
                    cursor: 'col-resize',
                    'background-color': 'var(--carabina-body-background-lighter-color)'
                })
            });
        }
    };

</script>
