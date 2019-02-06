<template>
    <div class="http-subscription container-fluid px-4">
        <div class="row">
            <common-subscription :timeout.sync="http.timeout"
                                 :avoid.sync="http.avoid"/>
        </div>
        <div class="row pt-2">
            <div class="col px-2">
                <key-value-input v-model="http.response.headers" title="Headers"/>
            </div>
        </div>
        <div class="row">
            <div class="col-3 pl-2 pr-1">
                <div class="row">
                    <div class="pt-2 pl-3 stacker-label">
                        Port
                    </div>
                </div>
                <div class="input-group input-group-sm mb-1" id="httpSubscriptionPort">
                    <stacker-input v-model="http.port"
                                   class="form-control"
                                   placeholder="8080"></stacker-input>
                </div>
            </div>
            <div class="col pr-4">
                <div class="row">
                    <div class="pt-2 pl-2 stacker-label">
                        Endpoint
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-2" id="httpSubscriptionEndpoint">
                        <stacker-input v-model="http.endpoint"
                                       class="form-control input-group-append"
                                       placeholder="/stacker"></stacker-input>
                        <div class="input-group-append" style="font-size: 0.8em">
                            <button class="btn dropdown-toggle method-button"
                                    type="button" data-toggle="dropdown">{{http.method}}
                            </button>
                            <div class="dropdown-menu">
                                <div class="dropdown-item" style="cursor: pointer" v-for="item in methods" :key="item"
                                   @click="http.method = item">{{item}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Status Code
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 pr-2" id="httpSubscriptionStatusCode">
                <stacker-input v-model="http.response.status"
                               class="form-control"
                               placeholder="200"></stacker-input>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Payload
            </div>
        </div>
        <div class="row">
            <object-formatter class="mb-1 ml-2 mr-2" :text.sync="http.response.payload"
                              :format.sync="http.response.format"/>
        </div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import RoundedSwitch from "../../inputs/RoundedSwitch";
    import CommonSubscription from "../../inputs/CommonSubscription";
    import ObjectFormatter from "../../inputs/ObjectFormatter";
    import StackerInput from "../../inputs/StackerInput";

    const methodsList = ["POST", "GET", "PATCH", "OPTION", "DELETE", "PUT"];

    export default {
        name: 'HttpSubscription',
        components: {StackerInput, ObjectFormatter, CommonSubscription, RoundedSwitch, KeyValueInput},
        props: {
            item: {},
        },
        data: function () {
            const http = this.getContent();
            return {
                http: http,
                methods: methodsList
            }
        },
        methods: {
            getContent() {
                return {
                    ...this.$store.state.subscription.protocols.find(protocol => protocol.protocolName === 'http'),
                    port: this.item.port,
                    endpoint: this.item.endpoint,
                    timeout: this.item.timeout,
                    avoid: this.item.avoid,
                    method: this.item.method || methodsList[0],
                    headers: this.item.headers || {},
                    response: this.item.response || {}
                }
            },
            checkPort: function () {
                const item = $('#httpSubscriptionPort');
                const value = this.http.port;
                if (value === undefined || value.length === 0) {
                    item.addClass('invalid-input');
                    return 'Port cannot be empty';
                } else {
                    item.removeClass('invalid-input');
                }
            },
            checkEndpoint: function () {
                const item = $('#httpSubscriptionEndpoint');
                const value = this.http.endpoint;
                if (value === undefined || value.length === 0) {
                    item.addClass('invalid-input');
                    return 'Endpoint cannot be empty';
                } else {
                    item.removeClass('invalid-input');
                }
            },
            checkStatusCode: function () {
                const item = $('#httpSubscriptionStatusCode');
                const value = this.http.response.status;
                if (value === undefined || value.length === 0) {
                    item.addClass('invalid-input');
                    return 'Status code cannot be empty';
                } else {
                    item.removeClass('invalid-input');
                }
            },
            compileErrors(...errors) {
                return (errors)
                    .filter(error => error !== undefined);
            },
            emit() {
                const payload = this.http;
                payload.errors = this.compileErrors(this.checkPort(payload), this.checkEndpoint(payload), this.checkStatusCode(payload));
                this.$emit('input', payload);
            },
        },
        watch: {
            item() {
                this.http = this.getContent();
            },
            id() {
                this.http = this.getContent();
            },
            http: {
                handler() {
                    this.emit();
                },
                deep: true
            }
        },

    }
</script>

<style scoped>
    .http-subscription {

    }

    .method-button {
        background-color: transparent;
        color: var(--text-color);
        border: 1px solid var(--text-color);
    }

    .method-button:hover {
        box-shadow: 0 0 5px var(--enqueuer-color);
    }


</style>
