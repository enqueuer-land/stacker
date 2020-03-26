<template>
    <b-container fluid id="stage-header" style="padding: 0 !important; user-select: none">
        <div class="px-1 pt-3 m-0" style="width: 100%; height: 35%">
            <b-breadcrumb class="m-0 p-0 pt-1 pl-3 px-2 breadcrumb carabina-text" style="font-size: 14px">
                <b-breadcrumb-item v-for="item in breadcrumbItems" :key="item.id" @click="item.click()">
                    {{item.text}}
                </b-breadcrumb-item>
            </b-breadcrumb>
        </div>
        <b-row class="px-2" style="height: 50%" no-gutters>
            <b-col cols="auto" class="align-self-center">
                <DropdownSelector
                        v-if="component.carabinaMeta.type !== 'REQUISITION'"
                        :defaultSelection="{value: component.type.toUpperCase()}"
                        @select="(protocol) => $parent.updateAttribute('type', protocol.value)"
                        :color="componentColor"
                        :availableList="protocolsOfComponentList(component.carabinaMeta.type)"></DropdownSelector>
            </b-col>
            <b-col :cols="component.carabinaMeta.type !== 'REQUISITION' ? 6 : 8"
                   class="align-self-center mt-1 mr-auto">
                <stacker-input id="component-name" placeholder="Component name" type="text"
                               :fill-width="true"
                               @input="(value) => $parent.updateAttribute('name', value)"
                               :state="component.name.length > 2 ? null : false"
                               :value="component.name"
                               empty-value="Component Name"
                               trim
                               class="px-1">
                </stacker-input>
            </b-col>
            <b-col cols="auto" class="align-self-center run-button-container">
                <b-button class="run-button px-4" :style="runButtonStyle" @click="runComponent(component)">Run
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
    import StackerInput from "@/inputs/stacker-input";

    export default Vue.extend({
        name: 'StageHeader',
        components: {StackerInput},
        props: {
            component: Object
        },
        methods: {
            ...mapActions('stage', ['runComponent']),
            breadcrumbClick: function (event) {
                console.log(event);
            }
        },
        computed: {
            ...mapGetters('side-bar', ['breadcrumbItems']),
            ...mapGetters('stage', ['protocolsOfComponentList']),
            runButtonStyle: function () {
                return {
                    border: 'none',
                    'box-shadow': 'none',
                    transition: 'all ease 100ms',
                    'background-color': this.componentColor,
                    color: 'var(--carabina-header-background-darker-color)'
                };
            },
            componentColor: function () {
                return new ComponentStylish(this.component).getComponentColor();
            },
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
        filter: brightness(112%);
    }

    .run-button:active {
        box-shadow: none !important;
        filter: brightness(125%);
    }

</style>
