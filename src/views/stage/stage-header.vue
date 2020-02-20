<template>
    <b-container fluid id="stage-header" style="padding: 0 !important;">
        <div class="p-2 pt-3 m-0" style="width: 100%; height: 40%">
            <b-breadcrumb class="m-0 p-0 pt-1 pl-3 px-2 breadcrumb carabina-text" style="font-size: 14px"
                          :items="breadcrumbItems"></b-breadcrumb>
        </div>
        <b-row class="px-2" style="width: 100%; height: 50%" no-gutters>
            <b-col cols class="align-self-center px-1">
                <b-input-group>
                    <template v-if="component.carabinaMeta.componentName !== 'REQUISITION'" v-slot:prepend>
                        <DropdownSelector
                                @select="(protocol) => $parent.updateAttribute('type', protocol.value)"
                                :color="componentColor"
                                :availableList="protocolList"></DropdownSelector>
                    </template>
                    <!--                    https://github.com/SyedWasiHaider/vue-highlightable-input-->
                    <b-form-input id="component-name" placeholder="Enter requisition name" type="text"
                                  @input="(value) => $parent.updateAttribute('name', value)"
                                  :value="component.name"
                                  class="text-input carabina-text">
                    </b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="auto" class="align-self-center px-1 run-button-container">
                <b-button class="run-button" :style="runButtonStyle" @click="runRequisitionViaGlobal(component)">Run
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import {mapActions, mapGetters} from 'vuex'
    import {ComponentStylish} from "@/components/component-stylish";

    export default Vue.extend({
        name: 'StageHeader',
        components: {
        },
        props: {
            component: Object
        },
        data: function () {
            return {
                protocolList: [
                    {value: 'AMQP'},
                    {value: 'HTTP'},
                    {value: 'MQTT'},
                    {value: 'LARGE PROTOCOL NAME'}]
            }
        },
        methods: {
            ...mapActions('stage', ['runRequisitionViaGlobal'])
        },
        computed: {
            ...mapGetters('side-bar', ['breadcrumbItems']),
            runButtonStyle: function () {
                return {
                    "border": 'none',
                    'box-shadow': 'none',
                    'background-color': 'transparent',
                    'transition': 'all ease 100ms',
                    color: this.componentColor
                };
            },
            componentColor: function () {
                return new ComponentStylish(this.component).getComponentColor();
            }
        }
    });
</script>
<style type="text/css" scoped>
    #stage-header {
        background-color: var(--carabina-body-background-darker-color);
    }

    .breadcrumb {
        height: 30px;
        background-color: transparent;
        overflow-y: scroll;
        width: 100%;
    }

    .breadcrumb-item a, .breadcrumb-item span {
        cursor: pointer;
        color: var(--carabina-requisition-color);
        text-decoration: none;
    }

    .run-button-container, .run-button-container:hover {
        box-shadow: none;
    }

    .run-button:hover {
        filter: brightness(125%);
    }

    .run-button:active {
        transform: scale(1.1);
        box-shadow: none !important;
        filter: brightness(150%);
        background-color: transparent !important;
    }

</style>
