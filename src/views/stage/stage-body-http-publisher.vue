<template>
    <b-container fluid id="stage-body-requisition" class="p-0 m-0">
        <b-row class="m-0 px-2 mb-4" style="width: 100%" align-h="between">
            <b-col cols="12" class="align-self-center px-1">
                <b-form-group
                        id="fieldset-1"
                        class="carabina-text"
                        label="URL"
                        label-for="method-url">
                    <b-input-group id="method-url">
                        <DropdownSelector
                                @select="(protocol) => $parent.updateAttribute('method', protocol.value)"
                                :availableList="[
                    {value: 'GET'},
                    {value: 'POST'},
                    {value: 'PUT'},
                    {value: 'DELETE'}]"></DropdownSelector>
                        <b-form-input placeholder="Enter url" type="text"
                                      @input="(value) => $parent.updateAttribute('url', value)"
                                      :value="component.url"
                                      class="text-input carabina-text" trim>
                        </b-form-input>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="m-0 px-2 mb-4" style="width: 100%" align-h="between">
            <b-col cols="12" class="px-1">
            <label idclass="d-block" class="carabina-text">Payload</label>
            <prism-editor language="js" lineNumbers :code="component.payload"
                          @change="(value) => $parent.updateAttribute('payload', value)"
                          class="text-editor"></prism-editor>

            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import Vue from 'vue';
    // import "prismjs/themes/prism-dark.css";
    // import "vue-prism-editor/dist/VuePrismEditor.css";


    export default Vue.extend({
        name: 'StageBodyHttpPublisher',
        props: {
            component: Object
        },
    });
</script>
<style type="text/css" scoped>
    .text-editor {
        max-height: 500px;
    }
</style>
