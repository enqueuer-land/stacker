<template>
    <b-container fluid id="nav-bar" class="pr-1">
        <b-row class="m-0 px-0 py-1 pb-2" style="width: 100%; height: 100%" no-gutters>
            <b-col cols="auto pl-3" class="align-self-center">
                <img src="../../assets/logo.png" class="img img-fluid" style="user-select: none">
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
                <i class="fas fa-pen carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="pr-4 align-self-center env-button" v-b-modal.manage-environments-modal>
                <i class="fas fa-cog carabina-icon"></i>
            </b-col>
        </b-row>
        <b-modal v-if="selectedEnvironment && selectedEnvironment.role !== 'none'" id="view-environments-modal"
                 size="xl" scrollable
                 :title="selectedEnvironment.name"
                 header-bg-variant="header"
                 header-text-variant="header"
                 body-bg-variant="body"
                 body-text-variant="body"
                 footer-bg-variant="footer"
                 footer-text-variant="footer">
            <key-value-table :table="selectedEnvironment.store"
                             @change="store => changeSelectedEnvironmentStore({environment: selectedEnvironment, store})">
            </key-value-table>
        </b-modal>

        <b-modal id="manage-environments-modal" size="lg" scrollable
                 title="Manage environments"
                 header-bg-variant="header"
                 header-text-variant="header"
                 body-bg-variant="body"
                 body-text-variant="body"
                 footer-bg-variant="footer"
                 footer-text-variant="footer">
            <NavBarEnvironmentManagement v-for="environment in environments" :key="environment.id"
                                   :environment="environment">
            </NavBarEnvironmentManagement>
            <b-row class="m-0 px-0 pt-4 pb-1 justify-content-md-center" style="width: 100%; height: 100%">
                <b-col v-for="(button, index) in buttons" :key="index" cols="auto"
                       class="align-self-center carabina-text mx-5" @click="button.action">
                    <i :class="['carabina-icon', button.iconClass]"></i>
                    <b-button class="carabina-text" variant="env-mgmt-button">
                        {{button.label}}
                    </b-button>
                </b-col>
            </b-row>
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
        data: function () {
            return {
                buttons: [
                    {
                        label: 'New',
                        iconClass: 'fas fa-plus',
                        action: (event) => {
                            event.stopPropagation();
                            this.addNewEnvironment({});
                        }
                    },
                    {
                        label: 'Open',
                        iconClass: 'fas fa-folder-open',
                        action: (event) => {
                            event.stopPropagation();
                            this.loadEnvironment({});
                        }
                    },
                ]
            }
        },
        computed: {
            ...mapGetters('nav-bar', ['environments', 'selectedEnvironment']),
        },
        methods: {
            ...mapMutations('nav-bar', ['environmentSelected', 'changeSelectedEnvironmentStore',
                'addNewEnvironment', 'loadEnvironment']),
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

    .modal-header {
        border-bottom: 1px solid var(--carabina-body-background-color);
    }

    .bg-body, .bg-header, .modal-content {
        padding: 8px;
        background-color: var(--carabina-header-background-darker-color);
    }

    .bg-footer, button .close {
        display: none;
    }

    button.close {
        display: none;
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
