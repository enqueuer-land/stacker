<template>
    <b-container fluid id="stage-header-requisition" style="padding: 0 !important;">
        <div class="p-2 pt-3 m-0" style="width: 100%; height: 40%">
            <b-breadcrumb class="m-0 p-0 pt-1 pl-1 breadcrumb carabina-text" style="font-size: 14px"
                          :items="breadcrumbItems"></b-breadcrumb>
        </div>
        <b-row class="px-2" style="width: 100%; height: 50%" no-gutters>
            <b-col cols class="align-self-center px-1">
                <b-input-group>
                    <template v-slot:prepend>
                        <b-dropdown no-caret lazy variant="carabina" class="carabina-text protocol-selector">
                            <template v-slot:button-content>
                                <span style="color: var(--carabina-publisher-color)">{{selectedProtocol}}<i class="mt-1 float-right fas fa-caret-down"></i></span>
                            </template>
                            <b-dropdown-item v-for="protocol in protocolsList" :key="protocol.value"
                                             @click="selectedProtocol = protocol.value">{{protocol.value}}
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>
                    <b-form-input id="component-name" placeholder="Enter component name" type="text"
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
    import '@/styles/dropdown.css';
    import Vue from 'vue';

    export default Vue.extend({
        name: 'StageHeader',
        data() {
            return {
                selectedProtocol: 'AMQP',
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
                protocolsList: [
                    {
                        value: 'AMQP',
                        html: `<span style="background-color: transparent; color: red !important;">AMQP</span>`,
                        selected: true
                    },
                    {value: 'HTTP', html: 'HTTP'},
                    {value: 'HTTP', html: 'HTTP'},
                    {value: 'HTTP', html: 'HTTP'},
                    {value: 'HTTP', html: 'HTTP'},
                    {value: 'LARGE PROTOCOL NAME', html: 'LARGE PROTOCOL NAME'}
                ]
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

    .protocol-selector, .dropdown-toggle-no-caret, .btn-carabina {
        width: 120px !important;
        border: none !important;;
        color: var(--carabina-publisher-color) !important;
        background-color: transparent !important;;
        border-bottom: 1px solid var(--carabina-publisher-color) !important;;
    }

    .protocol-selector:hover {
        filter: brightness(1.25);
        /*border-radius: 5px;*/
        /*background-color: var(--carabina-body-background-color) !important;;*/
    }

    .protocol-selector:active, .protocol-selector:focus, .dropdown-toggle:active, .dropdown-toggle:focus, .btn-carabina:focus, .btn-carabina:active {
        box-shadow: none !important;
        outline: none !important;;
    }

</style>
