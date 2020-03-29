module.exports = {
    publishers: {
        http: {
            urlHelp: 'https://github.com/request/request',
            hooks: ['onResponseReceived'],
            template: `
                <b-container fluid class="p-0 m-0">
                    <label class="pl-3 d-block carabina-text mb-2">URL</label>
                    <b-row class="px-3 mb-4" no-gutters>
                        <b-col cols="auto" class="align-self-center">
                            <dropdown-selector
                                    :defaultSelection="{value: method}"
                                    @select="(method) => $parent.updateAttribute('method', method.value)"
                                    :availableList="availableMethods"></dropdown-selector>
                        </b-col>
                        <b-col cols="10" class="align-self-center mt-1">
                            <stacker-input placeholder="Url" type="text"
                                           :highlightableRegex="/\\A?(\\w+=[^&]+)/g"
                                           @input="(value) => $parent.updateAttribute('url', value)"
                                           :value="url"
                                           class="text-input carabina-text px-1" trim>
                            </stacker-input>
                        </b-col>
                    </b-row>
                    <label class="pl-3 d-block carabina-text mb-0">Headers</label>
                    <key-value-table @change="(headers) => $parent.updateAttribute('headers', headers)"
                                     :table="headers" class="mb-4"></key-value-table>

                    <label class="pl-3 d-block carabina-text mb-2">Payload</label>
                    <payload :code="payload"
                             @change="(value) => $parent.updateAttribute('payload', value)"
                             class="px-3"></payload>
                </b-container>`,
            props: {
                component: {
                    url: {
                        type: String,
                        default: 'http://'
                    },
                    method: {
                        type: String,
                        default: 'GET'
                    },
                    payload: {
                        type: String,
                        default: ''
                    },
                    headers: {
                        type: Object,
                        default: {'content-type': 'json/application'}
                    }
                }
            },
            data: function () {
                return {
                    url: (this.component && this.component.url) || 'http://localhost:80',
                    method: (this.component && this.component.method) || 'GET',
                    payload: (this.component && this.component.payload) || '',
                    headers: (this.component && this.component.headers) || {'content-type': 'json/application'},
                    availableMethods: [{value: 'GET'},
                        {value: 'POST'},
                        {value: 'PUT'},
                        {value: 'PATCH'},
                        {value: 'HEAD'},
                        {value: 'CONNECT'},
                        {value: 'OPTIONS'},
                        {value: 'TRACE'},
                        {value: 'DELETE'}]
                }
            },
            mounted: function () {
                this.$parent.updateAttribute('url', this.url);
                this.$parent.updateAttribute('method', this.method);
                this.$parent.updateAttribute('payload', this.payload);
                this.$parent.updateAttribute('headers', this.headers);
            }
        }
    }
};
