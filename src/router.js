import Vue from 'vue'
import Router from 'vue-router'
import StageRequisitionHeader from './components/stage/StageHeader'
import StageRequisitionGeneral from './components/stage/StageRequisitionGeneral'
import StageEvent from './components/stage/StageEvent'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/requisition",
            component: StageRequisitionHeader,
            children: [{
                path: "general",
                component: StageRequisitionGeneral
            },
            {
                path: "oninit",
                component: StageEvent,
            }
            ]
        },
        {
            path: "/publisher",
            component: StageRequisitionHeader,
            // children: [{
            //     path: "general",
            //     component: StageRequisitionGeneral
            // }],

        }
        //     this generates a separate chunk (about.[hash].js) for this route
        //     which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    ]
})
