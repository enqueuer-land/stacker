<template>
    <b-container fluid id="environment-management" class="p-0 m-0">
        <b-row class="m-0 p-0" style="width: 100%; height: 100%" no-gutters>
            <b-col cols class="align-self-center carabina-text pr-4">
                <b-form-input type="text"
                              @input="(name) => changeSelectedEnvironmentName({environment: environment, name})"
                              :value="environment.name"
                              class="text-input carabina-text">
                </b-form-input>
            </b-col>
            <b-col cols="auto" class="pr-4 align-self-center env-mgmt-button">
                <i class="fas fa-save carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="pr-4 align-self-center env-mgmt-button">
                <i class="fas fa-trash carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="pr-4 align-self-center env-mgmt-button">
                <i class="fas fa-clone carabina-icon"></i>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import '@/styles/icons.css';
    import '@/styles/dimensions.css'
    import {mapMutations} from 'vuex'

    export default Vue.extend({
        name: 'EnvironmentManagement',
        props: {
            environment: Object
        },
        methods: {
            ...mapMutations('nav-bar', ['changeSelectedEnvironmentName']),
        }
    });
</script>
<style type="text/css">
    #environment-management {
        height: var(--carabina-tree-node-item-height);
        width: 100%
    }

    #environment-management:hover .env-mgmt-button{
        visibility: visible;
    }

    .env-mgmt-button {
        visibility: hidden;
    }

    .env-mgmt-button:active, .env-mgmt-button:focus {
        outline: none;
        box-shadow: none;
    }


</style>
