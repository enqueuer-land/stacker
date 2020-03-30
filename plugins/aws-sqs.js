module.exports = {
    name: 'aws-sqs',
    version: '0.0.1',
    publishers: {
        sqs: {
            urlHelp: 'https://www.npmjs.com/package/aws-sdk',
            hooks: ['onPublished'],
            dependencies: ['enqueuer-plugin-sqs'],
            template: `
                <b-container fluid class="p-0 m-0">
                    <label class="pl-3 d-block carabina-text mb-0">Configurations</label>
                    <key-value-table
                            @change="(awsConfiguration) => $parent.updateAttribute('awsConfiguration', awsConfiguration)"
                            :table="awsConfiguration" class="mb-4"></key-value-table>
                    <label class="pl-3 d-block carabina-text mb-0">Message params</label>
                    <key-value-table
                            @change="(messageParams) => $parent.updateAttribute('messageParams', messageParams)"
                            :table="messageParams" class="mb-4"></key-value-table>
                    <label class="pl-3 d-block carabina-text mb-2">Payload</label>
                    <payload :code="payload"
                             @change="(value) => $parent.updateAttribute('payload', value)"
                             class="px-3"></payload>
                </b-container>`,
            props: {
                component: {
                    awsConfiguration: Object,
                    messageParams: Object,
                    payload: String,
                }
            },
            data: function () {
                return {
                    awsConfiguration: (this.component && this.component.awsConfiguration) || {
                        endpoint: 'http://localhost:9324',
                        accessKeyId: 'na',
                        secretAccessKey: 'na',
                        region: 'us-east-1'
                    },
                    messageParams: (this.component && this.component.messageParams) || {QueueUrl: 'http://localhost:9324/queue/queueName'},
                    payload: (this.component && this.component.payload) || '',
                }
            },
            mounted: function () {
                this.$parent.updateAttribute('awsConfiguration', this.awsConfiguration);
                this.$parent.updateAttribute('messageParams', this.messageParams);
                this.$parent.updateAttribute('payload', this.payload);
            }
        }
    },
    subscriptions: {
        sqs: {
            urlHelp: 'https://www.npmjs.com/package/aws-sdk',
            hooks: ['onMessageReceived'],
            dependencies: ['enqueuer-plugin-sqs'],
            template: `
                <b-container fluid class="p-0 m-0">
                    <label class="pl-3 d-block carabina-text mb-0">Configurations</label>
                    <key-value-table
                            @change="(awsConfiguration) => $parent.updateAttribute('awsConfiguration', awsConfiguration)"
                            :table="awsConfiguration" class="mb-4"></key-value-table>
                    <label class="pl-3 d-block carabina-text mb-0">Message params</label>
                    <key-value-table
                            @change="(messageParams) => $parent.updateAttribute('messageParams', messageParams)"
                            :table="messageParams" class="mb-4"></key-value-table>
                    <subscription-commons :component="component"
                                          @timeoutChanged="(value) => $parent.updateAttribute('timeout', value)"
                                          @avoidChanged="(value) => $parent.updateAttribute('avoid', value)"
                    ></subscription-commons>
                </b-container>`,
            props: {
                component: {
                    awsConfiguration: Object,
                    messageParams: Object
                }
            },
            data: function () {
                return {
                    awsConfiguration: (this.component && this.component.awsConfiguration) || {
                        endpoint: 'http://localhost:9324',
                        accessKeyId: 'na',
                        secretAccessKey: 'na',
                        region: 'us-east-1'
                    },
                    messageParams: (this.component && this.component.messageParams) || {QueueUrl: 'http://localhost:9324/queue/queueName'}
                }
            },
            mounted: function () {
                this.$parent.updateAttribute('awsConfiguration', this.awsConfiguration);
                this.$parent.updateAttribute('messageParams', this.messageParams);
            }
        }
    }
};
