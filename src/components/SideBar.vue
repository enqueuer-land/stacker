<template>
    <!--https://bootstrapious.com/p/bootstrap-sidebar-->
    <!-- Sidebar Holder -->
    <nav id="sidebar">
        <div class="sidebar-header">
            <h3>Stacker</h3>
        </div>

        <ul class="list-unstyled components">
            <li>
                <div class="form-inline">
                    <a>Requisitions</a>
                    <button type="button" class="btn btn-outline-primary input-group-append"
                            v-on:click="addRequisition">+
                    </button>
                </div>

            </li>

            <li v-for="(requisition, index) of requisitions">
                <div class="form-inline">
                    <a href="#requisition" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"
                       v-on:click="$emit('componentSelected', {type: 'requisition', value: requisition})">
                        {{requisition.name}}
                    </a>
                    <button type="button" class="btn btn-danger input-group-append"
                            v-on:click="removeRequisition(index)">-
                    </button>
                </div>

                <ul class="collapse list-unstyled" id="requisition">
                    <li class="mb-1">
                        <div class="form-inline">
                            <a class="btn-publisher">Publishers</a>
                            <button type="button" class="btn btn-outline-primary input-group-append"
                                    v-on:click="addPublisher(requisition)">+
                            </button>
                        </div>
                        <ul class="list-unstyled components">
                            <li v-for="publisher of requisition.publishers">
                                <h5 class="mb-0 form-inline">
                                    <button class="btn btn-publisher input-group" type="button"
                                            data-toggle="collapse" data-target="#publisherOneCollapse"
                                            v-on:click="$emit('componentSelected', {type: 'publisher', value: publisher})"
                                        >
                                        <i class="fa fa-chevron-right"></i>
                                        <span class="badge" :class="publisher.type">{{publisher.type}}</span>
                                        {{publisher.name}}
                                    </button>
                                    <button type="button" class="btn btn-danger input-group-append" v-on:click="removePublisher(requisition.publishers, index)">-</button>
                                </h5>
                            </li>
                        </ul>
                    </li>
                    <li class="mb-1">
                        <div class="form-inline">
                            <a class="btn-subscription">Subscriptions</a>
                            <button type="button" class="btn btn-outline-primary input-group-append">+</button>
                        </div>

                        <ul class="list-unstyled components">
                            <li v-for="subscription of requisition.subscriptions">
                                <h5 class="mb-0 form-inline">
                                    <button class="btn btn-subscription input-group" type="button"
                                            data-toggle="collapse" data-target="#subscriptionOneCollapse"
                                            v-on:click="$emit('componentSelected', {type: 'subscription', value: subscription})">
                                        <i class="fa fa-chevron-left"></i>
                                        <span class="badge"
                                              :class="subscription.type">{{subscription.type}}</span>
                                        {{subscription.name}}
                                    </button>
                                    <button type="button" class="btn btn-danger input-group-append">-</button>
                                </h5>
                            </li>
                        </ul>
                    </li>

                </ul>
            </li>
        </ul>
    </nav>

</template>

<script lang="ts">
    import * as Requisition from './requisition/Requisition';

    export default {
        name: 'SideBar',
        components: {
            Requisition
        },
        data() {
            return {
                requisitions: []
            };
        },
        mounted() {
            console.log(JSON.stringify(this.requisitions));
        },
        methods: {
            createRequisition: function() {
                return {
                    timeout: 1000,
                    iterations: 1,
                    initialDelay: 0,
                    onInit: null,
                    onFinish: null,
                    name: 'Requisition #' + this.requisitions.length,
                    subscriptions: [],
                    publishers: []
                };
            },
            createPublisher: function(requisition) {
                return {
                    type: 'http',
                    onInit: null,
                    onFinish: null,
                    name: 'Publisher #' + requisition.publishers.length,
                };
            },
            addRequisition: function () {
                this.requisitions.push(this.createRequisition());
            },
            addPublisher: function (requisition) {
                if (!requisition.publishers) {
                    requisition.publishers = [];
                }
                requisition.publishers.push(this.createPublisher(requisition));
                console.log(JSON.stringify(`Adding publisher: ${JSON.stringify(requisition)}`));
            },
            removeRequisition: function (index) {
                this.requisitions.splice(index, 1);
            },
            removePublisher: function (publishers, index) {
                publishers.splice(index, 1);
            },
        }
    };
</script>

<style lang="css">
    .btn-subscription {
        color: #ffffff;
        background-color: transparent;
        border-color: #3aae6f;
    }

    .btn-publisher {
        color: #ffffff;
        background-color: transparent;
        border-color: #ae3a6f;
    }

    .http {
        text-transform: uppercase;
        color: #ffffff;
        background-color: #271d94;
        padding-right: 0.6em;
        padding-left: 0.6em;
        border-radius: 10rem;
    }

    .amqp {
        text-transform: uppercase;
        color: #ffffff;
        background-color: #1d9427;
    }

    .mqtt {
        text-transform: uppercase;
        color: #ffffff;
        background-color: #943282;
    }

    /*
        DEMO STYLE
    */
    @import url('https://fonts.googleapis.com/css?family=Nova+Mono:300,400,500,600,700');

    body {
        font-family: 'Nova Mono', sans-serif;
        background: #fafafa;
    }

    p {
        font-family: 'Nova Mono', sans-serif;
        font-size: 1.1em;
        font-weight: 300;
        line-height: 1.7em;
        color: #999;
    }

    a, a:hover, a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }

    /* ---------------------------------------------------
        SIDEBAR STYLE
    ----------------------------------------------------- */

    .wrapper {
        display: flex;
        width: 100%;
        align-items: stretch;
        perspective: 1500px;
    }

    #sidebar {
        min-width: 250px;
        max-width: 250px;
        background: #19184f;
        color: #fff;
        transition: all 0.6s cubic-bezier(0.945, 0.020, 0.270, 0.665);
        transform-origin: bottom left;
    }

    #sidebar .sidebar-header {
        padding: 20px;
        background: #2d28ae;
    }

    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
    }

    #sidebar ul p {
        color: #fff;
        padding: 10px;
    }

    #sidebar ul li a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }

    #sidebar ul li a:hover {
        color: #ae0927;
        background: #fff;
    }

    #sidebar ul li.active > a, a[aria-expanded="true"] {
        color: #fff;
        background: #19184f;
    }

    ul ul a {
        font-size: 0.9em !important;
        padding-left: 30px !important;
        background: #d3d03f;
    }

    ul.CTAs a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
    }

</style>
