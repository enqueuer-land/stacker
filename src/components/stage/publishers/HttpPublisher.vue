<template>
    <div class="http-publisher container-fluid px-4">
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Timeout
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2">
                <input v-model="http.timeout" placeholder="3000" type="text" class="form-control stacker-input">
                <div class="input-group-append">
                    <span class="input-group-text">ms</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                URL
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <input v-model="http.url" placeholder="http://github.com/lopidio/stacker" id="httpPublisherUrlId"
                       type="text" class="form-control stacker-input">
                <div class="input-group-append" style="font-size: 0.8em">
                    <button class="btn dropdown-toggle"
                            style="background-color: transparent; color: var(--text-color); border: 1px solid var(--text-color)" type="button"
                            data-toggle="dropdown">{{http.method}}
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="item in methods" :key="item"
                           @click="http.method = item">{{item}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col px-2">
                <key-value-input v-model="http.headers" title="Headers"/>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2 stacker-label">
                Body
            </div>
        </div>
        <div v-if="http.method !== 'GET'" class="row">
            <object-formatter class="mb-1 ml-2 mr-2" :text.sync="http.payload" :format.sync="http.format"/>
        </div>
        <div v-else class="row" style="border-top: var(--text-color) 1px solid"></div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import ObjectFormatter from "../../inputs/ObjectFormatter";

    const methodsList = ["POST", "GET", "PATCH", "OPTION", "DELETE", "PUT"];

    export default {
        name: 'HttpPublisher',
        components: {ObjectFormatter, KeyValueInput},
        props: {
            item: {},
        },
        mounted() {
            this.emit();
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
                    type: "http",
                    timeout: this.item.timeout,
                    url: this.item.url,
                    method: this.item.method || methodsList[0],
                    headers: this.item.headers || {},
                    payload: this.item.payload,
                    format: this.item.format,
                }
            },
            emit() {
                const toEmit = Object.assign({}, this.http);
                if (this.http.method === 'GET') {
                    toEmit.payload = null;
                }
                const valid = (this.http.url !== undefined && this.http.url.length > 0);
                if (!valid) {
                    toEmit.errors = ['Url cannot be empty']
                }
                const item = $('#httpPublisherUrlId');
                if (!valid) {
                    item.addClass('invalid-input');
                } else {
                    item.removeClass('invalid-input');
                }
                this.$emit('input', toEmit);
            },
        },
        computed: {},
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
    .http-publisher {

    }

</style>
