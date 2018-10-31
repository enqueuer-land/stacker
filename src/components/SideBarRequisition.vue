<template>
    <div class="side-bar-requisition">

        <div class="accordion">
            <div class="card">
                <a class="card-header" data-toggle="collapse" href="#" :data-target="'#' + requisition.id">
                    {{requisition.name}}
                </a>

                <div :id="requisition.id" class="collapse">
                    <div class="card-body">
                        <ul class="collapse list-unstyled" :id="requisition.id">
                            <SideBarRequisition v-for="inner in requisition.requisitions" :key="inner.id"
                                                :requisition="inner"/>
                            <li v-for="(leaf) in requisition.leaves" :key="leaf">{{leaf}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'SideBarRequisition',
        props: {
            requisition: {
                default: {}
            }
        }
    }
</script>

<style scoped>
    .side-bar-requisition {
        border: 2px black solid;
        border-left: 8px yellow solid;
    }
</style>
