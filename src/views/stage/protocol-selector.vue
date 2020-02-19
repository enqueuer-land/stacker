<template id="protocol-selector">
    <b-dropdown no-caret lazy variant="carabina" class="carabina-text" :style="protocolContainerStyle">
        <template v-slot:button-content>
            <div :style="protocolSelectorName">{{selectedProtocol.value}}
                <i class="pl-2 fas fa-caret-down"></i>
            </div>
        </template>
        <b-dropdown-item v-for="(protocol, index) in protocolsList" :key="index"
                         @click="onSelect(protocol)">{{protocol.value}}
        </b-dropdown-item>
    </b-dropdown>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/texts.css';
    import '@/styles/dropdown.css';

    export default Vue.extend({
        name: 'ProtocolSelector',
        props: {
            protocolsList: Array,
            color: String
        },
        data() {
            return {
                selectedProtocol: this.protocolsList[0],
            }
        },
        methods: {
            onSelect: function (protocol) {
                this.selectedProtocol = protocol;
                this.$emit('select', protocol);
            }
        },
        computed: {
            protocolContainerStyle: function () {
                return {
                    border: 'none !important',
                    'border-bottom': `1px solid ${this.color} !important`
                }
            },
            protocolSelectorName: function () {
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
    #protocol-selector {
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
