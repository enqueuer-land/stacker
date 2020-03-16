<template>
    <b-container fluid id="stage-footer" style="overflow-y: auto;" class="p-0 m-0">
        <stage-footer-options @expandWindow="() => $emit('expandWindow')"
                              @compressWindow="() => $emit('compressWindow')"></stage-footer-options>
        <div  class="carabina-text" style="padding-left: 40px">
            <div v-for="log in enqueuerLogs" :key="log.id">
                <div :style="logLevelStyle(log.level)">
                    {{log.level}}
                </div>
                <span class="px-2" style="color: var(--carabina-text-color)">
                            {{log.timestamp}}
                        </span>
                {{log.message}}
            </div>

        </div>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import StageFooterOptions from '@/views/stage/stage-footer-options';
    import {mapGetters} from 'vuex';

    export default Vue.extend({
        name: 'StageFooter',
        components: {
            StageFooterOptions
        },
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
        updated: function () {
            const modalBodyElement = document.getElementById('footer-container');
            if (modalBodyElement) {
                modalBodyElement.scrollTop = modalBodyElement.scrollHeight;
            }
        },
        computed: {
            ...mapGetters('stage', ['enqueuerLogs', 'enqueuerErrors']),
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
</style>
