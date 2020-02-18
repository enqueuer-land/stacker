<template>
    <b-container fluid id="stage-body-requisition">
        <b-row class="m-0 p-0 mb-4" style="width: 100%" no-gutters align-h="between">
            <b-col cols="5" class="align-self-center pl-2">
                <b-form-group
                        class="mb-0 text-label"
                        label="Delay (ms)"
                        label-for="delay">
                    <b-form-input id="delay" placeholder="Enter delay"
                                  class="text-input carabina-text" lazy>
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="5" class="align-self-center pr-2">
                <b-form-group
                        class="mb-0 text-label"
                        label="Timeout (ms)"
                        label-for="timeout">
                    <b-form-input id="timeout" placeholder="Enter timeout"
                                  class="text-input carabina-text" lazy>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="m-0 p-0 mb-5" style="width: 100%" no-gutters align-h="between">
            <b-col cols="5" class="align-self-center pl-2">
                <b-form-group
                        class="mb-0 text-label"
                        label="Iterations"
                        label-for="iterations">
                    <b-form-input id="iterations" placeholder="Enter iterations"
                                  class="text-input carabina-text" lazy>
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="5" class="align-self-center pr-2">
                <b-form-group
                        class="mb-0 text-label"
                        label="Parallel"
                        label-for="parallel">
                    <b-button block id="parallel" :pressed.sync="parallel" variant="carabina">
                        {{parallel? 'Turn off' : 'Turn on'}}
                    </b-button>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row class="m-0 p-0 pt-2 pl-1 mb-2 new-component-button" style="width: fit-content;"
               @click="createNewComponent('REQUISITION')" no-gutters>
            <b-col cols="auto" class="align-self-center px-2" style="cursor: pointer">
                <i id="new-requisition-button" class="fas fa-plus carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="align-self-center px-2 carabina-text" style="cursor: pointer; user-select: none">
                Add new requisition
            </b-col>
        </b-row>
        <b-row class="m-0 p-0 pt-2 pl-1 mb-2  new-component-button" style="width: fit-content;"
               @click="createNewComponent('PUBLISHER')" no-gutters>
            <b-col cols="auto" class="align-self-center px-2" style="cursor: pointer">
                <i id="new-publisher-button" class="fas fa-plus carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="align-self-center px-2 carabina-text" style="cursor: pointer; user-select: none">
                Add new publisher
            </b-col>
        </b-row>
        <b-row class="m-0 p-0 pt-2 pl-1 mb-2  new-component-button" style="width: fit-content;"
               @click="createNewComponent('SUBSCRIPTION')" no-gutters>
            <b-col cols="auto" class="align-self-center px-2" style="cursor: pointer">
                <i id="new-subscription-button" class="fas fa-plus carabina-icon"></i>
            </b-col>
            <b-col cols="auto" class="align-self-center px-2 carabina-text" style="cursor: pointer; user-select: none">
                Add new publisher
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css'
    import {mapGetters, mapMutations} from 'vuex';

    export default Vue.extend({
        name: 'StageBodyRequisition',
        data: function () {
            return {
                parallel: false,
            }
        },
        methods: {
            ...mapMutations('side-bar', ['createNewComponent'])
        }
    });
</script>
<style type="text/css" scoped>
    #stage-body-requisition {
        height: 100%;
        background-color: var(--carabina-body-background-darker-color);
    }

    .btn-carabina {
        color: var(--carabina-body-background-darker-color);
        background-color: var(--carabina-requisition-color);
        filter: brightness(40%);
        box-shadow: none;
        border: none;
        transition: all ease 200ms;
    }

    .btn-carabina.active {
        box-shadow: none;
        filter: brightness(100%);
    }

    .new-component-button:hover #new-requisition-button, .new-component-button:hover .carabina-text, #new-requisition-button:hover {
        user-select: none;
        filter: brightness(125%);
    }

    .new-component-button:active #new-requisition-button, .new-component-button:active .carabina-text, #new-requisition-button:active {
        user-select: none;
        transform: scale(1.1);
        filter: brightness(150%);
    }

    #new-requisition-button {
        font-size: 16px;
        color: var(--carabina-requisition-color);
    }

    #new-publisher-button {
        font-size: 16px;
        color: var(--carabina-publisher-color);
    }

    #new-subscription-button {
        font-size: 16px;
        color: var(--carabina-subscription-color);
    }


</style>
