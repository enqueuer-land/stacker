<template>
    <b-container id="stage-footer" fluid class="carabina-text" v-b-modal.enqueuer-logs-modal>
        <b-row no-gutters align-h="center" align-v="center" style="height: 100%">
            <b-col cols="12" class="align-self-center">
                <div style="white-space: nowrap; text-align: left; overflow: hidden; text-overflow: ellipsis;">
                    {{lastLog.message}}
                </div>
            </b-col>
        </b-row>
        <b-modal id="enqueuer-logs-modal" size="xl" scrollable
                 centered
                 no-fade
                 header-bg-variant="nqr-logs-header"
                 header-text-variant="nqr-logs-header"
                 body-bg-variant="nqr-logs-body"
                 body-text-variant="nqr-logs-body"
                 footer-bg-variant="nqr-logs-footer"
                 footer-text-variant="nqr-logs-footer">
            <template v-slot:modal-header>
                <h5 class="modal-title">Logs</h5>
                <div class="mx-auto">
                    <b-button size="sm" variant="none" @click="decreaseLogFilterLevel">
                        <i class="carabina-icon fas fa-minus" style="font-size: 14px;"></i>
                    </b-button>
                    <span class="modal-title px-4">{{currentLogLevel}}</span>
                    <b-button size="sm" variant="none" @click="increaseLogFilterLevel">
                        <i class="carabina-icon fas fa-plus" style="font-size: 14px;"></i>
                    </b-button>
                </div>
                <b-button size="sm" variant="none" class="ml-5" @click="clearLogs">
                    <i class="carabina-icon fas fa-ban" style="font-size: 14px;"></i>
                </b-button>

            </template>
            <div v-for="log in enqueuerLogs" :key="log.id" class="carabina-text">
                <div :style="logLevelStyle(log.level)">
                    {{log.level}}
                </div>
                <span class="px-2" style="color: var(--carabina-text-color)">
                    {{log.timestamp}}
                </span>
                {{log.message}}
            </div>
        </b-modal>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex';
    import '@/styles/texts.css';

    export default Vue.extend({
        name: 'StageFooter',
        data: function () {
            return {
                logLevelColorMap: {
                    stdout: 'orange',
                    debug: 'var(--carabina-subscription-color)',
                    info: 'var(--carabina-theme-color)',
                    warn: 'var(--carabina-ignored-test-color)',
                    error: 'var(--carabina-failing-test-color)',
                    fatal: 'var(--carabina-requisition-color)',
                }
            }
        },
        mounted() {
            this.$root.$on('bv::modal::shown', () => {
                const modalBodyElement = document.getElementById('enqueuer-logs-modal___BV_modal_body_');
                if (modalBodyElement) {
                    modalBodyElement.scrollTop = modalBodyElement.scrollHeight;
                }
            })
        },
        methods: {
            ...mapMutations('stage', ['decreaseLogFilterLevel', 'increaseLogFilterLevel', 'clearLogs'])
        },
        computed: {
            ...mapGetters('stage', ['enqueuerLogs', 'enqueuerErrors', 'currentLogLevel']),
            lastLog: function () {
                return this.enqueuerLogs[this.enqueuerLogs.length - 1] || {};
            },
            logLevelStyle: function () {
                return (level) => {
                    return {
                        color: this.logLevelColorMap[level.toLowerCase()] || 'var(--carabina-text-color)',
                        width: '60px',
                        display: 'inline-flex',
                    }
                };
            }
        }
    });
</script>
<style type="text/css">
    #stage-footer {
        cursor: pointer;
        background-color: var(--carabina-body-background-darker-color);
        border-top: 1px solid var(--carabina-header-background-lighter-color);
    }

    #stage-footer:focus, #stage-footer:active {
        outline: none;
        box-shadow: none;
    }

    .bg-nqr-logs-body {
        background-color: var(--carabina-nav-bar-background-color);
        font-size: 14px;
    }

    .bg-nqr-logs-footer {
        display: none;
    }

    button:active, button:focus {
        outline: none !important;
        box-shadow: none !important;;
    }

</style>
