<template>
    <div class="stage-event container-fluid px-4">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Script
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <textarea v-model="component.script" class="form-control p-1" rows="5"
                          placeholder="js code snippet"
                          style="background-color: transparent; color: white; font-size: 14px; font-weight: lighter"></textarea>
            </div>
        </div>
        <div class="row pb-1">
            <assertions v-model="getComponent().assertions"/>
        </div>
        <key-value-input v-model="component.store" title="Store"/>
    </div>
</template>

<script>
    import KeyValueInput from "../inputs/KeyValueInput";
    import Assertions from "../inputs/Assertions";

    export default {
        name: 'StageEvent',
        components: {Assertions, KeyValueInput},
        data: function () {
            let splitPath = this.$route.path.split("/");
            const name = splitPath[splitPath.length - 1];

            if (this.$store.state.selectedItem[name] === undefined) {
                this.$store.state.selectedItem[name] = {};
            }
            const component =  this.$store.state.selectedItem[name];
            console.log('data: ' + name + ' -> ' + JSON.stringify(component));
            return {
                name: name,
                component: component,
            }
        },
        methods: {
            getComponent: function() {
                return this.$store.state.selectedItem[this.name];
            }
        },
        // beforeRouteEnter: function(from, to, next) {
            // console.log('beforeRouteEnter: ' + from.path);
            // let splitPath = from.path.split("/");
            // name = splitPath[splitPath.length - 1];
            // if (this.$store.state.selectedItem[name] === undefined) {
            //     this.$store.state.selectedItem[name] = {};
            // }
            // this.component = this.$store.state.selectedItem[name];
            // console.log('before: ' + name + ' -> ' + JSON.stringify(this.component));
            // next();

        // },
        watch: {
            '$route'() {
                let splitPath = this.$route.path.split("/");
                const name = splitPath[splitPath.length - 1];
                if (this.$store.state.selectedItem[name] === undefined) {
                    this.$store.state.selectedItem[name] = {};
                }
                this.name = name;
                this.component = this.$store.state.selectedItem[name];
                console.log('route: ' + name + ' -> ' + JSON.stringify(this.component));
            }
        }
    }
</script>

<style scoped>
    .stage-event {

    }

</style>
