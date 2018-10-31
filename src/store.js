import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        requisitions: [
            {
                id: 'id687321321',
                name: 'first',
                leaves: [
                    "leaf 00",
                    "leaf 01"
                ],
                requisitions: [
                    {
                        id: 'id00186654',
                        name: 'first-first',
                        leaves: [
                            "leaf 10",
                            "leaf 11"
                        ]
                    },
                    {
                        id: 'id211687',
                        name: 'first-second',
                        leaves: [
                            "leaf 20",
                            "leaf 21"
                        ]
                    }
                ]
            }
        ]
    },
    mutations: {}
    ,
    actions: {}
})
