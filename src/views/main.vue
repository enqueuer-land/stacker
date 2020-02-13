<template>
    <div style="height: 100vh">
        <div class="wrapper" style="display: flex">
            <div class="panel" id="splitter-side-bar">
                <SideBar></SideBar>
            </div>
            <div class="panel" id="splitter-stage">
                <Stage/>
            </div>
            <div class="panel" id="splitter-result">
                <Result></Result>
            </div>
        </div>
    </div>
</template>
<script>
    import '@/styles/color-palette.css'
    import '@/styles/dimensions.css'
    import split from 'split.js'
    import Stage from './stage/stage'
    import SideBar from "@/views/side-bar/side-bar";
    import Result from "@/views/result/result";

    export default {
        name: 'Main',
        components: {
            Result,
            SideBar,
            Stage
        },
        mounted() {
            split(['#splitter-side-bar', '#splitter-stage', '#splitter-result'], {
                sizes: [25, 50, 25],
                minSize: [200, 600, 200],
                gutterStyle: () => ({
                    width: '1px',
                    cursor: 'col-resize',
                    'background-color': 'var(--carabina-body-background-lighter-color)'
                })
            });
        }
    };

</script>
