<template>
    <b-container fluid id="stage-footer" style="overflow-y: auto;" class="p-0 m-0">
        <b-button size="sm" variant="none" style="position: absolute" class="pl-2">
            <i class="carabina-icon fas fa-cog" style="font-size: 14px;"></i>
        </b-button>
        <!--            <b-button size="sm" variant="none" @click="decreaseLogFilterLevel">-->
        <!--                <i class="carabina-icon fas fa-minus" style="font-size: 14px;"></i>-->
        <!--            </b-button>-->
        <!--            <b-button size="sm" variant="none" @click="increaseLogFilterLevel">-->
        <!--                <i class="carabina-icon fas fa-plus" style="font-size: 14px;"></i>-->
        <!--            </b-button>-->
        <!--            &lt;!&ndash;                    <span class="px-2 carabina-text" style="user-select: none">{{currentLogLevel}}</span>&ndash;&gt;-->
        <!--            <b-button size="sm" variant="none" class="ml-5">-->
        <!--                <i class="carabina-icon fas fa-expand" style="font-size: 14px;"></i>-->
        <!--            </b-button>-->
        <!--            <b-button size="sm" variant="none" class="" @click="clearLogs">-->
        <!--                <i class="carabina-icon fas fa-ban" style="font-size: 14px;"></i>-->
        <!--            </b-button>-->
        <div v-for="log in enqueuerLogs" :key="log.id" class="carabina-text" style="padding-left: 40px">
            <div :style="logLevelStyle(log.level)">
                {{log.level}}
            </div>
            <span class="px-2" style="color: var(--carabina-text-color)">
                        {{log.timestamp}}
                    </span>
            {{log.message}}
        </div>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import {mapGetters, mapMutations} from 'vuex';

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
        updated: function () {
            const modalBodyElement = document.getElementById('footer-container');
            if (modalBodyElement) {
                modalBodyElement.scrollTop = modalBodyElement.scrollHeight;
            }
        },
        methods: {
            ...mapMutations('stage', ['decreaseLogFilterLevel', 'increaseLogFilterLevel', 'clearLogs'])
        },
        computed: {
            ...mapGetters('stage', ['enqueuerLogs', 'enqueuerErrors', 'currentLogLevel']),
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

    button:active, button:focus {
        outline: none !important;
        box-shadow: none !important;;
    }

</style>
