import Vue from 'vue'
import Router from 'vue-router'
import StageHeader from './components/stage/StageHeader'
import GeneralRequisition from './components/stage/requisitions/GeneralRequisition'
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

let stageHeaderPropsBuilder = function (route) {
    const splitPath = route.path.split("/");
    const id = splitPath[splitPath.length - 1];
    return {
        id: id,
        item: store.state.selectedItem
    };
};

export default new Router({
    routes: [
        {
            path: "/requisition/:id",
            component: StageHeader,
            props: (route) => stageHeaderPropsBuilder(route),
            children: [
                {
                    path: "general",
                    component: GeneralRequisition,
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
            props: (route) => stageHeaderPropsBuilder(route),
            children: [
                {
                    path: "http",
                    component: HttpPublisher,
                    props: (route) => stageBodyPropsBuilder(route)
                },
                {
                    path: "onInit",
                    component: StageEvent,
                    props: (route) => stageBodyPropsBuilder(route)
                },
                {
                    path: "onMessageReceived",
                    component: StageEvent,
                    props: (route) => stageBodyPropsBuilder(route)
                },
                {
                    path: "onFinish",
                    component: StageEvent,
                    props: (route) => stageBodyPropsBuilder(route)
                }
            ],

        },
        {
            path: "/subscription/:id",
            component: StageHeader,
            props: (route) => stageHeaderPropsBuilder(route),
            children: [
                {
                    path: "http",
                    component: HttpSubscription
                },
                {
                    path: "onInit",
                    component: StageEvent,
                    props: (route) => stageBodyPropsBuilder(route)
                },
                {
                    path: "onMessageReceived",
                    component: StageEvent,
                    props: (route) => stageBodyPropsBuilder(route)
                },
                {
                    path: "onFinish",
                    component: StageEvent,
                    props: (route) => stageBodyPropsBuilder(route)
                }
            ],

        }

        //     this generates a separate chunk (about.[hash].js) for this route
        //     which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    ]
})
