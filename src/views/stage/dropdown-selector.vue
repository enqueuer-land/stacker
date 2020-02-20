<template id="dropdown-selector">
    <b-dropdown no-caret lazy variant="carabina" class="carabina-text" :style="containerStyle">
        <template v-slot:button-content>
            <div :style="selectorName">{{selected.value}}
                <i class="pl-2 fas fa-caret-down"></i>
            </div>
        </template>
        <b-dropdown-item v-for="(item, index) in availableList" :key="index"
                         @click="onSelect(item)">{{item.value}}
        </b-dropdown-item>
    </b-dropdown>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import '@/styles/dropdown.css';

    export default Vue.extend({
        name: 'DropdownSelector',
        props: {
            defaultSelection: Object,
            availableList: Array,
            color: String
        },
        data() {
            return {
                selected: this.defaultSelection || this.availableList[0],
            }
        },
        methods: {
            onSelect: function (protocol) {
                this.selected = protocol;
                this.$emit('select', protocol);
            }
        },
        computed: {
            containerStyle: function () {
                return {
                    border: 'none !important',
                    'border-bottom': `1px solid ${this.color} !important`
                }
            },
            selectorName: function () {
                return {
                    'text-align': 'left',
                    'transition': 'all ease 100ms',
                    'color': this.color
                }
            }
        }
    });
</script>
<style type="text/css" scoped>
    #dropdown-selector {
    }

    .dropdown-toggle {
        box-shadow: none !important;
        outline: none !important;
    }

    .protocol-selector-name:hover {
        filter: brightness(1.1);
        transform: scale(1.005);
    }
</style>
