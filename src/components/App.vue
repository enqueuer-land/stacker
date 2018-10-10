<template>
    <div id="main" class="container-fluid">
        <!--https://bootstrapious.com/p/bootstrap-sidebar-->
        <div class="wrapper">
            <!-- Sidebar Holder -->
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h3>Stacker</h3>
                </div>

                <ul class="list-unstyled components">
                    <!--<p>Requisitions</p>-->
                    <li v-for="requisition of requisitions" >
                        <a href="#requisition" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">{{requisition.name}}</a>
                        <ul class="collapse list-unstyled" id="requisition">
                            <li v-for="publisher of requisition.publishers" >
                                <h5 class="mb-1">
                                    <button class="btn btn-publisher " type="button" data-toggle="collapse" data-target="#publisherOneCollapse">
                                        <i class="fa fa-chevron-right" ></i>
                                        <span class="badge" :class="publisher.type">{{publisher.type}}</span>
                                        {{publisher.name}}
                                    </button>
                                </h5>
                            </li>
                            <!--<li class="line"></li>-->
                            <li v-for="subscription of requisition.subscriptions" >
                                <h5 class="mb-1">
                                    <button class="btn btn-subscription" type="button" data-toggle="collapse" data-target="#subscriptionOneCollapse">
                                        <i class="fa fa-chevron-left" ></i>
                                        <span class="badge" :class="subscription.type">{{subscription.type}}</span>
                                        {{subscription.name}}
                                    </button>
                                </h5>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <!-- Page Content Holder -->
            <div id="content" class="container-fluid">
                <div class="row">
                    <div class="col-6">
                        <Requisition v-model="requisitions[0]" v-on:sendClick="sendClick"></Requisition>
                    </div>
                    <div class="col-6">
                        <p class="h3 lead">{{this.enqueuerResponse ? this.enqueuerResponse.name: ''}}</p>
                        <p class="h5"
                           :class="enqueuerResponse ? (enqueuerResponse.length === 0? 'text-success' : 'text-danger'): ''">
                            {{this.enqueuerResponse ? this.resultMessage: ''}}</p>
                        <pre><code>{{this.enqueuerResponse}}</code></pre>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {EnqueuerClient} from '../enqueuer/enqueuer-client';
    import * as Requisition from './requisition/Requisition';
    import {RequisitionModel} from "../enqueuer/models/outputs/requisition-model";
    import {TestsAnalyzer} from "../enqueuer/tests-analyzer";

    export default {
        name: 'App',
        components: {
            Requisition
        },
        data() {
            return {
                // requisitions: [
                //     {
                //         name: 'Requisition name',
                //         publishers: [{
                //                 type: 'amqp',
                //                 name: 'random name'
                //             },
                //             {
                //                 type: 'http',
                //                 name: 'other random name'
                //             }
                //         ],
                //         subscriptions: [
                //             {
                //                 type: 'http',
                //                 name: 'random 123 name'
                //             },
                //             {
                //                 type: 'amqp',
                //                 name: '123 random name'
                //             },
                //             {
                //                 type: 'mqtt',
                //                 name: 'mqtt 123 random name'
                //             }
                //         ]
                //     }
                // ],
                requisitions: [],
                enqueuerResponse: '',
                resultMessage: null
            };
        },
        methods: {
            sendClick: function (requisition) {
                console.log(`Requisition: ${JSON.stringify(requisition)}`);

                const enqueuer: EnqueuerClient = new EnqueuerClient(requisition);
                enqueuer.on('response', (response: RequisitionModel) => {
                    //Removes the stacker requisition layer 'http daemon input' stuff
                    const enqueuerResponse = response.requisitions[0];

                    const testsCounter = new TestsAnalyzer(enqueuerResponse);
                    const testsNumber = testsCounter.getTestsNumber();
                    let passingTestsNumber = testsCounter.getPassingTests().length;
                    let percentage = testsCounter.getPercentage();
                    this.resultMessage = `${enqueuerResponse.name}: ${passingTestsNumber}/${testsNumber} - (${percentage}%) - ${enqueuerResponse.time.totalTime}ms`;

                    this.enqueuerResponse = testsCounter.getFailingTests().map(test => test.description).join('\n') || [];
                });
                enqueuer.on('exit', (response: number) => console.log(`exit: ${response}`));
                enqueuer.on('error', (response: Error) => console.error(`error: ${response}`));
//                enqueuer.on('log', (response: Error) => console.log(`log: ${response}`));
                enqueuer.send().then((success) => {
                    console.log(`Sending result: ${success}`);
                });
            }
        }
    };
</script>

<style lang="css">
    .btn-subscription {
        color: #ffffff;
        background-color: #3aae6f;
    }
    .btn-publisher {
        color: #ffffff;
        background-color: #ae3a6f;
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


    .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
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

    /* ---------------------------------------------------
        MEDIAQUERIES
    ----------------------------------------------------- */
    @media (max-width: 768px) {
        #sidebar {
            margin-left: -250px;
            transform: rotateY(90deg);
        }
        #sidebar.active {
            margin-left: 0;
            transform: none;
        }
        #sidebarCollapse span:first-of-type,
        #sidebarCollapse span:nth-of-type(2),
        #sidebarCollapse span:last-of-type {
            transform: none;
            opacity: 1;
            margin: 5px auto;
        }
        #sidebarCollapse.active span {
            margin: 0 auto;
        }
        #sidebarCollapse.active span:first-of-type {
            transform: rotate(45deg) translate(2px, 2px);
        }
        #sidebarCollapse.active span:nth-of-type(2) {
            opacity: 0;
        }
        #sidebarCollapse.active span:last-of-type {
            transform: rotate(-45deg) translate(1px, -1px);
        }

    }
</style>
