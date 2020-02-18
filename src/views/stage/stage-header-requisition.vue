<template>
    <b-container fluid id="stage-header-requisition" style="padding: 0 !important;">
        <div class="p-2 pt-3 m-0" style="width: 100%; height: 40%">
            <b-breadcrumb class="m-0 p-0 pt-1 pl-3 px-2 breadcrumb carabina-text" style="font-size: 14px"
                          :items="breadcrumbItems"></b-breadcrumb>
        </div>
        <b-row class="px-2" style="width: 100%; height: 50%" no-gutters>
            <b-col cols class="align-self-center px-1">
                <b-input-group>
                    <!--                    https://github.com/SyedWasiHaider/vue-highlightable-input-->
                    <b-form-input id="component-name" placeholder="Enter requisition name" type="text"
                                  @input="(value) => $parent.updateAttribute('name', value)"
                                  :value="component.name"
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
    import Vue from 'vue';
    import '@/styles/texts.css';

    export default Vue.extend({
        name: 'StageHeaderRequisition',
        props: {
            component: Object
        },
        computed: {
            breadcrumbItems: function () {
                if (!this.component) {
                    return [];
                }
                const result = [];
                let parent = this.component;
                while (parent.carabinaMeta && parent.carabinaMeta.parent) {
                    parent = parent.carabinaMeta.parent;
                    result.push({text: parent.name, href: '#', id: parent.id});
                }
                console.log(result);
                return result;
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

    .breadcrumb-item a, .breadcrumb-item span {
        cursor: pointer;
        color: var(--carabina-requisition-color);
        text-decoration: none;
    }

    .run-button-container, .run-button-container:hover {
        box-shadow: none;
    }

    .run-button {
        border: none;
        box-shadow: none;
        color: var(--carabina-requisition-color);
        background-color: transparent;
        transition: all ease 100ms;
    }

    .run-button:hover {
        filter: brightness(125%);
    }

    .run-button:active {
        transform: scale(1.1);
        box-shadow: none !important;
        color: var(--carabina-requisition-color) !important;
        filter: brightness(150%);
        background-color: transparent !important;
    }

</style>
