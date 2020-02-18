<template>
    <b-container fluid id="side-bar-header" class="p-1">
        <b-row class="m-0 pt-1" style="width: 100%; height: 40%" no-gutters>
            <b-col cols class="align-self-center p-1">
                <img src="../../assets/logo.png" class="pl-1 img img-fluid mr-auto d-block">
            </b-col>
            <b-col cols="auto" class="align-self-center px-3" @click="createNewRequisition">
                <i id="new-requisition-button" class="fas fa-plus carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="align-self-center px-2" @click="createNewPublisher">
                <i id="new-publisher-button" class="fas fa-plus carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="align-self-center px-3" @click="createNewSubscription">
                <i id="new-subscription-button" class="fas fa-plus carabina-icon"></i>
            </b-col>
        </b-row>
        <b-row class="m-0 mt-1" style="width: 100%" no-gutters>
            <b-col cols class="align-self-center">
                <div class="p-1 px-2">
                    <b-form-input placeholder="Enter filter" type="text"
                                  @input="filterTextChanged"
                                  :value="textFilter" class="text-input carabina-text">
                    </b-form-input>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/icons.css'
    import '@/styles/texts.css'
    import {mapGetters, mapMutations} from 'vuex';

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
<style scoped>
    #side-bar-header {
        background-color: var(--carabina-body-background-darker-color);
    }

    .img {
        width: 170px;
    }

    #new-requisition-button {
        font-size: 16px;
        color: var(--carabina-requisition-color);
    }

    #new-publisher-button {
        font-size: 16px;
        color: var(--carabina-publisher-color);
    }

    #new-subscription-button {
        font-size: 16px;
        color: var(--carabina-subscription-color);
    }

</style>
