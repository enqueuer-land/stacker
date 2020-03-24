<template>
    <div class="side-bar-tree-item" :style="componentStyle" @click="selectComponentById(component.id)">
        <b-container fluid class="pl-2 pr-0 carabina-text">
            <b-row no-gutters class="m-0 p-0 pl-1 tree-item">
                <b-col cols="auto" class="align-self-center" style="width: 80px">
                    <span v-if="!componentStylish.isRequisition()" class="item-name-tag"
                          :style="typeTagStyle">{{componentStylish.getType()}}</span>
                </b-col>
                <b-col cols class="align-self-center item-name mr-1" :style="componentNameStyle">
                    {{component.name}}
                </b-col>
                <b-col cols="auto" class="align-self-center">
                    <template v-if="componentStylish.isRequisition()">
                        <small v-if="componentStylish.getChildrenLength() > 0" class="item-name-tag items-num">
                            {{componentStylish.getChildrenLength()}}
                            {{componentStylish.getChildrenLength() > 1? 'items': 'item'}}
                        </small>
                    </template>
                    <small v-else class="item-name-tag items-num">
                        {{component.carabinaMeta.type.toLowerCase().substr(0, 3)}}
                    </small>
                </b-col>
                <b-col cols="auto" class="align-self-center">
                    <SideBarTreeItemOptions :component="component">
                    </SideBarTreeItemOptions>
                </b-col>
                <b-col cols="auto" class="align-self-center mr-2 mb-1">
                    <i class="fas fa-circle"
                       :style="changeAfterSavingStyle"></i>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/icons.css';
    import '@/styles/scrollbar.css';
    import '@/styles/dimensions.css';
    import '@/styles/component-tree.css';
    import {mapMutations, mapGetters} from 'vuex';
    import {ComponentStylish} from "@/components/component-stylish";
    import SideBarTreeItemOptions from "@/views/side-bar/side-bar-tree-item-options";

    export default Vue.extend({
        name: 'SideBarTreeItem',
        components: {
            SideBarTreeItemOptions
        },
        props: {
            component: Object
        },
        data: function () {
            return {
                componentStylish: new ComponentStylish(this.component)
            }
        },
        watch: {
            'component.type': function () {
                this.componentStylish = new ComponentStylish(this.component);
            },
        },
        computed: {
            ...mapGetters('side-bar', []),
            typeTagStyle: function () {
                return this.componentStylish.typeTagStyle();
            },
            componentStyle: function () {
                return this.componentStylish.componentStyle();
            },
            componentNameStyle: function () {
                return this.componentStylish.componentNameStyle();
            },
            changeAfterSavingStyle: function () {
                return this.componentStylish.changeAfterSavingStyle();
            }
        },
        methods: {
            ...mapMutations('side-bar', ['selectComponentById']),
        }

    });
</script>
<style type="text/css" scoped>
    .side-bar-tree-item {
        height: 100%;
        transition: all ease 200ms;
    }

    .side-bar-tree-item:hover .item-name {
        color: var(--carabina-text-color);
    }

    .item-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .bottom-line {
        border-bottom: 1px solid var(--carabina-header-background-color);
    }

    .items-num {
        user-select: none;
        font-size: 12px;
        filter: brightness(0.65);
    }
</style>
