<template>
    <div class="http-publisher container-fluid px-4">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                URL
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <input v-model="getCurrentSelected().url" placeholder="http://github.com/lopidio/slacker" type="text" class="form-control" style="background-color: transparent; color: white">
                <div class="input-group-append"  style="font-size: 0.8em">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">{{method}}</button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="item in methods" :key="item" @click="getCurrentSelected().method = method = item">{{item}}</a>
                    </div>
                </div>
            </div>
        </div>
        <key-value-input v-model="getCurrentSelected().headers" title="Headers"/>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Body
            </div>
        </div>
        <div v-if="method !== 'GET'" class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <textarea v-model="getCurrentSelected().payload" class="form-control p-1" rows="10" style="background-color: transparent; color: white"></textarea>
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
            return {
                component: this.$store.state.sideBarSelectedItem,
                method: methods[0],
                methods: methods
            }
        },
        methods: {
            getCurrentSelected: function() {
                return this.$store.state.sideBarSelectedItem;
            }
        },
        computed: {
        }
    }
</script>

<style scoped>
    .http-publisher {

    }

</style>
