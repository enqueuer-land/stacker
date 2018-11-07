import Vue from 'vue'
import Router from 'vue-router'
import StageRequisitionHeader from './components/stage/StageRequisitionHeader'
import StageRequisitionGeneral from './components/stage/StageRequisitionGeneral'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/requisition/:id",
            component: StageRequisitionHeader,
            name: 'requisition',
            props: (route) => {
                console.log('params: ' + route.params);
                return route.params
            },
            children: [{
                path: "general",
                component: StageRequisitionGeneral
            }],

        }
        //     this generates a separate chunk (about.[hash].js) for this route
        //     which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    ]
})
