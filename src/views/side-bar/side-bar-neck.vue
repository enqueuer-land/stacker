<template>
    <div id="side-bar-neck">
        <b-container fluid class="p-1">
            <b-row class="m-0" style="width: 100%" no-gutters>
                <b-col cols class="align-self-center">
                    <div class="p-2">
                        <b-input-group>
                            <b-input-group-prepend class="filter-icon-container">
                                <i class="fas fa-search filter-icon"></i>
                            </b-input-group-prepend>
                            <b-form-input v-model="filter" placeholder="Filter" type="text"
                                          class="filter-input"></b-form-input>
                        </b-input-group>
                    </div>
                </b-col>
                <b-col cols="auto" class="align-self-center mx-1">
                    <i class="fas fa-folder-plus carabina-icon"></i>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script lang="ts">
    import '@/styles/icons.css';
    import Vue from 'vue';

    export default Vue.extend({
        name: 'SideBarNeck',
        data: function () {
            return {
                filter: ''
            }
        }
    });
</script>
<style type="text/css" scoped>
    #side-bar-neck {
        background-color: var(--carabina-header-background-darker-color);
    }

    .filter-icon {
        padding: 11px;
        font-size: 14px;
        color: var(--carabina-body-background-lighter-color);
    }

    .filter-icon-container {
        border: 1px solid var(--carabina-body-background-lighter-color);
        border-right: none !important;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .filter-input {
        color: var(--carabina-text-darker-color);
        background-color: transparent;
        border: 1px solid var(--carabina-body-background-lighter-color);
        border-left: none !important;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        box-shadow: none !important;
    }
</style>
