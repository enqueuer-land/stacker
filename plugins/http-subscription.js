const plugin = {
    subscriptions: [{
        type: 'http',
        hooks: ['onInit', 'onFinish', 'onMessageReceived'],
        template: `
            <b-container fluid class="p-0 m-0">
                <b-row no-gutters align-h="between">
                    <b-col cols="3" class="align-self-center pl-1">
                        <b-form-group
                                class="carabina-text px-4 mb-4"
                                label="Port"
                                label-for="port">
                            <b-form-input id="port" placeholder="8080" type="number"
                                          @input="(value) => $parent.updateAttribute('port', value)"
                                          :value="component.port"
                                          class="text-input carabina-text" trim>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols class="align-self-center pr-1">
                        <b-form-group
                                class="carabina-text px-4 mb-4"
                                label="Endpoint"
                                label-for="method-url">
                            <b-input-group id="method-url">
                                <DropdownSelector
                                        @select="(protocol) => $parent.updateAttribute('method', protocol.value)"
                                        :availableList="[
                    {value: 'GET'},
                    {value: 'POST'},
                    {value: 'PUT'},
                    {value: 'DELETE'}]"></DropdownSelector>
                                <b-form-input placeholder="Enter endpoint" type="text"
                                              @input="(value) => $parent.updateAttribute('endpoint', value)"
                                              :value="component.endpoint"
                                              class="text-input carabina-text" trim>
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <label class="pl-3 d-block carabina-text mb-0">Headers</label>
                <KeyValueTable
                        @change="(headers) => $parent.updateAttribute('response', {...component.response, headers})"
                        :table="{'content-type': 'json/application'}" class="mb-4"></KeyValueTable>

                <b-row no-gutters align-h="between">
                    <b-col cols="3" class="align-self-center pl-1">
                        <b-form-group
                                class="carabina-text pl-4 mb-4"
                                label="Status"
                                label-for="status">
                            <b-form-input id="status" placeholder="200" type="number"
                                          @input="(value) => $parent.updateAttribute('response', {...component.response, status: value})"
                                          :value="component.status"
                                          class="text-input carabina-text" trim>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <label class="pl-3 d-block carabina-text mb-0">Payload</label>
                <prism-editor language="js" lineNumbers :code="component.payload"
                              @change="(value) => $parent.updateAttribute('response', {...component.response, payload: value})"
                              class="px-3" style="min-height: 300px; max-height: 400px;"></prism-editor>
            </b-container>
        `,
        props: {
            component: Object
        }
    }]
};

module.exports = plugin;
