<template>
    <b-dropdown no-caret lazy dropup variant="carabina-footer-options" class="carabina-text" style="position: absolute">
        <template v-slot:button-content>
            <i class="fas fa-cog carabina-icon option-icon"
               style="font-size: 14px; color: var(--carabina-text-darker-color)"></i>
        </template>
        <div v-for="(item, index) in actions" :key="index">
            <b-dropdown-divider v-if="item.divider"></b-dropdown-divider>
            <b-dropdown-item v-else>
                <b-row class="pl-2" @click="item.action">
                    <b-col cols="auto" class="align-self-center px-1">
                        <i :class="['carabina-icon option-item-class', item.iconClass]"
                           style="font-size: 14px"></i>
                    </b-col>
                    <b-col cols class="align-self-center">
                        {{item.name}}
                    </b-col>
                </b-row>
            </b-dropdown-item>
        </div>
    </b-dropdown>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/icons.css';
    import '@/styles/texts.css';
    import {mapGetters, mapMutations} from 'vuex';

    export default Vue.extend({
        name: 'StageFooterOptions',
        data: function () {
            return {
                actions: [
                    {
                        name: 'Decrease log level filter',
                        iconClass: 'fas fa-minus',
                        action: () => {
                            this.decreaseLogFilterLevel();
                        }
                    },
                    {
                        name: 'Increase log level filter',
                        iconClass: 'fas fa-plus',
                        action: () => {
                            this.increaseLogFilterLevel();
                        }
                    },
                    {
                        divider: true
                    },
                    {
                        name: 'Expand log window',
                        iconClass: 'fas fa-expand',
                        action: () => {
                            this.$emit('expandWindow');
                        }
                    },
                    {
                        name: 'Collapse log window',
                        iconClass: 'fas fa-compress',
                        action: () => {
                            this.$emit('compressWindow');
                        }
                    },
                    {
                        divider: true
                    },
                    {
                        name: 'Clear logs',
                        iconClass: 'fas fa-ban',
                        action: () => {
                            this.clearLogs();
                        }
                    },
                ]
            }
        },
        methods: {
            ...mapMutations('stage', ['decreaseLogFilterLevel', 'increaseLogFilterLevel', 'clearLogs'])
        },
        computed: {
            ...mapGetters('stage', ['currentLogLevel']),
        }
    });
</script>
<style type="text/css">
    button:active, button:focus {
        outline: none !important;
        box-shadow: none !important;
    }

    .btn-carabina-footer-options {
        padding-left: 8px;
    }

    .dropdown-item:hover .option-item-class {
        transform: scale(1.25);
        filter: brightness(1.25);
        color: var(--carabina-theme-color);
    }

    .dropdown-item:active .option-item-class {
        transform: scale(1.5);
        filter: brightness(1.5);
        color: var(--carabina-theme-color);
    }

    .option-icon {
        color: transparent;
        transition: all 200ms ease;
    }

    .option-item-class {
        color: var(--carabina-text-darker-color);
    }
</style>
