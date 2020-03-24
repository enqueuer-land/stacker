const statusMap = {
    '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing (WebDAV)',
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status (WebDAV)',
    '208': 'Already Reported (WebDAV)',
    '226': 'IM Used',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '306': '(Unused)',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect (experimental)',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Request Entity Too Large',
    '414': 'Request-URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Requested Range Not Satisfiable',
    '417': 'Expectation Failed',
    '418': 'I\'m a teapot (RFC 2324)',
    '420': 'Enhance Your Calm (Twitter)',
    '422': 'Unprocessable Entity (WebDAV)',
    '423': 'Locked (WebDAV)',
    '424': 'Failed Dependency (WebDAV)',
    '425': 'Reserved for WebDAV',
    '426': 'Upgrade Required',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '444': 'No Response (Nginx)',
    '449': 'Retry With (Microsoft)',
    '450': 'Blocked by Windows Parental Controls (Microsoft)',
    '451': 'Unavailable For Legal Reasons',
    '499': 'Client Closed Request (Nginx)',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    '506': 'Variant Also Negotiates (Experimental)',
    '507': 'Insufficient Storage (WebDAV)',
    '508': 'Loop Detected (WebDAV)',
    '509': 'Bandwidth Limit Exceeded (Apache)',
    '510': 'Not Extended',
    '511': 'Network Authentication Required',
    '598': 'Network read timeout error',
    '599': 'Network connect timeout error',
};

module.exports = {
    subscriptions: {
        http: {
            hooks: ['onMessageReceived'],
            template: `
                <b-container fluid class="p-0 m-0">
                    <b-row no-gutters class="px-4 mb-4">
                        <b-col cols="2" class="align-self-center pl-1">
                            <label class="d-block carabina-text mb-3">Port</label>
                            <stacker-input id="port" type="number"
                                           @input="(value) => $parent.updateAttribute('port', value)"
                                           :value="port"
                                           class="text-input carabina-text" trim>
                            </stacker-input>
                        </b-col>
                        <b-col cols="10" class="align-self-center px-1">
                            <b-row no-gutters align-h="center">
                                <b-col cols="3" class="align-self-center mt-2" style="text-align: right">
                                    <dropdown-selector
                                            class="mt-3"
                                            :defaultSelection="{value: method}"
                                            @select="(protocol) => $parent.updateAttribute('method', protocol.value)"
                                            :availableList="availableMethods"></dropdown-selector>
                                </b-col>
                                <b-col cols="9" class="align-self-center">
                                    <label class="d-block carabina-text mb-3">Endpoint</label>
                                    <stacker-input placeholder="Endpoint" type="text"
                                                   @input="(value) => $parent.updateAttribute('endpoint', value)"
                                                   :value="endpoint"
                                                   :highlightable-regex="/\\/:[^\\/]+/g"
                                                   class="text-input carabina-text px-1" trim>
                                    </stacker-input>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <subscription-commons :component="component"
                                          @timeoutChanged="(value) => $parent.updateAttribute('timeout', value)"
                                          @avoidChanged="(value) => $parent.updateAttribute('avoid', value)"
                    ></subscription-commons>
                    <label class="pl-4 d-block carabina-text mb-0 mt-4">Headers</label>
                    <key-value-table
                            @change="(headers) => $parent.updateAttribute('response', {...response, headers})"
                            :table="response.headers" class="mb-4"></key-value-table>
                    <b-row no-gutters align-h="between">
                        <b-col cols="2" class="align-self-center px-1">
                            <b-form-group
                                    class="carabina-text pl-4 mb-4"
                                    label="Status"
                                    label-class="mb-0"
                                    label-for="status">
                                <stacker-input id="status" type="number"
                                               @input="(value) => $parent.updateAttribute('response', {...response, status: value})"
                                               :value="response.status"
                                               class="text-input carabina-text" trim>
                                </stacker-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols class="align-self-center pl-3 pr-1 mt-1" style="color: red">
                            <label class="carabina-text"
                                   style="color: var(--carabina-subscription-color)">{{statusMap[response.status.toString()] || 'Unknown Status'}}</label>
                        </b-col>
                    </b-row>
                    <label class="pl-4 d-block carabina-text mb-2">Payload</label>
                    <payload :code="response.payload"
                             @change="(value) => $parent.updateAttribute('response', {...response, payload: value})"
                             class="px-4"></payload>
                </b-container>
            `,
            props: {
                component: {
                    response: {
                        type: Object,
                        default: {
                            headers: {
                                type: Object,
                                default: {'content-type': 'json/application'}
                            },
                            status: 333,
                            payload: '',
                        }
                    }
                }
            },
            data: function () {
                return {
                    port: (this.component && this.component.port) || 80,
                    endpoint: (this.component && this.component.endpoint) || '/',
                    method: (this.component && this.component.method) || 'GET',
                    response: {
                        headers: (this.component && this.component.response && this.component.headers) || {'content-type': 'json/application'},
                        status: (this.component && this.component.response && this.component.status) || 200,
                        payload: (this.component && this.component.response && this.component.payload) || '',
                    },
                    availableMethods: [{value: 'GET'},
                        {value: 'POST'},
                        {value: 'PUT'},
                        {value: 'PATCH'},
                        {value: 'HEAD'},
                        {value: 'CONNECT'},
                        {value: 'OPTIONS'},
                        {value: 'TRACE'},
                        {value: 'DELETE'}],
                    statusMap: statusMap
                }
            },
            mounted: function () {
                this.$parent.updateAttribute('port', this.port);
                this.$parent.updateAttribute('endpoint', this.endpoint);
                this.$parent.updateAttribute('method', this.method);
                this.$parent.updateAttribute('response', this.response);
            }

        }
    }
};
