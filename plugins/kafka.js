module.exports = {
    name: 'kafka',
    version: '0.0.1',
    publishers: {
        kafka: {
            urlHelp: 'https://www.npmjs.com/package/kafka-node',
            hooks: ['onPublished'],
            dependencies: ['enqueuer-plugin-kafka'],
            template: `
                <b-container fluid class="p-0 m-0">
                    <label class="pl-3 d-block carabina-text mb-0">Client</label>
                    <key-value-table @change="(client) => $parent.updateAttribute('client', client)"
                                     :table="client" class="mb-4"></key-value-table>
                    <label class="pl-3 d-block carabina-text mb-0">Topic</label>
                    <div class="mx-3 mb-4">
                        <stacker-input placeholder="Topic"
                                       @input="(topic) => $parent.updateAttribute('topic', topic)"
                                       :value="topic"
                                       class="text-input carabina-text">
                        </stacker-input>
                    </div>
                    <label class="pl-3 d-block carabina-text mb-2">Payload</label>
                    <payload :code="payload"
                             @change="(value) => $parent.updateAttribute('payload', value)"
                             class="px-3"></payload>
                </b-container>`,
            props: {
                component: {
                    client: Object,
                    topic: String,
                    payload: String,
                }
            },
            data: function () {
                return {
                    client: (this.component && this.component.client) || {kafkaHost: 'localhost:9093'},
                    topic: (this.component && this.component.topic) || '',
                    payload: (this.component && this.component.payload) || '',
                }
            },
            mounted: function () {
                this.$parent.updateAttribute('client', this.client);
                this.$parent.updateAttribute('topic', this.topic);
                this.$parent.updateAttribute('payload', this.payload);
            }
        }
    },
    subscriptions: {
        kafka: {
            urlHelp: 'https://www.npmjs.com/package/kafka-node',
            hooks: ['onMessageReceived'],
            dependencies: ['enqueuer-plugin-kafka'],
            template: `
                <b-container fluid class="p-0 m-0">
                    <label class="pl-3 d-block carabina-text mb-0">Client</label>
                    <key-value-table @change="(client) => $parent.updateAttribute('client', client)"
                                     :table="client" class="mb-4"></key-value-table>
                    <label class="pl-3 d-block carabina-text mb-0">Options</label>
                    <key-value-table @change="(options) => $parent.updateAttribute('options', options)"
                                     :table="options" class="mb-4"></key-value-table>
                    <subscription-commons :component="component"
                                          @timeoutChanged="(value) => $parent.updateAttribute('timeout', value)"
                                          @avoidChanged="(value) => $parent.updateAttribute('avoid', value)"
                    ></subscription-commons>
                </b-container>`,
            props: {
                component: {
                    client: Object,
                    options: Object
                }
            },
            data: function () {
                return {
                    client: (this.component && this.component.client) || {kafkaHost: 'localhost:9093'},
                    options: (this.component && this.component.options) || {topic: ''},
                }
            },
            mounted: function () {
                this.$parent.updateAttribute('client', this.client);
                this.$parent.updateAttribute('options', this.options);
            }
        }
    }
};
