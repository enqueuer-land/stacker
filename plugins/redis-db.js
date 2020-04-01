module.exports = {
    name: 'redis-db',
    version: '0.0.1',
    publishers: {
        ['redis-db']: {
            urlHelp: 'https://www.npmjs.com/package/redis',
            dependencies: ['enqueuer-redis-db'],
            hooks: ['onCommandExecuted'],
            template: `
                <b-container fluid class="p-0 m-0">
                    <label class="pl-3 d-block carabina-text mb-0">Options</label>
                    <key-value-table @change="(options) => $parent.updateAttribute('options', options)"
                                     :table="options" class="mb-4"></key-value-table>
                    <b-row no-gutters align-h="between" class="px-3">
                        <b-col cols="auto" class="align-self-center" style="text-align: right">
                            <label class="pl-3 d-block carabina-text mb-0">Command</label>
                            <dropdown-selector
                                    class="mt-2"
                                    :defaultSelection="{value: command}"
                                    @select="onCommandChanged"
                                    :availableList="availableCommands"></dropdown-selector>
                        </b-col>
                        <b-col :cols="['GET', 'KEYS'].includes(command) ? '9': '5'" class="px-3">
                            <template v-if="command === 'KEYS'">
                                <label class="d-block carabina-text mb-4">Pattern</label>
                                <stacker-input placeholder="Pattern"
                                               @input="(pattern) => $parent.updateAttribute('pattern', pattern)"
                                               :value="pattern"
                                               class="text-input carabina-text" trim>
                                </stacker-input>
                            </template>
                            <template v-else>
                                <label class="d-block carabina-text mb-4">Key</label>
                                <stacker-input placeholder="Key"
                                               @input="(key) => $parent.updateAttribute('key', key)"
                                               :value="key"
                                               class="text-input carabina-text" trim>
                                </stacker-input>
                            </template>
                        </b-col>
                        <b-col v-if="!['GET', 'KEYS'].includes(command)" cols="5" class="align-self-center">
                            <label class="d-block carabina-text mb-4">Value</label>
                            <stacker-input placeholder="Value"
                                           @input="(value) => $parent.updateAttribute('value', value)"
                                           :value="value"
                                           class="text-input carabina-text" trim>
                            </stacker-input>
                        </b-col>
                    </b-row>
                </b-container>
            `,
            props: {
                component: {
                    options: Object,
                    command: String,
                    key: String,
                    value: String,
                    pattern: String,
                }
            },
            data: function () {
                return {
                    ...this.getContent(),
                    availableCommands: ['append', 'get', 'keys', 'set',
                        'incrby', 'getset', 'setex', 'setnx']
                        .sort()
                        .map(command => ({value: command.toUpperCase()}))
                }
            },
            watch: {
                component: function () {
                    const content = this.getContent();
                    this.options = content.options;
                    this.command = content.command;
                    this.key = content.key;
                    this.value = content.value;
                    this.pattern = content.pattern;
                    this.emit();
                }
            },
            mounted: function () {
                this.emit();
            },
            methods: {
                getContent: function () {
                    return {
                        options: (this.component && this.component.options) || {
                            url: '[redis[s]:]//[[user][:password@]][host][:port][/db-number]'
                        },
                        command: (this.component && this.component.command && this.component.command.toUpperCase()) || 'GET',
                        key: (this.component && this.component.key) || '',
                        value: (this.component && this.component.value) || '',
                        pattern: (this.component && this.component.pattern) || '',
                    };
                },
                emit: function () {
                    this.$parent.updateAttribute('options', this.options);
                    this.$parent.updateAttribute('command', this.command);
                    this.$parent.updateAttribute('key', this.key);
                    this.$parent.updateAttribute('value', this.value);
                    this.$parent.updateAttribute('pattern', this.pattern);
                },
                onCommandChanged: function (command) {
                    this.command = command.value;
                    this.emit();
                }
            }
        }
    }
};
