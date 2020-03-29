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
    import stageFooterOptionIcons from '@/icons/stage-footer-option-actions';

    export default Vue.extend({
        name: 'StageFooterOptions',
        data: function () {
            return {
                actions: stageFooterOptionIcons(this)
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
        transform: scale(1.05);
        filter: brightness(1.05);
        color: var(--carabina-theme-color);
    }

    .dropdown-item:active .option-item-class {
        transform: scale(1.1);
        filter: brightness(1.1);
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
