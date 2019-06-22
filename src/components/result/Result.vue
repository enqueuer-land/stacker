<template>
    <div class="result" @click="hideModal">

        <result-header :results="results" :requisition="requisition"/>
        <result-body :results="results" class="scroll-div" style="height: calc(100% - 190px);"/>
        <result-footer style="height: 40px;"></result-footer>

        <div id="runningModal" class="modal">
            <div class="progress px-4 progress-bar-container">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
            </div>
        </div>

    </div>
</template>

<script>
    import ResultHeader from "./ResultHeader";
    import ResultBody from "./ResultBody";
    import ResultFooter from "./ResultFooter";

    const minAnimationTime = 250;

    export default {
        name: 'Result',
        components: {
            ResultFooter,
            ResultHeader,
            ResultBody
        },
        mounted() {
            window.ipcRenderer.on('runningRequisition', () => {
                $('#runningModal').modal('show');
                $('.modal-backdrop').css({position: 'absolute', opacity: .3}).appendTo('.result');
                $('body').removeClass("modal-open");
                this.running = new Date().getTime();
            });
            this.$store.state.eventEmitter.on('requisitionReport', (reports, requisition) => {
                $('#runningModal').modal('hide');
                this.running = null;
                this.results = reports;
                this.requisition = requisition;
            });
            this.$store.state.eventEmitter.on('clearResult', () => {
                this.results = null;
                this.requisition = null;
            });
        },
        data() {

            return {
                running: null,
                results: null,
                requisition: null
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
