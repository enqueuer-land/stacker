<template>
    <b-container fluid id="nav-bar">
        <b-row class="m-0 p-0" style="width: 100%; height: 100%" no-gutters>
            <b-col cols="auto pl-1" class="align-self-center">
                <img src="../../assets/logo.png" class="img img-fluid" style="user-select: none">
            </b-col>
            <b-col cols class="align-self-center">
            </b-col>
            <b-col cols="auto" class="align-self-center">
                <dropdown-selector
                        style="width: 250px"
                        :defaultSelection="{...selectedEnvironment, value:selectedEnvironment.name}"
                        @select="environmentSelected"
                        :availableList="environments.map(item => ({ ...item, value: item.name}))"></dropdown-selector>
            </b-col>
            <b-col cols="auto" class="px-3 align-self-center env-button" v-b-modal.view-environments-modal>
                <i class="far fa-eye carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="pr-3 align-self-center env-button" v-b-modal.manage-environments-modal>
                <i class="fas fa-cog carabina-icon"></i>
            </b-col>
        </b-row>
        <b-modal v-if="selectedEnvironment && selectedEnvironment.role !== 'none'" id="view-environments-modal"
                 size="xl" scrollable
                 :title="selectedEnvironment.value"
                 header-bg-variant="header"
                 header-text-variant="header"
                 body-bg-variant="body"
                 body-text-variant="body"
                 footer-bg-variant="footer"
                 footer-text-variant="footer">
            <key-value-table :table="selectedEnvironment.table"
                             @change="table => changeSelectedEnvironmentTable({environment: selectedEnvironment, table})">
            </key-value-table>
        </b-modal>

        <b-modal id="manage-environments-modal" size="xl" scrollable
                 title="Manage environments"
                 header-bg-variant="header"
                 header-text-variant="header"
                 body-bg-variant="body"
                 body-text-variant="body"
                 footer-bg-variant="footer"
                 footer-text-variant="footer">
            <EnvironmentManagement v-for="environment in environments" :key="environment.id"
                                   :environment="environment">
            </EnvironmentManagement>
        </b-modal>

    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import '@/styles/icons.css';
    import '@/styles/dropdown.css';
    import {mapGetters, mapMutations} from 'vuex'
    import EnvironmentManagement from '@/views/nav-bar/environment-management'

    export default Vue.extend({
        name: 'NavBar',
        components: {
            EnvironmentManagement
        },
        computed: {
            ...mapGetters('nav-bar', ['environments', 'selectedEnvironment']),
        },
        methods: {
            ...mapMutations('nav-bar', ['environmentSelected', 'changeSelectedEnvironmentTable']),
        }
    });
</script>
<style type="text/css">
    #nav-bar {
        height: var(--carabina-environment-size);
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
</style>
