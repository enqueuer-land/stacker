<template>
    <div style="height: 100vh; background-color: var(--carabina-header-background-darker-color);">
        <NavBar class="m-0 p-0" style="height: var(--carabina-nav-bar-size)"></NavBar>
        <div class="wrapper" style="display: flex; height: calc(100% - var(--carabina-nav-bar-size))">
            <div id="splitter-side-bar">
                <SideBar></SideBar>
            </div>
            <div id="splitter-stage">
                <Stage/>
            </div>
            <div id="splitter-result">
                <Result></Result>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import split from 'split.js';
    import '@/styles/dimensions.css';
    import '@/styles/color-palette.css';
    import NavBar from '@/views/nav-bar/nav-bar';
    import Stage from '@/views/stage/stage';
    import Result from "@/views/result/result";
    import SideBar from "@/views/side-bar/side-bar";
    import Store from 'electron-store';

    const dimensionsRepository = new Store({name: 'dimensions'});

    export default Vue.extend({
        name: 'Main',
        components: {
            Result,
            SideBar,
            NavBar,
            Stage
        },
        mounted() {
            split(['#splitter-side-bar', '#splitter-stage', '#splitter-result'], {
                gutterSize: 2,
                sizes: dimensionsRepository.get('relativeDimensions', [25, 40, 35]),
                minSize: [300, 400, 400],
                gutterStyle: () => ({
                    position: 'relative',
                    width: '3px',
                    cursor: 'col-resize',
                    'background-color': 'var(--carabina-body-background-color)'
                }),
                onDragEnd: (data) => {
                    dimensionsRepository.set('relativeDimensions', data);
                }

            });
        }
    });

</script>
