<template>
    <div class="http-publisher container-fluid px-4">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Timeout
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-0 ml-2 mr-2">
                <input v-model="timeout" placeholder="3000" type="text" class="form-control"
                       style="background-color: transparent; color: white">
                <div class="input-group-append">
                    <span class="input-group-text">ms</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                URL
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <input v-model="url" placeholder="http://github.com/lopidio/stacker"
                       type="text" class="form-control" style="background-color: transparent; color: white">
                <div class="input-group-append" style="font-size: 0.8em">
                    <button class="btn dropdown-toggle"
                            style="background-color: transparent; color: white; border: 1px solid white" type="button"
                            data-toggle="dropdown">{{method}}
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="item in methods" :key="item"
                           @click="method = item">{{item}}</a>
                    </div>
                </div>
            </div>
        </div>
        <key-value-input v-model="headers" title="Headers"/>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Body
            </div>
        </div>
        <div v-if="method !== 'GET'" class="row">
            <object-formatter class="mb-1 ml-2 mr-2" v-model="payload"/>
        </div>
        <div v-else class="row" style="border-top: white 1px solid"></div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import ObjectFormatter from "../../inputs/ObjectFormatter";

    const methodsList = ["GET", "POST", "PATCH", "OPTION", "DELETE", "PUT"].sort();

    export default {
        name: 'HttpPublisher',
        components: {ObjectFormatter, KeyValueInput},
        props: {
            item: {},
        },
        data: function () {

            return {
                timeout: this.item.timeout,
                url: this.item.url,
                method: this.item.method || methodsList[0],
                headers: this.item.headers,
                payload: this.item.payload,
                methods: methodsList
            }
        },
        methods: {
            emit() {
                let payload = {
                    timeout: this.timeout,
                    url: this.url,
                    method: this.method,
                    headers: this.headers,
                    payload: this.payload,
                };
                this.$emit('input', {payload})
            }
        },
        watch: {
            item() {
                this.timeout = this.item.timeout;
                this.url = this.item.url;
                this.method = this.item.method || methodsList[0];
                this.headers = this.item.headers;
                this.payload = this.item.payload;
            },
            id() {
                this.timeout = this.item.timeout;
                this.url = this.item.url;
                this.method = this.item.method || methodsList[0];
                this.headers = this.item.headers;
                this.payload = this.item.payload;
            },
            timeout() {
                this.emit();
            },
            url() {
                this.emit();
            },
            method() {
                this.emit();
            },
            headers() {
                this.emit();
            },
            payload() {
                this.emit();
            },
        },
    }
</script>

<style scoped>
    .http-publisher {

    }

</style>
