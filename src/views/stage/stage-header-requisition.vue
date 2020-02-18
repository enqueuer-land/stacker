<template>
    <b-container fluid id="stage-header-requisition" style="padding: 0 !important;">
        <div class="p-2 pt-3 m-0" style="width: 100%; height: 40%">
            <b-breadcrumb class="m-0 p-0 pt-1 pl-1 breadcrumb carabina-text" style="font-size: 14px"
                          :items="breadcrumbItems"></b-breadcrumb>
        </div>
        <b-row class="px-2" style="width: 100%; height: 50%" no-gutters>
            <b-col cols class="align-self-center px-1">
                <b-input-group>
<!--                    https://github.com/SyedWasiHaider/vue-highlightable-input-->
                    <b-form-input id="component-name" placeholder="Enter requisition name" type="text"
                                  class="text-input carabina-text">
                    </b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="auto" class="align-self-center px-1 run-button-container">
                <b-button class="run-button">Run</b-button>
            </b-col>
        </b-row>
    </b-container>

</template>
<script>
    import '@/styles/texts.css';
    import Vue from 'vue';

    export default Vue.extend({
        name: 'StageHeaderRequisition',
        data() {
            return {
                breadcrumbItems: [
                    {
                        text: 'Admin',
                        href: '#'
                    },
                    {
                        text: 'Manage',
                        href: '#'
                    },
                    {
                        text: 'Library',
                        active: true
                    }
                ],
            }
        }
    });
</script>
<style type="text/css" scoped>
    #stage-header-requisition {
        background-color: var(--carabina-body-background-darker-color);
    }

    .breadcrumb {
        height: 30px;
        background-color: transparent;
        overflow-y: scroll;
        width: 100%;
    }

    .breadcrumb-item:not(.active) a {
        color: var(--carabina-requisition-color);
        text-decoration: none;
    }

    .run-button-container, .run-button-container:hover {
        box-shadow: none;
    }

    .run-button {
        border: none;
        box-shadow: none;
        color: var(--carabina-publisher-color);
        background-color: transparent;
        transition: all ease 100ms;
    }

    .run-button:hover {
        filter: brightness(125%);
    }

    .run-button:active {
        transform: scale(1.1);
        box-shadow: none !important;
        color: var(--carabina-publisher-color) !important;
        filter: brightness(150%);
        background-color: transparent !important;
    }
</style>
