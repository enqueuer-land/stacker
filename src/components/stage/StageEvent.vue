<template>
    <div class="stage-event container-fluid px-4">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Script
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <prism-editor v-model="script" lineNumbers language="js"
                              style="background-color: transparent; color: white; font-size: 14px; font-weight: lighter; border: white 1px solid; border-radius: 4px;">
                </prism-editor>
            </div>
        </div>
        <div class="row pb-1">
            <assertions v-model="assertions"/>
        </div>
        <key-value-input v-model="store" title="Store"/>
    </div>
</template>

<script>
    import KeyValueInput from "../inputs/KeyValueInput";
    import Assertions from "../inputs/Assertions";
    import PrismEditor from 'vue-prism-editor'

    export default {
        name: 'StageEvent',
        components: {Assertions, KeyValueInput, PrismEditor},
        data: function () {
            let splitPath = this.$route.path.split("/");
            const name = splitPath[splitPath.length - 1];

            this.initializeComponent(name);
            return {
                name: name,
                script: this.$store.state.selectedItem[name].script = '',
                store: this.$store.state.selectedItem[name].store = {},
                assertions: this.$store.state.selectedItem[name].assertions || [],
            }
        },
        methods: {
            initializeComponent: function (name) {
                if (this.$store.state.selectedItem[name] === undefined) {
                    this.$store.state.selectedItem[name] = {
                        script: '',
                        assertions: [],
                        store: {}
                    };
                }
                this.script = this.$store.state.selectedItem[name].script;
                this.store = this.$store.state.selectedItem[name].store;
                this.assertions = this.$store.state.selectedItem[name].assertions;
            }
        },
        watch: {
            '$route': function () {
                let splitPath = this.$route.path.split("/");
                const name = splitPath[splitPath.length - 1];
                this.initializeComponent(name);
                this.name = name;
            },
            script() {
                this.$store.state.selectedItem[this.name].script = this.script;
            },
            assertions() {
                this.$store.state.selectedItem[this.name].assertions = this.assertions;
            },
            store() {
                this.$store.state.selectedItem[this.name].store = this.store;
            }
        }
    }
</script>

<style scoped>
    .stage-event {

    }

</style>
