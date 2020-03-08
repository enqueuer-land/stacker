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
                 :cancel-disable="true"
                 :ok-disabled="true"
                 busy
                 no-fade
                 title="Enqueuer logs"
                 header-bg-variant="nqr-logs-header"
                 header-text-variant="nqr-logs-header"
                 body-bg-variant="nqr-logs-body"
                 body-text-variant="nqr-logs-body"
                 footer-bg-variant="nqr-logs-footer"
                 footer-text-variant="nqr-logs-footer">
            <div v-for="log in enqueuerLogs" :key="log.id">
                <div class="carabina-text"
                     :style="logLevelStyle(log.level)">
                    {{log.level}}
                </div>
                <span class="carabina-text pl-2" style="color: var(--carabina-text-color)">
                    {{log.timestamp}}
                </span>
                <span class="carabina-text pl-2">
                    {{log.message}}
                </span>
            </div>
        </b-modal>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import {mapGetters} from 'vuex';
    import '@/styles/texts.css';

    export default Vue.extend({
        name: 'StageFooter',
        data: function () {
            return {
                logLevelColorMap: {
                    debug: 'var(--carabina-subscription-color)',
                    info: 'var(--carabina-theme-color)',
                    warn: 'var(--carabina-ignored-test-color)',
                    error: 'var(--carabina-failing-test-color)',
                    fatal: 'var(--carabina-requisition-color)',
                }
            }
        },
        computed: {
            ...mapGetters('stage', ['enqueuerLogs', 'enqueuerErrors']),
            lastLog: function () {
                return this.enqueuerLogs[this.enqueuerLogs.length - 1] || {};
            },
            logLevelStyle: function () {
                return (level) => {
                    return {
                        color: this.logLevelColorMap[level.toLowerCase()] || 'var(--carabina-text-color)',
                        width: '60px',
                        display: 'inline-flex'
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
    }

    .bg-nqr-logs-footer {
        display: none;
    }


</style>
