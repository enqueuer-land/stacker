const plugin = {
    subscriptions: [{
        type: 'http',
        hooks: ['onMessageReceived'],
        template: `
            <b-container fluid class="p-0 m-0">
                <b-row no-gutters align-h="between">
                    <b-col cols="3" class="align-self-center pl-1">
                        <b-form-group
                                class="carabina-text px-4 mb-4"
                                label="Port"
                                label-class="mb-0"
                                label-for="port">
                            <b-form-input id="port" type="number"
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
                                label-class="mb-0"
                                label-for="method-url">
                            <b-input-group id="method-url">
                                <dropdown-selector
                                        @select="(protocol) => $parent.updateAttribute('method', protocol.value)"
                                        :availableList="[
                    {value: 'GET'},
                    {value: 'POST'},
                    {value: 'PUT'},
                    {value: 'DELETE'}]"></dropdown-selector>
                                <b-form-input placeholder="Endpoint" type="text"
                                              @input="(value) => $parent.updateAttribute('endpoint', value)"
                                              :value="component.endpoint"
                                              class="text-input carabina-text" trim>
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <label class="pl-3 d-block carabina-text mb-0">Headers</label>
                <key-value-table
                        @change="(headers) => $parent.updateAttribute('response', {...component.response, headers})"
                        :table="{'content-type': 'json/application'}" class="mb-4"></key-value-table>

                <b-row no-gutters align-h="between">
                    <b-col cols="3" class="align-self-center pl-1">
                        <b-form-group
                                class="carabina-text pl-4 mb-4"
                                label="Status"
                                label-class="mb-0"
                                label-for="status">
                            <b-form-input id="status" type="number"
                                          @input="(value) => $parent.updateAttribute('response', {...component.response, status: value})"
                                          :value="component.status"
                                          class="text-input carabina-text" trim>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <label class="pl-3 d-block carabina-text mb-2">Payload</label>
                <payload :code="component.payload"
                         @change="(value) => $parent.updateAttribute('response', {...component.response, payload: value})"
                         class="px-3"></payload>
            </b-container>
        `,
        props: {
            component: Object
        }
    }]
};

module.exports = plugin;
