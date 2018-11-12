import Vue from 'vue'
import Router from 'vue-router'
import StageHeader from './components/stage/StageHeader'
import StageRequisitionGeneral from './components/stage/StageRequisitionGeneral'
import HttpPublisher from './components/stage/publishers/HttpPublisher'
import HttpSubscription from './components/stage/subscriptions/HttpSubscription'
import StageEvent from './components/stage/StageEvent'
import store from './store'

Vue.use(Router);

let stageBodyPropsBuilder = function (route) {
    const splitPath = route.path.split("/");
    const name = splitPath[splitPath.length - 1];
    return {
        eventName: name,
        item: store.state.selectedItem
    };
};

export default new Router({
    routes: [
        {
            path: "/requisition/:id",
            component: StageHeader,
            props: true,
            children: [
                {
                    path: "general",
                    component: StageRequisitionGeneral,
                    props: (route) => stageBodyPropsBuilder(route)
                },
                {
                    path: "onInit",
                    component: StageEvent,
                    props: (route) => stageBodyPropsBuilder(route)
                },
                {
                    path: "onFinish",
                    component: StageEvent,
                    props: (route) => stageBodyPropsBuilder(route)
                }
            ]
        },
        {
            path: "/publisher/:id",
            component: StageHeader,
            children: [
                {
                    path: "http",
                    component: HttpPublisher
                },
                {
                    path: "onInit",
                    component: StageEvent,
                },
                {
                    path: "onMessageReceived",
                    component: StageEvent,
                },
                {
                    path: "onFinish",
                    component: StageEvent,
                }
            ],

        },
        {
            path: "/subscription/:id",
            component: StageHeader,
            children: [
                {
                    path: "http",
                    component: HttpSubscription
                },
                {
                    path: "onInit",
                    component: StageEvent,
                },
                {
                    path: "onMessageReceived",
                    component: StageEvent,
                },
                {
                    path: "onFinish",
                    component: StageEvent,
                }
            ],

        }

        //     this generates a separate chunk (about.[hash].js) for this route
        //     which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    ]
})
