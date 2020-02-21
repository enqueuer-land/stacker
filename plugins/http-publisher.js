const plugin = {
    publishers: [{
        type: 'http',
        hooks: ['onInit', 'onFinish', 'onResponseReceived'],
        template: `
            <b-container fluid id="stage-body-http-requisition" class="p-0 m-0">
                <b-form-group
                        class="carabina-text px-4 mb-4"
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
                <label class="pl-3 d-block carabina-text">Headers</label>
                <KeyValueTable @change="(headers) => $parent.updateAttribute('headers', headers)"
                               :table="{'content-type': 'json/application'}" class="mb-4"></KeyValueTable>

                <label class="pl-3 d-block carabina-text">Payload</label>
                <prism-editor language="js" lineNumbers :code="component.payload"
                              @change="(value) => $parent.updateAttribute('payload', value)"
                              class="px-3" style="min-height: 300px; max-height: 400px;"></prism-editor>

            </b-container>`,
        props: {
            component: Object
        }
    }]
};

module.exports = plugin;
