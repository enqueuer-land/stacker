<template>
    <div class="http-publisher container-fluid px-4">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                URL
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <input v-model="component.url" placeholder="http://github.com/lopidio/stacker" type="text" class="form-control" style="background-color: transparent; color: white">
                <div class="input-group-append"  style="font-size: 0.8em">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">{{method}}</button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="item in methods" :key="item" @click="component.method = method = item">{{item}}</a>
                    </div>
                </div>
            </div>
        </div>
        <key-value-input v-model="component.headers" title="Headers"/>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Body
            </div>
        </div>
        <div v-if="method !== 'GET'" class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <textarea v-model="component.payload" class="form-control p-1" rows="10" style="background-color: transparent; color: white; font-size: 14px; font-weight: lighter"></textarea>
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
            return {
                component: {},
                method: {},
                methods: ["GET", "POST", "PATCH"].sort()
            }
        },
        methods: {
        },
        computed: {
        },
        watch: {
            '$route' () {
                console.log('Changing http publisher');
                this.method = this.methods[0];
                this.component = this.$store.state.selectedItem;
            }
        }
    }
</script>

<style scoped>
    .http-publisher {

    }

</style>
