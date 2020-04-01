<template>
    <b-container fluid id="nav-bar" class="pr-1">
        <b-row class="m-0 px-0" style="width: 100%; height: 100%" no-gutters>
            <b-col cols="auto pl-3" class="align-self-center">
                <img src="../../assets/logo.png" class="img img-fluid" style="user-select: none; filter: brightness(2)">
            </b-col>
            <b-col cols class="align-self-center">
            </b-col>
            <b-col cols="auto" class="align-self-center">
                <dropdown-selector
                        style="width: 250px"
                        :defaultSelection="{...selectedEnvironment, value: selectedEnvironment.name}"
                        @select="environmentSelected"
                        :availableList="environments.map(item => ({ ...item, value: item.name}))"></dropdown-selector>
            </b-col>
            <b-col cols="auto" class="px-4 align-self-center env-button" v-b-modal.view-environments-modal>
                <i class="fas fa-eye carabina-icon" :style="editStyle"></i>
            </b-col>
            <b-col cols="auto" class="pr-4 align-self-center env-button" @click="addNewEnvironment"
                   v-b-modal.view-environments-modal>
                <i class="fas fa-plus carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="pr-4 align-self-center env-button" v-b-modal.manage-environments-modal>
                <i class="fas fa-cog carabina-icon"></i>
            </b-col>
        </b-row>
        <b-modal v-if="selectedEnvironment && selectedEnvironment.role !== 'none'" id="view-environments-modal"
                 no-fade
                 centered
                 hide-footer
                 hide-header
                 size="xl" scrollable
                 :title="selectedEnvironment.name"
                 body-bg-variant="body"
                 body-text-variant="body"
                 footer-bg-variant="footer"
                 footer-text-variant="footer">
            <stacker-input style="font-size: 30px" :value="selectedEnvironment.name"
                           :disableHighlight="true"
                           @input="name => changeSelectedEnvironmentName({environment: selectedEnvironment, name})"></stacker-input>
            <key-value-table class="pt-4" :table="selectedEnvironment.store"
                             @change="store => changeSelectedEnvironmentStore({environment: selectedEnvironment, store})" />
        </b-modal>

        <b-modal id="manage-environments-modal" size="lg" scrollable
                 no-fade
                 centered
                 hide-footer
                 hide-header
                 body-bg-variant="body"
                 body-text-variant="body"
                 footer-bg-variant="footer"
                 footer-text-variant="footer">
            <div style="font-size: 30px" class="carabina-text pb-4">Manage environments</div>
            <div v-for="environment in environments" :key="environment.id">
                <NavBarEnvironmentManagement v-if="environment.role !== 'none'" :environment="environment" />
            </div>
        </b-modal>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import '@/styles/icons.css';
    import '@/styles/dropdown.css';
    import {mapGetters, mapMutations} from 'vuex'
    import NavBarEnvironmentManagement from '@/views/nav-bar/nav-bar-environment-management'

    export default Vue.extend({
        name: 'NavBar',
        components: {
            NavBarEnvironmentManagement
        },
        computed: {
            ...mapGetters('nav-bar', ['environments', 'selectedEnvironment']),
            editStyle: function () {
                const style = {};
                if (this.selectedEnvironment.role === 'none') {
                    style.color = 'var(--carabina-text-darker-color)';
                    style['pointer-events'] = 'none'
                }
                return style;
            }
        },
        methods: {
            ...mapMutations('nav-bar', ['environmentSelected', 'changeSelectedEnvironmentStore',
                'addNewEnvironment', 'changeSelectedEnvironmentName']),
        }
    });
</script>
<style type="text/css">
    #nav-bar {
        background-color: var(--carabina-nav-bar-background-color);
        width: 100%
    }

    .env-button:active, .env-button:focus {
        outline: none;
        box-shadow: none;
    }

    .modal-title {
        color: var(--carabina-text-darker-color);
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    .bg-body, .modal-content {
        padding: 8px;
        background-color: var(--carabina-header-background-darker-color);
    }

    .btn-env-mgmt-button {
        transition: all ease 200ms;
    }

    .btn-env-mgmt-button:hover {
        color: var(--carabina-text-color) !important;
    }

    .btn-env-mgmt-button:focus {
        outline: none !important;
        box-shadow: none !important;
    }

    .btn-env-mgmt-button:active {
        transform: scale(1.12);
    }
</style>
