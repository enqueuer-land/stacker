<template id="protocol-selector">
    <b-dropdown no-caret lazy variant="carabina" class="carabina-text protocol-selector">
        <template v-slot:button-content>
            <div class="protocol-selector-name">{{selectedProtocol}}
                <i class="pl-2 fas fa-caret-down"></i>
            </div>
        </template>
        <b-dropdown-item v-for="(protocol, index) in protocolsList" :key="index"
                         @click="onSelect(protocol.value)">{{protocol.value}}
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
            protocolsList: Array
        },
        data() {
            return {
                selectedProtocol: this.protocolsList[0].value,
            }
        },
        methods: {
            onSelect: function (value) {
                this.$emit('select', value);
            }
        }
    });
</script>
<style type="text/css" scoped>
    #protocol-selector {
    }

    .protocol-selector {
        border: none !important;
        border-bottom: 1px solid var(--carabina-publisher-color) !important;
    }

    .protocol-selector:hover {
        color: #bada3e;
    }

    .dropdown-toggle {
        box-shadow: none !important;
        outline: none !important;
    }

    .protocol-selector-name {
        color: var(--carabina-publisher-color);
        text-align: left;
        transition: all ease 100ms;
    }

    .protocol-selector-name:hover {
        filter: brightness(1.1);
        transform: scale(1.005);
    }
</style>
