<template>
    <b-dropdown no-caret lazy dropright variant="carabina" class="carabina-text">
        <template v-slot:button-content>
            <i class="fas fa-ellipsis-v px-0 carabina-icon option-icon"
               style="font-size: 14px"></i>
        </template>
        <div v-for="(item, index) in actions" :key="index">
            <b-dropdown-divider v-if="item.divider"></b-dropdown-divider>
            <b-dropdown-item v-else>
                <b-row class="pl-2" @click="item.action">
                    <b-col cols="auto" class="align-self-center px-1">
                        <i :class="['carabina-icon option-item-class', item.iconClass(component)]"
                           style="font-size: 14px"></i>
                    </b-col>
                    <b-col cols class="align-self-center">
                        {{item.name(component)}}
                    </b-col>
                </b-row>
            </b-dropdown-item>
        </div>
    </b-dropdown>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/icons.css';
    import {mapMutations} from 'vuex';
    import {ComponentTypes} from '@/components/component-types';

    export default Vue.extend({
        name: 'SideBarTreeItemOptions',
        props: {
            component: Object
        },
        data: function () {
            let actions = [
                {
                    name: () => 'Save',
                    iconClass: () => 'fas fa-save',
                    action: () => {
                        this.saveComponent({
                            component: this.component
                        });
                    }
                },
            ];
            if (this.component.carabinaMeta.type === ComponentTypes.REQUISITION) {
                actions = actions.concat(
                    {
                        divider: true
                    },
                    {
                        name: () => 'Insert new requisition',
                        iconClass: () => 'fas fa-plus',
                        action: () => {
                            this.createNewComponent({
                                componentType: ComponentTypes.REQUISITION,
                                parent: this.component,
                                startSelected: true
                            });
                        }
                    },
                    {
                        name: () => 'Insert new publisher',
                        iconClass: () => 'fas fa-plus',
                        action: () => {
                            this.createNewComponent({
                                componentType: ComponentTypes.PUBLISHER,
                                parent: this.component,
                                startSelected: true
                            });
                        }
                    },
                    {
                        name: () => 'Insert new subscription',
                        iconClass: () => 'fas fa-plus',
                        action: () => {
                            this.createNewComponent({
                                componentType: ComponentTypes.SUBSCRIPTION,
                                parent: this.component,
                                startSelected: true
                            });
                        }
                    })
            }
            actions = actions.concat([
                {
                    divider: true
                },
                {
                    name: () => 'Duplicate',
                    iconClass: () => 'fas fa-clone',
                    action: () => {
                        this.duplicateComponent({
                            component: this.component
                        });
                    }
                },
                {
                    name: (component) => component.ignore ? 'Enable' : 'Disable',
                    iconClass: (component) => component.ignore ? 'fas fa-check' : 'fas fa-ban',
                    action: () => {
                        this.changeAttributeOfComponent({
                            component: this.component,
                            attributeName: 'ignore',
                            value: !this.component.ignore
                        });
                    }
                },
                {
                    divider: true
                },
                {
                    name: () => 'Delete',
                    iconClass: () => 'fas fa-trash',
                    action: () => {
                        this.deleteComponentById({
                            component: this.component
                        });
                    }
                }
            ]);
            return {
                actions: actions
            }
        },
        methods: {
            ...mapMutations('side-bar', ['changeAttributeOfComponent', 'deleteComponentById',
                'saveComponent', 'duplicateComponent', 'createNewComponent']),
        }

    });
</script>
<style type="text/css" scoped>
    .side-bar-tree-item:hover .option-icon {
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
