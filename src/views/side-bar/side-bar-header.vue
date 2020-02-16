<template>
    <b-container fluid id="side-bar-header" class="p-1">
        <b-row class="m-0" style="width: 100%" no-gutters>
            <b-col cols class="align-self-center p-1">
                <img src="../../assets/logo.png" class="img img-fluid mr-auto d-block">
            </b-col>
            <b-col cols="auto" class="align-self-center px-2" @click="createNewRequisition">
                <i id="new-requisition-button" class="fas fa-plus-circle carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="align-self-center px-2" @click="createNewPublisher">
                <i id="new-publisher-button" class="fas fa-plus-circle carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="align-self-center px-2" @click="createNewSubscription">
                <i id="new-subscription-button" class="fas fa-plus-circle carabina-icon"></i>
            </b-col>
        </b-row>
        <b-row class="m-0 mt-1" style="width: 100%" no-gutters>
            <b-col cols class="align-self-center">
                <div class="p-1">
                    <b-form-input placeholder="Filter" type="text"
                                  @input="filterTextChanged"
                                  :value="textFilter" class="name-input carabina-text">
                    </b-form-input>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/icons.css'
    import {mapGetters, mapMutations} from "vuex";

    export default Vue.extend({
        name: 'SideBarHeader',
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters('side-bar', ['textFilter'])
        },
        methods: {
            ...mapMutations('side-bar',
                ['createNewRequisition', 'createNewPublisher',
                    'createNewSubscription', 'filterTextChanged'])
        }

    });
</script>
<style type="text/css" scoped>
    #side-bar-header {
        background-color: var(--carabina-header-background-darker-color);
    }

    .img {
        width: 170px;
    }

    .name-input {
        height: 35px;
        color: var(--carabina-text-darker-color);
        background-color: transparent;
        border: 1px solid var(--carabina-body-background-lighter-color);
        border-radius: 5px;
        box-shadow: none !important;
    }

    #new-requisition-button {
        color: var(--carabina-requisition-color);
    }

    #new-publisher-button {
        color: var(--carabina-publisher-color);
    }

    #new-subscription-button {
        color: var(--carabina-subscription-color);
    }

    #new-requisition-button:hover, #new-publisher-button:hover, #new-subscription-button:hover {
        filter: brightness(110%);
    }

    #new-requisition-button:active, #new-publisher-button:active, #new-subscription-button:active {
        filter: brightness(120%);
    }


</style>
