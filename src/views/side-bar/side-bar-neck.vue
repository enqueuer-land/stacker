<template>
    <div id="side-bar-neck">
        <b-container fluid class="p-1">
            <b-row class="m-0" style="width: 100%" no-gutters>
                <b-col cols class="align-self-center">
                    <div class="p-2">
                        <b-form-input placeholder="Filter" type="text"
                                      @input="filterTextChanged"
                                      :value="textFilter" class="filter-input carabina-text">
                        </b-form-input>
                    </div>
                </b-col>
                <b-col cols="auto" class="align-self-center px-2" @click="createNewRequisition">
                    <i id="new-button" class="fas fa-folder-plus carabina-icon"></i>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script lang="ts">
    import '@/styles/icons.css';
    import '@/styles/texts.css';
    import {mapMutations, mapGetters} from 'vuex';

    export default {
        name: 'SideBarNeck',
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters('side-bar', ['textFilter'])
        },
        methods: {
            ...mapMutations('side-bar', ['createNewRequisition', 'filterTextChanged'])
        }
    };
</script>
<style type="text/css" scoped>
    #side-bar-neck {
        background-color: var(--carabina-header-background-darker-color);
    }

    .filter-input {
        height: 35px;
        color: var(--carabina-text-darker-color);
        background-color: transparent;
        border: 1px solid var(--carabina-body-background-lighter-color);
        border-radius: 5px;
        box-shadow: none !important;
    }
</style>
