<template>
    <div id="side-bar-tree-item" :style="componentStyle">
        <b-container fluid class="px-1 carabina-text" style="height: 100%" @click="componentSelected(component)">
            <b-row style="width: 100%; height: 100%" no-gutters class="m-0 p-0 pl-1 tree-item">
                <b-col cols="auto" class="align-self-center" style="width: 80px">
                    <span v-if="componentStylish.shouldPrintType()" class="item-name-tag"
                          :style="componentNameTagStyle">{{componentStylish.getType()}}</span>
                    <div v-else-if="componentStylish.getChildrenLength() > 0">
                        <i :class="['fas fa-caret-down requisition-type', collapsed && 'collapsed']"></i>
                    </div>
                </b-col>
                <b-col cols class="align-self-center item-name" :style="componentNameStyle">
                    {{component.name}}
                </b-col>
                <b-col cols="auto" class="align-self-center">
                    <i class="fas fa-ellipsis-v px-2 pt-1 carabina-icon option-icon" style="font-size: 14px"></i>
                </b-col>
            </b-row>
            <div class="bottom-line"></div>
        </b-container>
    </div>
</template>
<script>
    import '@/styles/component-tree.css';
    import '@/styles/icons.css';
    import Vue from 'vue';
    import {mapMutations, mapGetters} from 'vuex';
    import {ComponentStylish} from "@/components/component-stylish";

    export default Vue.extend({
        name: 'SideBarTreeItem',
        props: {
            component: Object,
            collapsed: Boolean
        },
        data: function () {
            return {
                selected: this.component.carabinaMeta.selected,
                componentStylish: new ComponentStylish(this.component)
            }
        },
        mounted() {
            this.$store.subscribe((mutation) => {
                if (mutation.type === 'side-bar/componentSelected') {
                    this.selected = mutation.payload.id === this.component.id;
                }
                if (mutation.type === 'side-bar/createNewComponent') {
                    this.selected = mutation.payload.id === this.component.id;
                }
            });
        },
        computed: {
            ...mapGetters('side-bar', []),
            componentNameTag: function () {
                return this.componentStylish.getComponentTag();
            },
            componentNameTagStyle: function () {
                return this.componentStylish.componentNameTagStyle();
            },
            componentStyle: function () {
                return this.componentStylish.componentStyle(this.selected);
            },
            componentNameStyle: function () {
                return this.componentStylish.componentNameStyle(this.selected);
            }
        },
        methods: {
            ...mapMutations('side-bar', ['componentSelected']),
        }

    });
</script>
<style type="text/css" scoped>
    #side-bar-tree-item {
        height: 100%;
        transition: all ease 200ms;
    }

    .requisition-type {
        font-size: 20px;
        text-align: center;
        color: var(--carabina-requisition-color);
        transition: all ease 250ms;
    }

    .collapsed {
        transform: rotate(-90deg);
    }

    #side-bar-tree-item:hover .requisition-type {
        transform: rotate(-40deg);
    }

    #side-bar-tree-item:hover .option-icon {
        color: var(--carabina-text-darker-color);
    }

    #side-bar-tree-item:hover .item-name {
        color: var(--carabina-text-color);
    }

    .option-icon {
        color: transparent;
        transition: all 200ms ease;
    }

    .item-name {
        overflow-y: scroll;
        overflow-x: auto;
        white-space: nowrap;
    }

    .bottom-line {
        border-bottom: 1px solid var(--carabina-header-background-color);
    }

</style>
