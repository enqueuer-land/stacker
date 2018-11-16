<template>
    <div class="http-subscription container-fluid px-4">
        <div class="row">
            <common-subscription :timeout.sync="http.timeout"
                                 :avoid.sync="http.avoid"/>
        </div>
        <div class="row">
            <div class="col-2 pl-2 pr-1">
                <div class="row">
                    <div class="pt-2 pl-3" style="font-size: 0.8em; color: white">
                        Port
                    </div>
                </div>
                <div class="input-group input-group-sm mb-1">
                    <input v-model="http.port" placeholder="8080" type="text" class="form-control"
                           style="background-color: transparent; color: white; border-color: var(--stacker-background-alternative-color)">
                </div>
            </div>
            <div class="col pr-4">
                <div class="row">
                    <div class="pt-2 pl-1" style="font-size: 0.8em; color: white">
                        Endpoint
                    </div>
                </div>
                <div class="row">
                    <div class="input-group input-group-sm mb-1 pl-1">
                        <input v-model="http.endpoint" placeholder="/stacker" type="text"
                               class="form-control input-group-append"
                               style="background-color: transparent; color: white; border-color: var(--stacker-background-alternative-color)">
                        <div class="input-group-append" style="font-size: 0.8em">
                            <button class="btn dropdown-toggle"
                                    style="background-color: transparent; color: white; border: 1px solid white"
                                    type="button" data-toggle="dropdown">{{http.method}}
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" v-for="item in methods" :key="item"
                                   @click="http.method = item">{{item}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <key-value-input v-model="http.response.headers" title="Headers"/>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Status Code
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 pr-2">
                <input v-model="http.response.status" type="text" class="form-control"
                       style="background-color: transparent; color: white; border-color: var(--stacker-background-alternative-color)"
                       placeholder="200">
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Payload
            </div>
        </div>
        <div class="row">
            <object-formatter class="mb-1 ml-2 mr-2" :text.sync="http.response.payload" :format.sync="http.response.format"/>
        </div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import RoundedSwitch from "../../inputs/RoundedSwitch";
    import CommonSubscription from "../../inputs/CommonSubscription";
    import ObjectFormatter from "../../inputs/ObjectFormatter";
    const methodsList = ["POST", "GET", "PATCH", "OPTION", "DELETE", "PUT"];

    export default {
        name: 'HttpSubscription',
        components: {ObjectFormatter, CommonSubscription, RoundedSwitch, KeyValueInput},
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
                // console.log('HttpSub getContent' + JSON.stringify(this.item));
                return {
                    timeout: this.item.timeout,
                    port: this.item.port,
                    endpoint: this.item.endpoint,
                    avoid: this.item.avoid,
                    method: this.item.method || methodsList[0],
                    headers: this.item.headers || {},
                    response: this.item.response || {}
                }
            },
            emit() {
                const payload = this.http;
                this.$emit('input', {payload});
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
</style>
