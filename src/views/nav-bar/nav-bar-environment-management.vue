<template>
    <b-container fluid id="environment-management" class="p-0 m-0">
        <b-row class="m-0 p-0" style="width: 100%; height: 100%" no-gutters>
            <b-col cols class="align-self-center carabina-text">
                <b-form-input type="text"
                              :readonly="environment.role === 'none'"
                              @input="(name) => changeSelectedEnvironmentName({environment: environment, name})"
                              :value="environment.name"
                              class="text-input carabina-text">
                </b-form-input>
            </b-col>
            <template>
                <b-col v-for="(actionIcon, index) in actionIcons" cols="auto" :key="index"
                       class="pl-4 align-self-center env-mgmt-button"
                       @click="actionIcon.action">
                    <i :class="['carabina-icon', actionIcon.iconClass]"></i>
                </b-col>
            </template>
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
        name: 'NavBarEnvironmentManagement',
        props: {
            environment: Object
        },
        data: function () {
            return {
                actionIcons: [
                    {
                        iconClass: 'fas fa-save',
                        action: (event) => {
                            event.stopPropagation();
                            this.saveEnvironment({
                                environment: this.environment
                            });
                        }
                    },
                    {
                        iconClass: 'fas fa-clone',
                        action: (event) => {
                            event.stopPropagation();
                            this.cloneEnvironment({
                                environment: this.environment
                            });
                        }
                    },
                    {
                        iconClass: 'fas fa-trash',
                        action: (event) => {
                            event.stopPropagation();
                            this.deleteEnvironment({
                                environment: this.environment
                            });
                        }
                    },
                ],
            }
        },
        methods: {
            ...mapMutations('nav-bar', ['changeSelectedEnvironmentName', 'deleteEnvironment', 'cloneEnvironment', 'saveEnvironment']),
        }
    });
</script>
<style type="text/css">
    #environment-management {
        height: var(--carabina-tree-node-item-height);
        width: 100%
    }

    #environment-management:hover .env-mgmt-button {
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
