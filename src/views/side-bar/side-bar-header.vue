<template>
    <b-container fluid id="side-bar-header" class="p-1">
        <b-row class="m-0 pt-1" style="width: 100%; height: 40%" no-gutters>
            <b-col cols>
            </b-col>
            <b-col cols="auto" class="align-self-center mx-2">
                <b-dropdown split @click="createNewComponent({componentType: 'REQUISITION'})" variant="creators"
                            right class="carabina-text">
                    <template v-slot:button-content>
                        <i id="new-requisition-button" class="fas fa-plus carabina-icon mr-1"></i>
                        Requisition
                    </template>
                    <b-dropdown-item @click="createNewComponent({componentType: 'PUBLISHER'})" class="carabina-text">
                        <i id="new-publisher-button" class="fas fa-plus carabina-icon mr-2"></i>
                        Requisition / publisher
                    </b-dropdown-item>
                    <b-dropdown-item @click="createNewComponent({componentType: 'SUBSCRIPTION'})" class="carabina-text">
                        <i id="new-subscription-button" class="fas fa-plus carabina-icon mr-2"></i>
                        Requisition / subscription
                    </b-dropdown-item>
                </b-dropdown>
            </b-col>
        </b-row>
        <b-row class="m-0 mt-1" style="width: 100%" no-gutters>
            <b-col cols class="align-self-center">
                <div class="p-1 px-2">
                    <b-form-input placeholder="Filter" type="text"
                                  @input="filterTextChanged"
                                  trim
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
    import '@/styles/dropdown.css'
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
            ...mapMutations('side-bar', ['createNewComponent', 'filterTextChanged'])
        }

    });
</script>
<style>
    #side-bar-header {
        background-color: var(--carabina-body-background-darker-color);
    }

    .img {
        min-width: 140px !important;
        width: 140px !important;
    }

    .btn-creators {
        color: var(--carabina-header-background-darker-color);
        background-color: var(--carabina-requisition-color);
        margin: 0;
        padding-left: 6px;
        padding-right: 6px;
    }

    .dropdown-toggle-split {
        filter: brightness(0.85);
        padding-left: 12px;
        padding-right: 12px;
    }

    .dropdown:hover .btn-creators {
        filter: brightness(1.1);
    }

    .dropdown:hover .dropdown-toggle-split {
        filter: brightness(1);
    }

    .btn-creators:active, .btn-creators:focus {
        outline: none !important;
        box-shadow: none !important;
    }

    #new-requisition-button {
        font-size: 16px;
        color: var(--carabina-header-background-darker-color);
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
