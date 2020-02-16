<template>
    <b-container fluid id="stage-header" style="padding: 0 !important;">
        <div class="p-2 m-0" style="width: 100%; height: 46%">
            <b-breadcrumb class="m-0 p-0 pt-1 pl-1 breadcrumb carabina-text" style="font-size: 14px"
                          :items="breadcrumbItems"></b-breadcrumb>
        </div>
        <b-row class="px-1" style="width: 100%; height: 50%" no-gutters>
            <b-col cols class="align-self-center px-1">
                <b-input-group>
                    <template v-slot:prepend>
                        <b-form-select plain v-model="selectedProtocol" class="carabina-text protocol-selector" :options="protocolsList"></b-form-select>
                    </template>
                    <b-form-input id="component-name" placeholder="Enter component name" type="text"
                                  class="name-input carabina-text">
                    </b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="auto" class="align-self-center px-1 run-button-container">
                <b-button class="run-button">RUN</b-button>
            </b-col>
        </b-row>
    </b-container>

</template>
<script>
    import '@/styles/texts.css';
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
                    {value: 'AMQP', html: `<span style="background-color: transparent; color: red !important;">AMQP</span>`, selected: true},
                    {value: 'HTTP', html: 'HTTP'},
                    {value: 'LARGE PROTOCOL NAME', html: 'LARGE PROTOCOL NAME'}
                ]
            }
        }
    });
</script>
<style type="text/css" scoped>
    #stage-header {
        background-color: var(--carabina-header-background-color);
    }

    .name-input {
        color: var(--carabina-text-darker-color);
        background-color: transparent;
        border: none;
        border-bottom: 1px solid var(--carabina-body-background-lighter-color);
        box-shadow: none !important;
    }

    button:after {
        margin-left: 10px !important;
        color: blueviolet;
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
    }

    .run-button:hover {
        filter: brightness(110%);
    }

    .run-button:active {
        box-shadow: none !important;
        color: var(--carabina-publisher-color) !important;
        filter: brightness(120%);
        background-color: transparent !important;
    }

    .protocol-selector {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100px;
        border: none;
        color: var(--carabina-publisher-color);
        background-color: transparent;
        text-decoration-style: solid;
        border-bottom: 1px solid var(--carabina-publisher-color);
    }

    .protocol-selector:active, .protocol-selector:focus {
        box-shadow: none;
        outline: none;
    }

    select option {
        margin: 40px;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
    }
</style>
