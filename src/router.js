import Vue from 'vue'
import Router from 'vue-router'
import StageHeader from './components/stage/StageHeader'
import GeneralRequisition from './components/stage/requisitions/GeneralRequisition'
import store from './store'
import {stageBodyPropsBuilder, stageHeaderPropsBuilder} from "./router-props-builder";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/requisition/:id",
            component: StageHeader,
            props: (route) => stageHeaderPropsBuilder(route, store.state),
            children: [
                {
                    path: "",
                    component: GeneralRequisition,
                    props: (route) => stageBodyPropsBuilder(route, store.state)
                },
                {
                    path: "general",
                    component: GeneralRequisition,
                    props: (route) => stageBodyPropsBuilder(route, store.state)
                }
            ]
        },
        {
            path: "/publisher/:id",
            component: StageHeader,
            props: (route) => stageHeaderPropsBuilder(route, store.state),
        },
        {
            path: "/subscription/:id",
            component: StageHeader,
            props: (route) => stageHeaderPropsBuilder(route, store.state)
        }
        //     this generates a separate chunk (about.[hash].js) for this route
        //     which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    ]
});
