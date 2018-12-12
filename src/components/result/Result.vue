<template>
    <div class="result" @click="hideModal">

        <result-header :result="result"/>
        <result-tree :result="result" class="scroll-div" style="max-height: calc(100% - 150px);"/>

        <div id="runningModal" class="modal">
            <div class="progress px-4 progress-bar-container">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
            </div>
        </div>

    </div>
</template>

<script>
    import ResultHeader from "./ResultHeader";
    import ResultTree from "./ResultTree";

    const minAnimationTime = 250;

    export default {
        name: 'Result',
        components: {
            ResultHeader,
            ResultTree
        },
        mounted() {
            window.ipcRenderer.on('runningRequisition', () => {
                $('#runningModal').modal('show');
                $('.modal-backdrop').css({position: 'absolute', opacity: .3}).appendTo('.result');
                $('body').removeClass("modal-open");
                this.running = new Date().getTime();
            });
        },
        data() {
            this.$store.state.eventEmitter.on('requisitionReport', (report) => {
                $('#runningModal').modal('hide');
                this.running = null;
                this.result = report;
            });
            const results = this.$store.state.results;
            return {
                running: null,
                result: results[results.length - 1]
            }
        },
        methods: {
            hideModal() {
                $('#runningModal').modal('hide');
                this.running = null;
            }
        },
    }
</script>

<style scoped>
    .result {
        height: 100vh;
        position: relative;
        background-color: var(--stacker-background-color);
        /*border-left: 1px solid var(--stacker-background-alternative-color);*/
    }

    .progress-bar-container {
        background-color: transparent;
        position: relative;
        height: 24px;
    }

    .progress-bar {
        width: 100%;
        background-color: var(--stacker-header-background-color);
        border-radius: 10px;
        border: 2px solid var(--enqueuer-color);
    }

    #runningModal {
        top: 40%;
        position: absolute !important;
    }

</style>
