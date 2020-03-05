<template>
    <b-container id="result-header" class="p-0"
                 style="height: 100%; background-color: var(--carabina-body-background-darker-color);">
        <b-row style="width: 100%" no-gutters class="m-0 p-0 pt-1">
            <b-col cols="auto" class="pl-1 align-self-center">
                <button type="button" class="btn m-2 carabina-text test-badge" :style="testBadgeStyle">
                    {{valid ? 'PASS' : 'FAIL'}}
                </button>
            </b-col>
            <b-col cols class="align-self-center">
                <div class="px-2 result-name carabina-text" :style="resultNameStyle">
                    {{name}}
                </div>
            </b-col>
        </b-row>
        <b-row class="m-0 px-2" style="width: 100%" no-gutters>
            <b-col cols class="align-self-center">
                <b-form-input placeholder="Filter" type="text"
                              @input="filterTextChanged"
                              :value="textFilter" class="text-input carabina-text">
                </b-form-input>
            </b-col>
            <b-col v-for="iconFilter in iconFilters" cols="auto" :key="iconFilter.icon"
                   class="align-self-center carabina-icon filter-icon"
                   @click="iconFilterClicked(iconFilter)" :style="actionButtonStyle(iconFilter)">
                <i :class="iconFilter.icon"></i>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css'
    import {mapGetters, mapMutations} from 'vuex';

    export default Vue.extend({
        name: 'ResultHeader',
        props: {
            valid: Boolean,
            name: String
        },
        methods: {
            ...mapMutations('result', ['filterTextChanged', 'iconFilterClicked'])
        },
        computed: {
            ...mapGetters('result', ['textFilter', 'iconFilters']),
            testBadgeStyle() {
                return {
                    'background-color': this.valid ? 'var(--carabina-passing-test-color)' : 'var(--carabina-failing-test-color)',
                    'color': 'var(--carabina-header-background-color)',
                    'font-size': '15px',
                    'font-weight': 'bold'
                }
            },
            resultNameStyle() {
                return {
                    'height': '30px',
                    'overflow-y': 'scroll',
                    'overflow-x': 'auto',
                    'color': this.valid ? 'var(--carabina-passing-test-color)' : 'var(--carabina-failing-test-color)',
                }
            },
            actionButtonStyle() {
                return function (actionButton) {
                    const style = {
                        color: 'var(--carabina-text-darker-color)',
                    };
                    if (actionButton.active) {
                        style.color = actionButton.color;
                    }
                    return style
                }
            },
        }
    });
</script>
<style scoped>

    .test-badge:active, .test-badge:focus {
        outline: none;
        box-shadow: none;
    }

    .filter-icon {
        padding: 0 10px;
    }
</style>
