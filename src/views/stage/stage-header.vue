<template>
    <b-container fluid id="stage-header" style="padding: 0 !important;">
        <b-row class="p-1" style="width: 100%; height: 100%" no-gutters>
            <b-col cols class="align-self-center">
                <b-input-group>
                    <template v-slot:prepend>
                        <b-dropdown text="Dropdown">
                            <b-dropdown-item>Action A</b-dropdown-item>
                            <b-dropdown-item>Action B</b-dropdown-item>
                        </b-dropdown>
                    </template>
                    <b-form-input id="component-name" placeholder="Name" type="text"
                                  class="name-input carabina-text ">
                    </b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="auto" class="align-self-center px-2">
                <i class="fas fa-folder-plus carabina-icon"></i>
            </b-col>
        </b-row>
    </b-container>

</template>
<script>
    import '@/styles/texts.css';
    import Vue from 'vue';

    export default Vue.extend({
        name: 'StageHeader'
    });
</script>
<style type="text/css" scoped>
    #stage-header {
        background-color: var(--carabina-header-background-color);
    }

    .name-input {
        height: 35px;
        color: var(--carabina-text-darker-color);
        background-color: transparent;
        border: 1px solid var(--carabina-body-background-lighter-color);
        border-radius: 5px;
        box-shadow: none !important;
    }

    .dropdown-toggle::after {
        margin-left: 10px !important;
    }
</style>
