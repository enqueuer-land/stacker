<template>
    <div class="http-publisher container-fluid px-4">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                URL
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <input v-model="$store.state.selectedItem.url" placeholder="http://github.com/lopidio/stacker" type="text" class="form-control" style="background-color: transparent; color: white">
                <div class="input-group-append"  style="font-size: 0.8em">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">{{$store.state.selectedItem.method}}</button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="item in methods" :key="item" @click="$store.state.selectedItem.method = item">{{item}}</a>
                    </div>
                </div>
            </div>
        </div>
        <key-value-input v-model="$store.state.selectedItem.headers" title="Headers"/>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Body
            </div>
        </div>
        <div v-if="$store.state.selectedItem.method !== 'GET'" class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <textarea v-model="$store.state.selectedItem.payload" class="form-control p-1" rows="10"
                          style="background-color: transparent; color: white; font-size: 14px; font-weight: lighter"></textarea>
            </div>
        </div>
    </div>
</template>
<script>

    import KeyValueInput from "../../inputs/KeyValueInput";
    export default {
        name: 'HttpPublisher',
        components: {KeyValueInput},
        data: function () {
            let methods = ["GET", "POST", "PATCH"].sort();
            this.$store.state.selectedItem.method = methods[0];
            return {
                methods: methods
            }
        },
        watch: {
            // '$route' () {
            // }
        }
    }
</script>

<style scoped>
    .http-publisher {

    }

</style>
