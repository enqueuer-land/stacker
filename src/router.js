import Vue from 'vue'
import Router from 'vue-router'
import StageRequisitionHeader from './components/stage/StageRequisitionHeader'
import StagePublisherHeader from './components/stage/StagePublisherHeader'
import StageRequisitionGeneral from './components/stage/StageRequisitionGeneral'
import HttpPublisher from './components/stage/publishers/HttpPublisher'
import StageEvent from './components/stage/StageEvent'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/requisition/:id",
            component: StageRequisitionHeader,
            children: [
                // {
                //     path: "",
                //     component: StageRequisitionGeneral
                // },
                {
                    path: "general",
                    component: StageRequisitionGeneral
                },
                {
                    path: "onInit",
                    component: StageEvent,
                },
                {
                    path: "onFinish",
                    component: StageEvent,
                }
            ]
        },
        {
            path: "/publisher/:id",
            component: StagePublisherHeader,
            children: [
                {
                    path: "",
                    component: HttpPublisher
                },
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

        }
        //     this generates a separate chunk (about.[hash].js) for this route
        //     which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    ]
})
