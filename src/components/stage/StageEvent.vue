<template>
    <div class="stage-event container-fluid">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Script
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <textarea v-model="getSelectedItem().script" class="form-control p-1" rows="5"
                          placeholder="js code snippet"
                          style="background-color: transparent; color: var(--index-color)"></textarea>
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
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">to
                        be
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
        <key-value-input title="Store"/>
    </div>
</template>

<script>
    import KeyValueInput from "../inputs/KeyValueInput";

    export default {
        name: 'StageEvent',
        components: {KeyValueInput},
        beforeRouteUpdate (from, to, next) {
            // react to route changes...
            // don't forget to call next()
            let splitPath = to.split("/");
            const name = splitPath[splitPath.length - 1];
            console.log('Router entering: ' + name);
            next();
        },
        data: function () {
            return {
                name: {}
            }
        },
        methods: {
            getSelectedItem: function () {
                // return this.$store.state.sideBarSelectedItem[this.name];
                return {};
            },
        }
    }
</script>

<style scoped>
    .stage-event {

    }

</style>
