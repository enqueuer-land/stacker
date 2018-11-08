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
                          style="background-color: transparent; color: white"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Assertions
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <div class="input-group-append" style="font-size: 0.8em">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                        Expect
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Expect to be defined</a>
                        <a class="dropdown-item" href="#">Expect to be truthy</a>
                    </div>
                </div>
                <input type="text" class="form-control" style="background-color: transparent; color: white">
                <div class="input-group-append" style="font-size: 0.8em">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                        to be
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">to contain</a>
                        <a class="dropdown-item" href="#">to be less than</a>
                    </div>
                </div>
                <input type="text" class="form-control input-group-append"
                       style="background-color: transparent; color: white">
            </div>
        </div>
        <key-value-input v-model="component.store" title="Store"/>
    </div>
</template>

<script>
    import KeyValueInput from "../inputs/KeyValueInput";

    export default {
        name: 'StageEvent',
        components: {KeyValueInput},
        data: function () {
            return {
                component: {},
            }
        },
        watch: {
            '$route' () {
                let splitPath = this.$route.path.split("/");
                const name = splitPath[splitPath.length - 1];
                if (this.$store.state.sideBarSelectedItem[name] === undefined) {
                    this.$store.state.sideBarSelectedItem[name] = {};
                }
                this.component = this.$store.state.sideBarSelectedItem[name];
            }
        }
    }
</script>

<style scoped>
    .stage-event {

    }

</style>
