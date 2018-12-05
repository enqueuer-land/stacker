<template>
    <div id="app" class="container-fluid pr-0 pl-0">
        <!--//http://jsfiddle.net/Bek9L/3020/-->

        <div class="row no-gutters">
            <div id="side-bar">
                <SideBar/>
            </div>
            <div id="drag-sidebar" class="dragbar" @mousedown="dragSideBarDown"></div>
            <div id="stage">
                <Stage/>
            </div>
            <div id="drag-resultbar" class="dragbar" @mousedown="dragResultBarDown" style="color: var(--stacker-background-alternative-color);"></div>
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
            // this.$store.commit('addRequisition', {router: this.$router});
            this.$store.commit('openRequisitionFile', {router: this.$router, file: 'requisitions'});
        },
        data() {
            return {
                dragging: false
            }
        },
        methods: {
            dragSideBarDown(event) {
                event.preventDefault();

                this.dragging = true;
                const stage = $('#stage');
                const ghostBar = $('<div>',
                    {
                        id: 'ghost-bar',
                        css: {
                            height: stage.outerHeight(),
                            top: stage.offset().top,
                            left: stage.offset().left
                        }
                    }).appendTo('body');

                $(document).mousemove(function (event) {
                    ghostBar.css("left", event.pageX + 2);
                });
                $(document).mouseup((event) => {
                    console.log('side bar up')
                    if (this.dragging) {
                        const eventX = event.pageX;
                        const resultWidth = parseInt($('#result').css('width'));

                        const sideBarPercentage = ((eventX - 2) / window.innerWidth) * 100;
                        const resultPercentage = (resultWidth / window.innerWidth) * 100;
                        const stagePercentage = 100 - sideBarPercentage - resultPercentage;

                        $('#side-bar').css({
                            flex: `0 0 calc(${sideBarPercentage}% - 2px)`,
                            'max-width': `calc(${sideBarPercentage}% - 2px)`
                        });
                        $('#stage').css({
                            flex: `0 0 calc(${stagePercentage}% - 2px)`,
                            'max-width': `calc(${stagePercentage}% - 2px)`
                        });
                        $('#ghost-bar').remove();

                        $(document).unbind('mousemove');
                        $(document).unbind('mouseup');

                        this.dragging = false;
                    }
                });
            },
            dragResultBarDown(event) {
                event.preventDefault();

                this.dragging = true;
                const result = $('#result');
                const ghostBar = $('<div>',
                    {
                        id: 'ghost-bar',
                        css: {
                            height: result.outerHeight(),
                            top: result.offset().top,
                            left: result.offset().left
                        }
                    }).appendTo('body');

                $(document).mousemove(function (event) {
                    ghostBar.css("left", event.pageX + 2);
                });
                $(document).mouseup((event) => {
                    if (this.dragging) {
                        const eventX = event.pageX;

                        const sideBarWidth = parseInt($('#side-bar').css('width'));
                        const sideBarPercentage = ((sideBarWidth + 2) / window.innerWidth) * 100;
                        const stagePercentage = ((eventX / window.innerWidth) * 100) - sideBarPercentage;
                        const resultPercentage = ((window.innerWidth - eventX - 2) / window.innerWidth) * 100;

                        $('#stage').css({
                            flex: `0 0 ${stagePercentage}%`,
                            'max-width': `${stagePercentage}%`
                        });
                        $('#result').css({
                            flex: `0 0 calc(${resultPercentage}% - 2px)`,
                            'max-width': `calc(${resultPercentage}% - 2px)`
                        });
                        $('#ghost-bar').remove();

                        $(document).unbind('mousemove');
                        $(document).unbind('mouseup');

                        this.dragging = false;
                    }
                });
            },
        }
    }
</script>

<style>
    :root {
        --requisition-color: #e8bf57;
        --publisher-color: #c88022;;
        --subscription-color: #589df6;
        /*--passing-test-color: #42ba84;*/
        --passing-test-color: #9FB630;
        --failing-test-color: #a9524a;
        --invalid-color: #a9524a;
        /*--information-color: #7ed221;*/
        --enqueuer-color: #9FB630;

        --text-color: #eeeeee;
        --text-smooth-color: #a4a4a4;
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
        color: var(--text-color);
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
    }

    .invalid-name {
        text-decoration: underline wavy var(--invalid-color);
    }

    .stacker {
        background-color: var(--stacker-background-color);
    }

    .stacker-header {
        height: 150px;
        background-color: var(--stacker-header-background-color);
    }

    #side-bar {
        flex: 0 0 calc(22% - 2px);
        max-width: calc(22% - 2px);
    }

    #stage {
        flex: 0 0 48%;
        max-width: 48%;
    }

    #result {
        flex: 0 0 calc(30% - 2px);
        max-width:  calc(30% - 2px);
    }

    .dragbar {
        background-color: var(--stacker-background-color);
        float: right;
        width: 2px;
        cursor: col-resize;
    }

    #ghost-bar {
        width: 1px;
        background-color: var(--text-smooth-color);
        opacity: 0.5;
        position: absolute;
        cursor: col-resize;
        z-index: 999
    }
</style>
