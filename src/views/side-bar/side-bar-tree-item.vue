<template>
    <div id="side-bar-tree-item" :style="componentStyle">
        <b-container fluid class="pl-2 pr-1 carabina-text" style="height: 100%" @click="componentSelected(component)">
            <b-row style="width: 100%; height: 100%" no-gutters class="m-0 p-0 pl-1 tree-item">
                <b-col cols="auto" class="align-self-center" style="width: 80px">
                    <span v-if="!componentStylish.isRequisition()" class="item-name-tag"
                          :style="componentNameTagStyle">{{componentStylish.getType()}}</span>
                </b-col>
                <b-col cols class="align-self-center item-name mr-1" :style="componentNameStyle">
                    {{component.name}}
                </b-col>
                <b-col cols="auto" class="align-self-center"
                       v-if="componentStylish.isRequisition() && componentStylish.getChildrenLength() > 0">
                    <small class="item-name-tag" style="user-select: none; font-size: 12px; filter: brightness(0.65)">
                        {{componentStylish.getChildrenLength()}} {{componentStylish.getChildrenLength() > 1? 'items': 'item'}}
                    </small>
                </b-col>
                <b-col cols="auto" class="align-self-center">
                    <SideBarTreeItemOptions :component="component">
                    </SideBarTreeItemOptions>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import Vue from 'vue';
    import '@/styles/icons.css';
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

    #side-bar-tree-item:hover .item-name {
        color: var(--carabina-text-color);
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
