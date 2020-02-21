const plugin = {
    publishers: [{
        type: 'http',
        hooks: ['onInit', 'onFinish', 'onResponseReceived'],
        template: `
            <b-container fluid class="p-0 m-0">
                <b-form-group
                        class="carabina-text px-4 mb-4"
                        label="URL"
                        label-for="method-url">
                    <b-input-group id="method-url">
                        <dropdown-selector
                                @select="(protocol) => $parent.updateAttribute('method', protocol.value)"
                                :availableList="[
                    {value: 'GET'},
                    {value: 'POST'},
                    {value: 'PUT'},
                    {value: 'DELETE'}]"></dropdown-selector>
                        <b-form-input placeholder="Enter url" type="text"
                                      @input="(value) => $parent.updateAttribute('url', value)"
                                      :value="component.url"
                                      class="text-input carabina-text" trim>
                        </b-form-input>
                    </b-input-group>
                </b-form-group>
                <label class="pl-3 d-block carabina-text mb-0">Headers</label>
                <key-value-table @change="(headers) => $parent.updateAttribute('headers', headers)"
                               :table="{'content-type': 'json/application'}" class="mb-4"></key-value-table>

                <label class="pl-3 d-block carabina-text mb-2">Payload</label>
                <payload :code="component.payload" @change="(value) => $parent.updateAttribute('payload', value)"
                         class="px-3"></payload>
            </b-container>`,
        props: {
            component: Object
        }
    }]
};

module.exports = plugin;
