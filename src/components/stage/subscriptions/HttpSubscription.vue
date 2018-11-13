<template>
    <div class="http-subscription container-fluid px-4">
        <div class="row">
            <common-subscription :timeout.sync="$store.state.selectedItem.timeout"
                                 :avoid.sync="$store.state.selectedItem.avoid"/>
        </div>
        <div class="row">
            <div class="col-2 pl-2 pr-1">
                <div class="row">
                    <div class="pt-2 pl-3" style="font-size: 0.8em; color: white">
                        Port
                    </div>
                </div>
                <div class="input-group input-group-sm mb-1">
                    <input v-model="$store.state.selectedItem.port" placeholder="8080" type="text" class="form-control"
                           style="background-color: transparent; color: white">
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
                        <input v-model="$store.state.selectedItem.endpoint" placeholder="/stacker" type="text"
                               class="form-control input-group-append"
                               style="background-color: transparent; color: white">
                        <div class="input-group-append" style="font-size: 0.8em">
                            <button class="btn dropdown-toggle"
                                    style="background-color: transparent; color: white; border: 1px solid white"
                                    type="button" data-toggle="dropdown">{{method}}
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" v-for="item in methods" :key="item"
                                   @click="selectMethod(item)">{{item}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <key-value-input v-model="$store.state.selectedItem.response.headers" title="Headers"/>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Status Code
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 pr-2">
                <input v-model="$store.state.selectedItem.response.status" type="text" class="form-control"
                       style="background-color: transparent; color: white"
                       placeholder="200">
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Payload
            </div>
        </div>
        <div class="row">
            <object-formatter class="mb-1 ml-2 mr-2" v-model="$store.state.selectedItem.response.payload"/>
        </div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    import RoundedSwitch from "../../inputs/RoundedSwitch";
    import CommonSubscription from "../../inputs/CommonSubscription";
    import ObjectFormatter from "../../inputs/ObjectFormatter";

    export default {
        name: 'HttpSubscription',
        components: {ObjectFormatter, CommonSubscription, RoundedSwitch, KeyValueInput},
        data: function () {
            const methods = ["GET", "POST", "PATCH", "OPTION", "DELETE", "PUT"].sort();
            if (!this.$store.state.selectedItem.response) {
                this.$store.state.selectedItem.response = {};
            }
            this.$store.state.selectedItem.method = methods[0];
            return {
                method: this.$store.state.selectedItem.method,
                methods: methods
            }
        },
        methods: {
            selectMethod(item) {
                this.method = item;
                this.$store.state.selectedItem.method = item;
            }
        }
    }
</script>

<style scoped>
    .http-subscription {

    }
</style>
