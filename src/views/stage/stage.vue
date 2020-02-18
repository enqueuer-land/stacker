<template>
    <div id="stage" style="height: 100%">
        <StageHeaderRequisition v-if="component.carabinaMeta.componentName==='REQUISITION'"
                                :component="component"
                                style="height: var(--carabina-header-size)"></StageHeaderRequisition>
        <StageBodyRequisition style="height: var(--carabina-body-size)"></StageBodyRequisition>
        <StageFooter style="height: var(--carabina-footer-size)"></StageFooter>
    </div>
</template>

<script>
    import Vue from 'vue';
    import StageFooter from '@/views/stage/stage-footer'
    import {ComponentTypes} from "@//components/component-types";
    import StageBodyRequisition from '@/views/stage/stage-body-requisition'
    import StageHeaderRequisition from '@/views/stage/stage-header-requisition'

    export default Vue.extend({
        name: 'Stage',
        components: {StageHeaderRequisition, StageBodyRequisition, StageFooter},
        data: function () {
            return {
                component: {
                    id: 'ID31231234234',
                    name: 'New Requisition',
                    requisitions: [],
                    publishers: [],
                    subscriptions: [],
                    carabinaMeta: {
                        parent: {
                            name: 'New parent Requisition 1',
                            carabinaMeta: {
                                parent: {
                                    name: 'New grandpa Requisition 2',
                                    carabinaMeta: {
                                        parent: {
                                            name: 'New grandpa Requisition 3',
                                            carabinaMeta: {
                                                parent: {
                                                    name: 'New grandpa Requisition 4',
                                                },
                                            }

                                        },
                                    }

                                },
                            }
                        },
                        selected: true,
                        collapsed: false,
                        componentName: ComponentTypes.REQUISITION
                    }
                }
            }
        },
        methods: {
            updateAttribute(attributeName, value) {
                console.log(attributeName, value);
            }
        }
    });
</script>

<style scoped>
</style>
