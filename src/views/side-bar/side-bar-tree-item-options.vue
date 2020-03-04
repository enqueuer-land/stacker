<template>
    <b-dropdown no-caret lazy variant="carabina" class="carabina-text">
        <template v-slot:button-content>
            <i class="fas fa-ellipsis-v px-0 carabina-icon option-icon"
               style="font-size: 14px"></i>
        </template>
        <b-dropdown-item v-for="(item, index) in actions" :key="index">
            <b-row class="pl-2" @click="item.action()">
                <b-col cols="auto" class="align-self-center px-1">
                    <i :class="['carabina-icon option-item-class', item.iconClass]" style="font-size: 14px"></i>
                </b-col>
                <b-col cols class="align-self-center">
                    {{item.name}}
                </b-col>
            </b-row>
        </b-dropdown-item>
    </b-dropdown>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/icons.css';

    export default Vue.extend({
        name: 'SideBarTreeItemOptions',
        props: {
            component: Object
        },
        data: function () {
            return {
                actions: [
                    {
                        name: 'Save',
                        iconClass: 'fas fa-save',
                        action: () => console.log('save hit')
                    },
                    {
                        name: 'Ignore',
                        iconClass: 'fas fa-ban',
                        action: () => console.log('ignore')
                    },
                    {
                        name: 'Delete',
                        iconClass: 'fas fa-trash',
                        action: () => console.log('deleted')
                    },
                ]
            }
        },
        computed: {},
        methods: {}

    });
</script>
<style type="text/css" scoped>
    #side-bar-tree-item-options {
    }

    #side-bar-tree-item:hover .option-icon {
        color: var(--carabina-text-darker-color);
    }

    .dropdown-item:hover .option-item-class {
        transform: scale(1.25);
        filter: brightness(1.25);
        color: var(--carabina-theme-color);
    }

    .dropdown-item:active .option-item-class {
        transform: scale(1.5);
        filter: brightness(1.5);
        color: var(--carabina-theme-color);
    }

    .option-icon {
        color: transparent;
        transition: all 200ms ease;
    }

    .option-item-class {
        color: var(--carabina-text-darker-color);
    }
</style>
