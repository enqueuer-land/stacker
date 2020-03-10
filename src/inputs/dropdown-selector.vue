<template id="dropdown-selector">
    <b-dropdown no-caret lazy variant="carabina" class="carabina-text" :style="containerStyle" right>
        <template v-slot:button-content :style="selectorName">
            {{selected.value}}
            <i class="pl-2 pt-1 fas fa-caret-down float-right" style="font-size: 12px"></i>
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
            color: {
                type: String,
                default: 'var(--carabina-text-darker-color)'
            }
        },
        data() {
            return {
                selected: this.content()
            }
        },
        watch: {
            defaultSelection: function () {
                this.selected = this.content();
            },
            availableList: function () {
                this.selected = this.content();
            }
        },
        methods: {
            content: function () {
                return this.defaultSelection || (this.availableList && this.availableList.length > 0 ? this.availableList[0] : {value: ''});
            },
            onSelect: function (protocol) {
                this.selected = protocol;
                this.$emit('select', protocol);
            }
        },
        computed: {
            containerStyle: function () {
                return {
                    color: this.color + ' !important',
                    height: '35px',
                    border: 'none !important',
                    'border-bottom': `1px solid ${this.color} !important`
                }
            },
            selectorName: function () {
                return {
                    'font-size': '14px',
                    'text-align': 'left',
                    'transition': 'all ease 100ms',
                    color: this.color + ' !important',
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
