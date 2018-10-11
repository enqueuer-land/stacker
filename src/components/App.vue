<template>
    <div id="main" class="container-fluid">
        <div class="row wrapper">
            <SideBar class="col-3" v-on:componentSelected="componentSelected"/>

            <!-- Page Content Holder -->
            <div class="col-9">
                <div class="row">
                    <div class="col-6 border border-primary">
                        <div class="stage-header">
                            <h3>{{selectedComponent.type}}</h3>
                        </div>

                        <!--Stage-->
                        <Requisition v-if="selectedComponent.type == 'requisition'" :init="selectedComponent.value" v-on:sendClick="sendClick" />
                        <Publisher v-if="selectedComponent.type == 'publisher'" :init="selectedComponent.value" />
                        <Subscription v-if="selectedComponent.type == 'subscription'" :init="selectedComponent.value" />
                    </div>

                    <div class="col-6">
                        <Response :enqueuerResponse="this.enqueuerResponse"/>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {EnqueuerClient} from '../enqueuer/enqueuer-client';
    import * as Requisition from './requisition/Requisition';
    import * as SideBar from './SideBar';
    import * as Publisher from './requisition/publisher/Publisher';
    import * as Subscription from './requisition/subscription/Subsription';
    import * as Response from './Response';

    export default {
        name: 'App',
        components: {
            Response,
            Publisher,
            Subscription,
            SideBar,
            Requisition
        },
        data() {
            return {
                selectedComponent: {

                },
                enqueuerResponse: ''
            };
        },
        watch: {
            // selectedComponent() {
                // console.log(JSON.stringify(this.selectedComponent));
            // }
        },
        methods: {
            componentSelected: function (componentSelected) {
                // console.log(JSON.stringify(componentSelected));
                this.selectedComponent = componentSelected;
            },
            sendClick: function () {
                console.log(`Requisition: ${JSON.stringify(this.selectedComponent.value)}`);

                const enqueuer: EnqueuerClient = new EnqueuerClient(this.selectedComponent.value);
                enqueuer.on('response', (response: any) => {
                    //Removes the stacker requisition layer 'http daemon input' stuff
                    this.enqueuerResponse = response;
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
    .wrapper {
        display: flex;
        width: 100%;
        align-items: stretch;
        perspective: 1500px;
        height: 100vh;
    }

    .stage-header {
        color: #fff;
        padding: 20px;
        background: #19184f;
        font-weight: bold;
        text-transform: capitalize;
    }

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

</style>
